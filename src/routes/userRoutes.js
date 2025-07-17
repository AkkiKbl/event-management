import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/user", createUser);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
// router.get("/events", getEvents);
// router.get("/events/:id", getEventById);

export default router;
