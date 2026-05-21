const eventService=require("../services/event.service");

const createEvent=async(req,res)=>{
    try{
        const event=await eventService.createEvent(req.body,req.user);
        res.status(201).json({
            message:"Event created",
            data:event,
        });
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

// Get all
const getEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();

    res.status(200).json({
      data: events,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one
const getEvent = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);

    res.status(200).json({ data: event });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update
const updateEvent = async (req, res) => {
  try {
    const event = await eventService.updateEvent(
      req.params.id,
      req.body,
      req.user
    );

    res.status(200).json({
      message: "Event updated",
      data: event,
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// Delete
const deleteEvent = async (req, res) => {
  try {
    const result = await eventService.deleteEvent(
      req.params.id,
      req.user
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};