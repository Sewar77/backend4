import express from "express";
import { protect } from "../middleware/protect.Middleware.js";
import { deleteUser, getAllUsers, getUserByEmail, getUserById, updateUserProfile } from "../controller/user.Controller.js";
import { adminOnly } from "../middleware/adminOnly.Middleware.js"
const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/user/:id", protect, getUserById);
router.post("/user-email", protect, getUserByEmail);
router.put("/user", protect, updateUserProfile);
router.delete("/user/:id", protect, deleteUser);

export default router;
