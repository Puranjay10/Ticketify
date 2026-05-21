const ticketService=require("../services/ticket.service");

//Book
const bookTicket=async(req,res)=>{
    try{
        const ticket=await ticketService.bookTicket(
            req.body.eventId,
            req.user
        );

        res.status(201).json({
            message:"Ticket booked successfully",
            data:ticket,
        });
    }catch(error){
        res.status(400).json({
            message:error.message,
        });
    }
};

//Get my tickets
const getMyTickets=async(req,res)=>{
    try{
        const tickets=await ticketService.getUserTickets(req.user._id);

        res.status(200).json({
            data:tickets,
        });
    }catch(error){
        res.status(200).json({
            message:error.message,
        });
    }
};

const verifyTicket=async(req,res)=>{
    try{
        const ticket=await ticketService.verifyTicket(
            req.body.ticketCode
        );

        res.status(200).json({
            message:"Ticket verified successfully",
            data:ticket,
        });
    } catch(error){
        res.status(400).json({
            message:error.message,
        });
    }
};

module.exports={
    bookTicket,
    getMyTickets,
    verifyTicket,
};