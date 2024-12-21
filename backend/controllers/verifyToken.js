import jwt from "jsonwebtoken";

const auth = async(request, response, next) => {
    try {
        const token =
            request.cookies.accessToken ||
            request.headers.authorization.split(" ")[1] ||
            request.split(" ")[1] ||
            request.headers.split(" ")[1];

        if (!token) {
            return response.status(401).json({
                message: "Vui lòng cung cấp token",
                error: true,
                success: false,
            });
        }

        // Wrap jwt.verify trong một Promise
        const decode = await new Promise((resolve, reject) => {
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decodedToken) => {
                    if (err) reject(err);
                    else resolve(decodedToken);
                }
            );
        });


        request.userId = decode.id;
        console.log("Ddd", request.userId);
        next();
    } catch (error) {
        console.error("Lỗi JWT:", error.message);
        return response.status(401).json({
            message: "Truy cập không hợp lệ - Token không hợp lệ hoặc đã hết hạn",
            error: true,
            success: false,
        });
    }
};
// const auth = (req, res, next) => {
//     //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
//     const token =
//         req.headers.token ||
//         request.cookies.accessToken ||
//         req.headers["Authorization"];
//     const refreshToken = req.cookies.refreshToken;

//     if (token) {
//         const accessToken = token.split(" ")[1];
//         jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//             if (err) {
//                 res.status(403).json("Token is not valid!");
//             }
//             req.user = user;
//             next();
//         });
//     } else {
//         res.status(401).json("You're not authenticated");
//     }
// };
export default auth;