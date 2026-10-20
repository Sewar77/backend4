import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductByCatId,
    getProductById,
    updateProduct,
} from "../controller/products.Controller.js";

const router = express.Router();

router.post("/product", createProduct);
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.get("/product/:id/category", getProductByCatId);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
