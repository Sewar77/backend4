import { useEffect, useState } from "react"
import api from "../api"
import toast from "react-hot-toast"
export const useProducts = () => {
    const [products, setProucts] = useState([])

    //getallproducts
    const getAllProducts = async () => {
        try {
            const res = await api.get('/products');
            setProucts(res.data.products)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    const addProduct = async (product) => {
        try {
            const res = await api.post('/product', product)
            toast.success(res.data.message)
            getAllProducts()
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    const deleteProduct = async (id) => {
        try {
            const res = await api.delete(`/product/${id}`);
            toast.success(res.data.message)
            getAllProducts() //refresh table after delete
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.response?.data?.message)
        }
    }
    // call the function everyminute
    useEffect(() => { //apply effect on the functions inside
        getAllProducts() // the effects is calling the function
    }, [])

    return { products, deleteProduct, addProduct }
}