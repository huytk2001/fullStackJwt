import jwt from "jsonwebtoken";

const auth = async(request, response, next) => {
    try {
        const token =
            request.cookies.accessToken ||
            request.headers.authorization.split(" ")[1] ||
            request.split(" ")[1] ||
            request.headers.split(" ")[1] ||
            req.headers["Authorization"];

        if (!token) {
            return response.status(401).json({
                message: "Provide token",
            });
        }

        const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decode) {
            return response.status(401).json({
                message: "unauthorized access",
                error: true,
                success: false,
            });
        }

        request.userId = decode.id;

        next();
    } catch (error) {
        return response.status(500).json({
            message: "You have not login", ///error.message || error,
            error: true,
            success: false,
        });
    }
};
// const auth = (req, res, next) => {
//     //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
//     const token = req.headers.token || req.headers["Authorization"];
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