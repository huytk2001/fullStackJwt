import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Provide name"],
    },
    email: {
      type: String,
      required: [true, "Provide email"],
      unique: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      default: null,
    },
    last_login_date: {
      type: Date,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Provide password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    refresh_token: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    address_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "address",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "cartProduct",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "order",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
