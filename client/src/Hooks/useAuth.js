import toast from "react-hot-toast";
import api from "../api";

export const useAuth = () => {
    // register
    const register = async (userData = {}) => {
        try {
            if (
                !userData.name ||
                !userData.email ||
                !userData.password ||
                !userData.confirmPassword
            ) {
                toast.error("please fill all fleidls!")
                return
            }
            const res = await api.post('/auth/register', userData)
            console.log("res: ", res);
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error);
        }
    };
    const login = async (userData = {}) => {
        try {
            if (
                !userData.email ||
                !userData.password
            ) {
                toast.error("please fill all fleidls!")
                return
            }
            const res = await api.post('/auth/login', userData)
            console.log("res: ", res);
            const { token, user } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("currentUser", JSON.stringify(user))
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error);
        }
    };

    return { register, login };
};
