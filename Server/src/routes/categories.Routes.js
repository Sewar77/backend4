// the routes
//define routes
//link routes with controller
import express from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    updateCategory,
} from "../controller/categories.Controller.js";
import { protect } from "../middleware/protect.Middleware.js";
import { adminOnly } from "../middleware/adminOnly.Middleware.js";

const router = express.Router();
router.post("/category", protect, adminOnly, createCategory);
router.get("/categories", getAllCategories);
router.get('/category/:id', getCategoryById)
// /category/xd98wsxu897dw823d
// params - url (endpoints)
router.post('/category/name', getCategoryByName)
// /category/name
router.put("/category/:id", protect, adminOnly, updateCategory)
router.delete("/category/:id", protect, adminOnly, deleteCategory)
export default router;