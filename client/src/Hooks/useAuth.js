<<<<<<< HEAD
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
=======
import toast from "react-hot-toast"
import api from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export const useAuth = () => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(() =>
        localStorage.getItem("currentUser") || {})
    // neither from localstorage or no user
    console.log(currentUser);

    const register = async (userData) => {
        try {
            // validation
            if (!userData.name || !userData.email || !userData.password || !userData.confirmPassword) {
                toast.error("please fill all fields")
            }
            const res = await api.post("/auth/register", userData)
            toast.success(res.data.message)
            navigate("/login")
        } catch (error) {
            toast.error(error.response?.data?.message)
            // the way it should be read in catch
            console.log(error.response?.data?.message)
        }
    }
    const login = async (userData) => {
        try {
            // validation
            if (!userData.email || !userData.password) {
                toast.error("please fill all fields")
            }
            const res = await api.post("/auth/login", userData)
            const { token, user } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("currentUser", JSON.stringify(user))
            setCurrentUser(user)
            if (user.role === "admin") {
                navigate("/admin/dashboard")
            } else if (user.role === "user") {
                navigate("/")
            } else {
                toast.error("you dont have account")
                return
            }
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message)
            // the way it should be read in catch
            console.log(error.response?.data?.message)
        }
    }
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("currentUser")
        setCurrentUser({})
        navigate('/')
    }
    return { register, login, logout }
}
>>>>>>> ea1de0a98934247aa3af4f0f99b052720efc4470
