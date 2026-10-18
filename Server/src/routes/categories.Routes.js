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

const router = express.Router();

router.post("/category", createCategory);
router.get("/categories", getAllCategories);
router.get('/category/:id', getCategoryById)
// /category/xd98wsxu897dw823d
// params - url (endpoints)
router.post('/category/name', getCategoryByName)
// /category/name
router.put("/category/:id", updateCategory)
router.delete("/category/:id", deleteCategory)
export default router;
