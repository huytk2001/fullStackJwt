import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  orderId: {
    type: String,
    require: true,
    unique: true,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "product",
  },
  product_detail: {
    name: String,
    image: Array,
  },
  paymentId: {
    type: String,
    default: "",
  },
  payment_status: {
    type: String,
    default: "",
  },
});
const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel;
