import Message from "../models/message.Model.js"

//create
export const createMessage = async (req, res) => {
    try {
        const { fullName, email, message } = req.body
        if (!fullName || !email || !message) {
            return res.status(400).json({ message: "please write email, name and message" })
        }
        const newMessage = await Message.create({ fullName, email, message })
        if (!newMessage) {
            return res.status(400).json({ message: "something went wrong, please write your message again!" })
        }
        return res.status(201).json({ message: "your message send to management, we will back to you soon" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({})
        if (messages.length === 0) {
            return res.status(200).json({ message: "no messages yet ", messages: [] })

        }
        return res.status(200).json({ message: "gets succesffully, ", messages })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

export const updateMessageStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { newStatus } = req.body
        const message = await Message.findByIdAndUpdate(
            id,
            { status: newStatus },
            { new: true }
        )
        if (!message) {
            return res.status(400).json({ message: "something went wrong, please write your message again!" })
        }
        return res.status(200).json({ message: "updated status successfully" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

export const getAllApprovedMessages = async (req, res) => {
    try {
        const messages = await Message.find({ status: "approved" })
        if (messages.length === 0) {
            return res.status(200).json({ message: "no approved messages yet ", messages: [] })

        }
        return res.status(200).json({ message: "gets succesffully, ", messages })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}
