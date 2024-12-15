import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generatedAccessToken from "../utils/AcessToken.js";
import generatedRefreshToken from "../utils/refreshToken.js";
dotenv.config();

let refreshTokens = [];

const authController = {
    // Đăng ký người dùng
    registerUser: async(req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Tạo người dùng mới
            const newUser = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            // Lưu vào cơ sở dữ liệu
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Đăng nhập người dùng
    LoginUser: async(req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return req.status(400).json({
                    message: "Provide email,password",
                    error: true,
                    success: false,
                });
            }
            const user = await UserModel.findOne({ email });
            if (!user) {
                return req.status(400).json({
                    message: "Provide email",
                    error: true,
                    success: false,
                });
            }
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return req.status(400).json({
                    message: "Provide password",
                    error: true,
                    success: false,
                });
            }
            const accessToken = await generatedAccessToken(user._id);
            const refreshToken = await generatedRefreshToken(user._id);
            const updateUser = await UserModel.findByIdAndUpdate(user && user.id, {
                last_login__date: new Date(),
            });
            const cookiesOption = {
                httpOnly: true,
                secure: true,
                sameSite: "None",
            };
            res.cookie("accessToken", accessToken, cookiesOption);
            res.cookie("refreshToken", refreshToken, cookiesOption);
            return res.json({
                message: "Login successfully",
                error: false,
                success: true,
                data: {
                    accessToken,
                    refreshToken,
                },
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Làm mới token khi refresh token hợp lệ
    // Làm mới token khi refresh token hợp lệ
    requestRefreshToken: async(req, res) => {
        try {
            // Lấy refresh token từ cookies hoặc headers Authorization
            const refreshToken =
                req.cookies.refreshToken ||
                (req.headers.authorization ?
                    req.headers.authorization.split(" ")[1] :
                    undefined);

            // Nếu không tìm thấy refresh token
            if (!refreshToken) return res.status(401).json("No refresh token found");

            // Verify token
            const verifyToken = await jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );

            if (!verifyToken) {
                return res.status(401).json({
                    message: "Token is expired",
                    error: true,
                    success: false,
                });
            }

            const userId = verifyToken._id;
            const newAccessToken = await generatedAccessToken(userId);

            const cookiesOption = {
                httpOnly: true,
                secure: true,
                sameSite: "None",
            };

            // Gửi token mới vào cookies
            res.cookie("accessToken", newAccessToken, cookiesOption);

            return res.status(200).json({
                message: "New Access token generated",
                error: false,
                success: true,
                data: {
                    accessToken: newAccessToken,
                },
            });
        } catch (err) {
            console.error("Invalid refresh token:", err.message);
            res.status(403).json("Invalid refresh token.");
        }
    },

    //logout
    Logout: async(req, res) => {
        refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
        res.clearCookie("refreshToken");

        res.status(200).json("Logged out successfully!");
    },
};

export default authController;