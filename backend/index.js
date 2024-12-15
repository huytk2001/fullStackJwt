import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./route/auth.js";
import userRoute from "./route/user.js";
import productRoute from "./route/product.js";
import categoryRoute from "./route/category.js";
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB URI with proper database name from environment variables
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rma52.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const allowedOrigins = ["http://localhost:5173"]
app.use(cookieParser());
app.use(express.json());
// CORS configuration
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use("/v1/auth", router);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
mongoose
    .connect(URI)
    .then(() => {
        console.log("Connected to DB");

        // Start the server after successful DB connection
        app.listen(PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });