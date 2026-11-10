import toast from "react-hot-toast";
import api from "../api";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || {})
    // register
    const navigate = useNavigate()
    const register = async (userData = {}) => {
        try {
            if (
                !userData.name ||
                !userData.email ||
                !userData.password ||
                !userData.confirmPassword ||
                !userData.role
            ) {
                toast.error("please fill all fleidls!")
                return
            }
            const res = await api.post('/auth/register', userData)
            if (userData.role === "trader") {
                toast("please wait admin to accept your request!")
                navigate("/")
                return
            }
            toast.success(res.data.message)
            navigate("/login")
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
            setCurrentUser(JSON.stringify(user))
            if (user.status === "pending") {
                toast("You cant login before the admin approve your request to creae account!")
                navigate("/")
                return;
            }

            if (user.role === "admin") {
                navigate("/admin/dashboard")
            }
            else if (user.role === "trader") {
                navigate('/trader/dashboard')
            }
            else {
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
        setCurrentUser({})
        toast.success("you logout successfully")
        navigate('/')
    }
    return { register, login, logout, currentUser };
};
