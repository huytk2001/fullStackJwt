import express from "express"

import orderControllers from "../controllers/orderControllers.js"
import auth from "../controllers/verifyToken.js"

const orderRoute = express.Router()

orderRoute.post("/cash-on-delivery", auth, orderControllers.CashOnDeliveryOrder)
orderRoute.post("/checkout", auth, orderControllers.paymentController)
orderRoute.post("/webhook", orderControllers.webhookStripe)
orderRoute.get("/order-list", auth, orderControllers.getOrderDetail)
export default orderRoute