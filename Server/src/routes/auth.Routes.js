import express from "express";
import { authMe, createUser, login } from "../controller/auth.Controller.js";
import { protect } from "../middleware/protect.Middleware.js";

const router = express.Router();

router.post("/auth/register", createUser);
router.post("/auth/login", login);
router.get('/auth/me', protect, authMe)

export default router;
