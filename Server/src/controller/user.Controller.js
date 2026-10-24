import User from "../models/user.Model.js"
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-hashed_password")
        if (users.length === 0) {
            return res.status(200).json({ message: "no users yet", users: [] })
        }
        return res.status(200).json({ message: "usrs gets", users })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "no user selected!" });
        }
        const user = await User.findById(id).select("-hashed_password")
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json({ message: " user get", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}
export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "no email selected!" });
        }
        const user = await User.findOne({ email }).select("-hashed_password")
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json({ message: " user get", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const { id } = req.user;
        if (!id) {
            return res.status(404).json({ message: "you are not sigining in" });
        }
        const user = await User.findByIdAndUpdate(
            id,
            { name, email },
            {
                new: true,
                runValidators: true,
                timestamps: true,
            },
        )
        if (!user) {
            return res
                .status(400)
                .json({ message: "something went wrong, user did not updated1" });
        }
        return res.status(200).json({ message: "user successfully", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "item not found" });
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "item not found" });
        }
        return res.status(200).json({ message: "item deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};