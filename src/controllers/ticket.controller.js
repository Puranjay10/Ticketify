const ticketService=require("../services/ticket.service");
const asyncHandler=require("express-async-handler");

//Book
const bookTicket=asyncHandler(async(req,res)=>{
    const ticket=await ticketService.bookTicket(req.body.eventId,req.user);

        res.status(201).json({
        message:"Ticket booked successfully",
        data:ticket,
    });
});

//Get my tickets
const getMyTickets=asyncHandler(async(req,res)=>{
    const tickets=await ticketService.getUserTickets(req.user._id);

    res.status(200).json({data:tickets});
});

const verifyTicket=asyncHandler(async(req,res)=>{
    const ticket=await ticketService.verifyTicket(
        req.body.ticketCode,
        req.user
    );

    res.status(200).json({message:"Ticket verified successfully",data:ticket});
});

module.exports={
    bookTicket,
    getMyTickets,
    verifyTicket,
};