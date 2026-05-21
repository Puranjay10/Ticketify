const Event=require("../models/event.model");

const createEvent=async(data,user)=>{
    const event=await Event.create({
        ...data,
        availableSeats: data.totalSeats,
        organizerId:user._id,
    });
    return event;
};

const getAllEvents=async()=>{
    return await Event.find().sort({ createdAt: -1 }); // ✅
};

const getEventById=async(id)=>{
    const event=await Event.findById(id);

    if(!event){
        throw new Error("Event not found");
    }

    return event;
};

const updateEvent=async(id,data,user)=>{
    const event=await Event.findById(id);
    if (
        event.organizerId.toString() !== user._id.toString() &&
        user.role !== "admin"
    ) {
        throw new Error("Not authorized to update this event");
    }

    Object.assign(event, data);
    await event.save();

    return event;
};

const deleteEvent = async (id, user) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new Error("Event not found");
  }

  if (
    event.organizerId.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new Error("Not authorized to delete this event");
  }

  await event.deleteOne();

  return { message: "Event deleted successfully" };
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};