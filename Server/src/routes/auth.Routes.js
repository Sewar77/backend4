import express from "express";
import { createUser, login } from "../controller/auth.Controller.js";

const router = express.Router();

router.post("/auth/register", createUser);
router.post("/auth/login", login);


export default router;
