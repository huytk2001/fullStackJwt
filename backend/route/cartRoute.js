import express from "express";
import cardControllers from "../controllers/cardController.js";
import auth from "../controllers/verifyToken.js";
const cartRoute = express.Router();

cartRoute.post("/create", auth, cardControllers.addToCardItemControllers);
cartRoute.get("/get", auth, cardControllers.getCardItem);
export default cartRoute;
