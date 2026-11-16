import User from "../models/user.Model.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-hashed_password");
        if (users.length === 0) {
            return res.status(200).json({ message: "no users yet", users: [] });
        }
        console.log(users);
        return res.status(200).json({ message: "usrs gets", users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "no user selected!" });
        }
        const user = await User.findById(id).select("-hashed_password");
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json({ message: " user get", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};
export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "no email selected!" });
        }
        const user = await User.findOne({ email }).select("-hashed_password");
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json({ message: " user get", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};

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
        );
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
export const editProfileByAdmin = async (req, res) => {
    try {
        const { newRole, newStatus } = req.body;
        console.log(req.body);
        console.log(newRole, newStatus);

        const { id } = req.params;

        const isExist = await User.findById(id);
        if (!isExist) {
            return res.status(404).json({ message: "user is not found" });
        }
        let role = newRole || isExist.role;
        let status = newStatus || isExist.status;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { role, status },
            {
                new: true,
                runValidators: true,
                timestamps: true,
            },
        );
        return res.status(200).json({ message: "updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};
export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const { id } = req.user; //who own the account

        const userInfo = await User.findById(id);
        const isMatch = await bcrypt.compare(oldPassword, userInfo.hashed_password)
        if (!isMatch) {
            return res.status(400).json({ message: "old password is not correct!" });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "passwords do not match!" });
        }
        if (oldPassword === newPassword) {
            return res
                .status(400)
                .json({ message: "new password must not be the old password!" });
        }
        const validPassword =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!validPassword.test(newPassword)) {
            return res.status(400).json({
                message:
                    "password must include small letters , capital letters, numers and symbols, and min length is 8",
            });
        }
        const hashed_password = await bcrypt.hash(newPassword, 10);
        const updaredPass = await User.findByIdAndUpdate(
            id,
            {
                hashed_password,
            },
            {
                new: true,
                runValidators: true,
                timestamps: true,
            },
        );
        return res.status(200).json({
            message: "password changes suuccessfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};
