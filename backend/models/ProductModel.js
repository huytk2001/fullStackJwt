import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: Array,
      default: [],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
    },
    unit: {
      type: String,
      default: "",
    },
    stock: {
      type: String,
      default: null,
    },
    price: {
      type: String,
      default: null,
    },
    discount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    more_details: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);
const ProductModel = mongoose.model("product", productSchema);
export default ProductModel;
