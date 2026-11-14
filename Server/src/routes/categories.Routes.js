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
    updateCategoryStatus,
} from "../controller/categories.Controller.js";
import { protect } from "../middleware/protect.Middleware.js";
import { adminOnly } from "../middleware/adminOnly.Middleware.js";
import { allowedRoles } from "../middleware/allowedRoles.Middleware.js";

const router = express.Router();
router.post("/category", protect, allowedRoles('admin', 'trader'), createCategory);
router.get("/categories", protect, allowedRoles('admin', 'trader'), getAllCategories);
router.get('/category/:id', getCategoryById)
// /category/xd98wsxu897dw823d
// params - url (endpoints)
router.post('/category/name', getCategoryByName)
// /category/name
router.put("/category/:id", protect, allowedRoles('admin', 'trader'), updateCategory)
router.put("/category-status/:id", protect, adminOnly, updateCategoryStatus)
router.delete("/category/:id", protect, allowedRoles('admin', 'trader'), deleteCategory)
export default router;