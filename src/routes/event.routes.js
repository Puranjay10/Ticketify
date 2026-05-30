const express=require("express");
const router=express.Router();

const eventController=require("../controllers/event.controller");
const protect=require("../middleware/auth.middleware");
const authorizeRoles=require("../middleware/role.middleware");
const {createEventValidator}=require("../validators/event.validator");
const validate=require("../middleware/validation.middleware");

router.get("/",eventController.getEvents);

router.get(
    "/my-events",
    protect,
    authorizeRoles("organizer", "admin"),
    eventController.getMyEvents
);

router.get("/:id",eventController.getEvent);

router.get("/test", (req, res) => {
  res.send("Event route working");
});

//Protected(org/admin)
router.post(
    "/",
    protect,
    authorizeRoles("organizer","admin"),
    createEventValidator,
    validate,
    eventController.createEvent
);

router.put(
  "/:id",
  protect,
  authorizeRoles("organizer", "admin"),
  eventController.updateEvent
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("organizer", "admin"),
  eventController.deleteEvent
);

module.exports = router;