const Ticket=require("../models/ticket.model");
const Event=require("../models/event.model");
const QRCode=require("qrcode");
const {getIO}=require("../sockets/socket");

const generateTicketCode=()=>{
    return "TICKET-"+Math.random().toString(36).substring(2,10).toUpperCase();
};

const bookTicket=async(eventId,user)=>{
    //FInd event
    const event=await Event.findById(eventId);

    if(!event){
        throw new Error("Event not found");
    }

    //Check seat availiblity
    if(event.availableSeats<=0){
        throw new Error("No seats available");
    }

    //Reduce seat
    event.availableSeats-=1;
    await event.save();

    // Emit real-time seat update
    const io = getIO();

    console.log("Emitting seat update...");
    
    io.emit("seatUpdated", {
        eventId: event._id,
        availableSeats: event.availableSeats,
    });

    //Genrate ticket code
    const ticketCode=generateTicketCode();

    //Generate QR fromticket code
    const qrCode=await QRCode.toDataURL(ticketCode);

    //Create ticket
    const ticket=await Ticket.create({
        userId:user._id,
        eventId:event._id,
        ticketCode,
        qrCode,
    });

    return ticket;
};

const getUserTickets=async(userId)=>{
    return await Ticket.find({userId}).populate("eventId");
};

const verifyTicket=async(ticketCode)=>{
    //find ticket
    const ticket=await Ticket.findOne({ticketCode});
    if(!ticket){
        throw new Error("Invalid ticket");
    }
    //prevent reuse
    if(ticket.status==="used"){
        throw new Error("Ticket already used");
    }

    //mark as used
    ticket.status="used";
    await ticket.save();
    return ticket;
}

module.exports={
    bookTicket,
    getUserTickets,
    verifyTicket,
};