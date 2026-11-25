import { useState } from "react"
import api from "../api"
import toast from "react-hot-toast";

export const useCart = () => {
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const getCartByUser = async () => {
        try {
            const res = await api.get('/cart')
            setCart(res.data.cart)
            setTotalPrice(res.data.totalPrice)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    const addToCart = async ({ productId, quantity }) => {
        try {
            const res = await api.post('/cart', { productId, quantity })
            toast.success(res.data.message || "addeed to cart")
            getCartByUser()
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    const minusFromCart = async ({ productId, quantity }) => {
        try {
            const res = await api.put('/cart', { productId, quantity })
            toast.success(res.data.message || "addeed to cart")
            getCartByUser()
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    const clearCart = async () => {
        try {
            const res = await api.delete('/cart')
            toast.success(res.data.message || "addeed to cart")
            setCart([])
            setTotalPrice(0)
            getCartByUser()
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    const checkOut = async () => {
        try {
            const res = await api.delete('/cart')
            toast.success("ckeck out suuccessfully")
            setCart([])
            setTotalPrice(0)
            getCartByUser()
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }

    return { getCartByUser, cart, addToCart, minusFromCart, totalPrice, clearCart, checkOut }
}