import express from "express";
import {
  createEvent,
  deleteEvent,
  DeleteRegistration,
  eventStats,
  getAllEvent,
  getRegisteredUsers,
  registerEvent,
  upcomingEvents,
  updateEvent,
} from "../controllers/eventsController.js";

const router = express.Router();

//Event Routes
router.post("/event", createEvent);
router.get("/event", getAllEvent);
router.get("/registeredUsers/", getRegisteredUsers);
router.put("/updateEvent/:id", updateEvent);
router.delete("deleteEvent", deleteEvent);

//Registration Routes
router.post("/createRegistration", registerEvent);
router.delete("/deleteRegistration", DeleteRegistration);

//Upcoming Events Routes
router.get("/upcomingEvents", upcomingEvents);

//Event Stats Routes
router.get("/eventStats", eventStats);

export default router;
