import toast from "react-hot-toast"
import api from "../api"
import { useState } from "react"

export const useAuth = () => {
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
    }
    return { register, login, logout }
}