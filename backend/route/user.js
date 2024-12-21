import express from "express";
import userController from "../controllers/userControllers.js";
import auth from "../controllers/verifyToken.js";

const userRouter = express.Router();

// Lấy tất cả người dùng
userRouter.get("/user", auth, userController.getAllUser);

// Lấy người dùng theo ID
userRouter.get("/user/:id", auth, userController.getIdUser);

// Xóa người dùng theo ID (Thêm tiền tố "/user" để rõ ràng)
userRouter.delete("/user-details", userController.getDeleteUser);

export default userRouter;