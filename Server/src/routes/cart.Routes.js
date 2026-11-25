import express from "express";
import { protect } from "../middleware/protect.Middleware.js";
import { addToCart, decreaseQuantity, getCartByUserId, reomveCartItems } from "../controller/cart.Controller.js";

const router = express.Router();

router.post("/cart", protect, addToCart);
router.get("/cart", protect, getCartByUserId); //this is for admin

router.put("/cart", protect, decreaseQuantity);
router.delete('/cart', protect, reomveCartItems)
export default router;
