import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// Route đăng ký
router.post("/register", authController.registerUser);
router.post("/login", authController.LoginUser);
router.post("/refresh-token", authController.requestRefreshToken);
router.post("/logout", authController.Logout);
export default router;
