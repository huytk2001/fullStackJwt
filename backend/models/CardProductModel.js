import mongoose from "mongoose";

const cardProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const CartProduct = mongoose.model("cartProduct", cardProductSchema);
export default CartProduct;
