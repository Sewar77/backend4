import express from "express";
import { protect } from "../middleware/protect.Middleware.js";
import { createMessage, getAllApprovedMessages, getAllMessages, updateMessageStatus } from "../controller/message.Controller.js";

const router = express.Router();

router.get("/messages", protect, getAllMessages); // admin
router.get("/approve/messages", getAllApprovedMessages);
router.post("/message", createMessage);
router.put("/message/:id", protect, updateMessageStatus); //admin

export default router;
