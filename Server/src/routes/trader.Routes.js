import express from "express";
import { protect } from "../middleware/protect.Middleware.js";
import { getTraderCategories, getTraderProducts } from "../controller/trader.Controller.js";
const router = express.Router();

router.get("/trader/categories", protect, getTraderCategories);
router.get("/trader/products", protect, getTraderProducts);
// router.post("/user-email", protect, getUserByEmail);
// router.put("/user", protect, updateUserProfile);
// router.delete("/user/:id", protect, deleteUser);

export default router;
