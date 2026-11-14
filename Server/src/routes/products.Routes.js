import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getApprovedProduct,
    getProductByCatId,
    getProductById,
    updateProduct,
    updateProductsStatus,
} from "../controller/products.Controller.js";
import { protect } from "../middleware/protect.Middleware.js";
import { adminOnly } from "../middleware/adminOnly.Middleware.js";
import { allowedRoles } from "../middleware/allowedRoles.Middleware.js";

const router = express.Router();

router.post("/product", protect, allowedRoles('admin', 'trader'), createProduct);
router.get("/products", protect, adminOnly, getAllProducts); //this is for admin
router.get("/accepted/products", getApprovedProduct);
router.get("/product/:id", getProductById);
router.get("/product/:id/category", getProductByCatId);
router.put("/product/:id", protect, allowedRoles('admin', 'trader'), updateProduct);
router.put("/product-status/:id", protect, adminOnly, updateProductsStatus);
router.delete("/product/:id", protect, allowedRoles('admin', 'trader'), deleteProduct);
export default router;
