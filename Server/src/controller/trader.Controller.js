import Category from "../models/categories.Model.js";
import Product from "../models/products.Model.js"

export const getTraderProducts = async (req, res) => {
    try {
        const id = req.user.id
        const products = await Product.find({ createdBy: id })
        if (products.length === 0) {
            return res.status(200).json({ message: "you did not create any products yet", products: [] });
        }
        return res.status(200).json({ message: " products get", products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

export const getTraderCategories = async (req, res) => {
    try {
        const id = req.user.id
        const categories = await Category.find({ createdBy: id })
        if (categories.length === 0) {
            return res.status(200).json({ message: "you did not create any categories yet", categories: [] });
        }
        return res.status(200).json({ message: " products get", categories });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}