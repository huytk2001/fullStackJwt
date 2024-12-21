import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
const generatedRefreshToken = async(userId) => {
    const token = await jwt.sign({ id: userId },
        process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" }
    );
    const updatedRefreshTokenUser = await UserModel.findOneAndUpdate({ _id: userId }, { refresh_token: token }, { new: true } // Trả về document đã được cập nhật
    );
    return token;
};
export default generatedRefreshToken;