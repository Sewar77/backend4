import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductByCatId,
    getProductById,
    updateProduct,
} from "../controller/products.Controller.js";
import { protect } from "../middleware/protect.Middleware.js";
import { adminOnly } from "../middleware/adminOnly.Middleware.js";

const router = express.Router();

router.post("/product", protect, adminOnly, createProduct);
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.get("/product/:id/category", getProductByCatId);
router.put("/product/:id", protect, adminOnly, updateProduct);
router.delete("/product/:id", protect, adminOnly, deleteProduct);

export default router;
