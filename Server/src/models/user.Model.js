/*
user: 
name
email
password
role = admin, user
id, createdat, updated at

*/ import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: [6, "enteryour full name, at least two names"],
            trime: true,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            trime: true,
            required: [true, "email is required"],
            unique: [true, "email already exist"],
            lowerCase: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Invalid email",
            ],
        },
        hashed_password: {
            type: String,
            required: [true, "password is required"],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    { timestamp: true },
);
const User = mongoose.model("User", userSchema)
export default User