import { useState } from "react"
import api from "../api";
import toast from "react-hot-toast"

export const useUsers = () => {

    const [users, setUsers] = useState([])

    const getAllUsers = async () => {
        try {
            const res = await api.get('/users'); // read from backend 
            setUsers(res.data.users)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    const deleteUser = async (id) => {
        try {
            const res = await api.delete(`/user/${id}`); // read from backend 
            getAllUsers() // refresh
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    const changeUserPassword = async (oldPassword, newPassword, confirmNewPassword) => {
        try {
            const res = await api.put(`/change-password`, { oldPassword, newPassword, confirmNewPassword });
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    const editUser = async (id, newRole, newStatus) => {
        try {
            const res = await api.put(`/user-update/${id}`, { newRole, newStatus }); // read from backend 
            getAllUsers() // refresh
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    return { getAllUsers, users, deleteUser, editUser, changeUserPassword }
} 