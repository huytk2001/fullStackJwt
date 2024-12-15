import express from "express";
import productControllers from "../controllers/productController.js";
import auth from "../controllers/verifyToken.js";

const router = express.Router();
router.post("/product-add", productControllers.createProductController);
router.get("/product", auth, productControllers.getProduct);
router.get("/product/:id", productControllers.getProductById);
router.delete("/delete-product/:id", productControllers.getDeleteProduct);
export default router;
