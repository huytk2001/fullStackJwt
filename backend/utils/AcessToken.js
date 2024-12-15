import jwt from "jsonwebtoken";
const generatedAccessToken = async(userId) => {
    const token = await jwt.sign({ id: userId },
        process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" }
    );
    return token;
};
export default generatedAccessToken;