import express from "express";
import categoryControllers from "../controllers/categoryControllers.js";

const router = express.Router();
router.post("/add-category", categoryControllers.CategoryAdd);
router.get("/get-category", categoryControllers.getCategoryController);
router.get("/get-category/:id", categoryControllers.getCategoryController);
router.post("/updated-category/:id", categoryControllers.updatedCategoryById);
router.delete("/delete-category/:id", categoryControllers.deleteCategoryById);
export default router;
