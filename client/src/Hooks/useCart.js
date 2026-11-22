import { useState } from "react"
import api from "../api"
import toast from "react-hot-toast";

export const useCart = () => {
    const [cart, setCart] = useState({})
    const getCartByUser = async () => {
        try {
            const res = await api.get('/cart')
            setCart(res.data.cart)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    const addToCart = async ({ productId, quantity }) => {
        try {
            const res = await api.post('/cart', { productId, quantity })
            toast.success(res.data.message || "addeed to cart")
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    return { getCartByUser, cart, addToCart }
}