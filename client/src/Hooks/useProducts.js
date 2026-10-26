import { useEffect, useState } from "react"
import api from "../api"
export const useProducts = () => {
    const [products, setProucts] = useState([])

    //getallproducts
    const getAllProducts = async () => {
        try {
            const res = await api.get('/products');
            setProucts(res.data.products)
        } catch (error) {
            console.log(error)
        }
    }
    // call the function everyminute
    useEffect(() => { //apply effect on the functions inside
        getAllProducts() // the effects is calling the function
    }, [])
    return { products }
}