import express from "express";
import { protect } from "../middleware/protect.Middleware.js";
import { addToCart, decreaseQuantity, getCartByUserId } from "../controller/cart.Controller.js";

const router = express.Router();

router.post("/cart", protect, addToCart);
router.get("/cart", protect, getCartByUserId); //this is for admin

router.put("/cart", protect, decreaseQuantity);

export default router;
