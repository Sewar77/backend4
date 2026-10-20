import express from "express";
import { createUser } from "../controller/auth.Controller.js";

const router = express.Router();

router.post("/auth/register", createUser);


export default router;
