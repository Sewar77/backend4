import Product from "../models/products.Model.js";
import Category from "../models/categories.Model.js";
// create, read, update , delete
export const createProduct = async (req, res) => {
    try {
        //read data
        const { name, description, image, price, stock, catId } = req.body;
        //validation
        if (!name || !catId || !price || !stock) {
            return res.status(400).json({
                message: "name, category name, price and stock are required fields. ",
            });
        }
        if (name.length < 5) {
            return res.status(400).json({
                message: "product name must be valid with at least 5 charecters",
            });
        }
        const isCtegryExisted = await Category.findById(catId);
        if (!isCtegryExisted) {
            return res.status(404).json({ message: "category name is no found!" });
        }
        if (price <= 0 || stock < 0) {
            return res
                .status(400)
                .json({
                    message:
                        "stock and price must be a valid positive number and more than 0",
                });
        }

        const product = await Product.create({
            name,
            description,
            image,
            price,
            stock,
            catId,
        })
        if (!product) {
            return res
                .status(400)
                .json({ message: "product has not been created successfully" });
        }
        return res.status(201).json({ message: "created done", product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};

//read all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("catId", "name description");
        if (products.length === 0) {
            return res.status(200).json({ message: "No products yet", products: [] });
        }
        return res.status(200).json({ message: " products get", products });
        //data
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};

//read by id
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "no item selected!" });
        }
        const product = await Product.findById(id).populate(
            "catId",
            "name description",
        );
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        return res.status(200).json({ message: " product get", product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};
export const getProductByCatId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "no item selected!" });
        }
        const isCtegryExisted = await Category.findById(id);
        if (!isCtegryExisted) {
            return res.status(404).json({ message: "category name is no found!" });
        }

        const products = await Product.find({ catId: id }).populate(
            "catId",
            "name description",
        );
        if (products.length === 0) {
            return res
                .status(200)
                .json({ message: "this category has not any products yet" });
        }
        return res
            .status(200)
            .json({ message: " category products get", products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const { name, description, image, price, stock, catId } = req.body;
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "item not found" });
        }
        if (catId) {
            const isCtegryExisted = await Category.findById(catId);
            if (!isCtegryExisted) {
                return res.status(404).json({ message: "category name is no found!" });
            }
        }

        if (price <= 0 || stock < 0) {
            return res
                .status(400)
                .json({
                    message: "the price and strock must be valid positive numbers",
                });
        }
        const product = await Product.findByIdAndUpdate(
            id,

            { name, description, image, price, stock, catId },
            {
                new: true,
                runValidators: true,
                timestamps: true,
            },
        )
        if (!product) {
            return res
                .status(400)
                .json({ message: "something went wroing, product did not updated1" });
        }
        return res.status(200).json({ message: "pdated successfully", product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "item not found" });
        }
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "item not found" });
        }
        return res.status(200).json({ message: "item deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};
