import toast from "react-hot-toast";
import api from "../api";
import { useNavigate } from "react-router-dom"
export const useAuth = () => {
    // register
    const navigate = useNavigate()
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
            if (user.role === "admin") {
                navigate("/admin/dashboard")
            } else {
                navigate('/')
            }
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error);
        }
    };
    const logout = () => {
        localStorage.removeItem("currentUser")
        localStorage.removeItem("token")
        toast.success("you logout successfully")
        navigate('/')
    }
    return { register, login, logout };
};
