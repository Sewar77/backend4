import { useState } from "react"
import toast from "react-hot-toast";
import api from "../api";

export const useTrader = () => {
    const [productsTrader, setProductsTrader] = useState([])

    const getTraderProducts = async () => {
        try {
            const res = await api.get('/trader/products'); // read from backend 
            setProductsTrader(res.data.products)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error)
        }
    }

    return { getTraderProducts, productsTrader }
}