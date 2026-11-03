import mongoose from "mongoose"
const messageSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "name cant be empty"],
        minLength: [2, "name must be more then 2 charecters."],
        trime: true,
    },
    email: {
        type: String,
        trime: true,
        required: [true, "email is required"],
        lowerCase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email",
        ],
    },
    message: {
        type: String,
        trime: true,
        required: [true, "message is required"],
        minLength: 5
    },
    status: {
        type: String,
        enum: ['pending', "approved", "rejected"],
        default: "pending"
    }
},
    { timestamps: true }
)

const Message = mongoose.model("Message", messageSchema)
export default Message