const eventService=require("../services/event.service");
const asyncHandler=require("express-async-handler");

const createEvent=asyncHandler(async(req,res)=>{
    const event=await eventService.createEvent(req.body,req.user);
    res.status(201).json({
        message:"Event created",
        data:event,
    });
});

// Get all
const getEvents = asyncHandler(async(req,res)=>{
    const events = await eventService.getAllEvents();

    res.status(200).json({data:events});
});

// Get one
const getEvent = asyncHandler(async(req, res) => {
    const event = await eventService.getEventById(req.params.id);

    res.status(200).json({ data: event });
});

// Update
const updateEvent = asyncHandler(async(req, res) => {
    const event = await eventService.updateEvent(
      req.params.id,
      req.body,
      req.user
    );

    res.status(200).json({
      message: "Event updated",
      data: event,
    });
});

// Delete
const deleteEvent = asyncHandler(async(req, res) => {
    const result = await eventService.deleteEvent(req.params.id,req.user);      

    res.status(200).json(result);
});


//get events of organizer
const getMyEvents=asyncHandler(async(req,res)=>{
    const events=await eventService.getOrganizerEvents(
        req.user._id
    );

    res.status(200).json({
        data:events,
    });
});

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
};