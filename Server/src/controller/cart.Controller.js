// creat, read, update, delete
import mongoose from "mongoose";
import Cart from "../models/cart.Model.js";
import Product from "../models/products.Model.js";
// create =>
export const addToCart = async (req, res) => {
    try {
        // if no cart, create one and add item
        // if cart, add item +1
        //read user id
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: "invalid product" });
        }

        const product = await Product.findById(productId).populate("catId", "name");
        if (!product) {
            return res.status(404).json({ message: "products is not found" });
        }
        if (product.stock < 1) {
            return res.status(404).json({ message: "product is out of stock!" });
        }
        let cart = await Cart.findOne({ user: userId });
        // if no cart, create one
        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [],
            });
        }
        // if no OR there is cart
        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId,
        );
        if (existingItem) {
            // if products exist, add quantity
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
            });
        }
        product.stock -= quantity;
        if (product.stock < 1) {
            return res.status(400).json({ message: "product is out of stock!" });
        }
        await cart.save();
        return res.status(200).json({ message: "item added to cart", cart });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const getCartByUserId = async (req, res) => {
    try {
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId })
            .populate("user", "name email")
            .populate("items.product", "name price stock");

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [],
            });
        }
        const totalPrice = cart.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
        return res
            .status(200)
            .json({ message: "cart get suuceesfully", cart, totalPrice });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const decreaseQuantity = async (req, res) => {
    try {
        const userId = req.user.id;

        const { productId, quantity } = req.body;
        const product = await Product.findById(productId).populate("catId", "name");
        console.log("product", product);

        if (!product) {
            return res.status(404).json({ message: "products is not found" });
        }
        let cart = await Cart.findOne({ user: userId });

        const item = cart.items.find(
            (item) => item.product.toString() === productId,
        );
        if (!item) {
            return res.status(404).json({ message: "items is not found" });
        }
        item.quantity -= quantity;
        product.stock += quantity;
        if (item.quantity < 1) {
            cart.items = cart.items.filter(
                (item) => item.product.toString() !== productId,
            );
        }
        await cart.save();
        return res.status(200).json({ message: "cart updated", cart });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const reomveCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $set: { items: [] },
            },
            { new: true },
        );
        if (!cart) {
            return res.status(400).json({ message: "something went wrong!" });
        }
        return res.status(200).json({ message: "all items removed from cart" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};
