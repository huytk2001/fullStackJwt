import CartProduct from "../models/CardProductModel.js";
import UserModel from "../models/UserModel.js";

const cardControllers = {
    addToCardItemControllers: async(req, res) => {
        try {
            const userId = req.userId;
            const { productId, quantity } = req.body;

            if (!productId) {
                return res.status(402).json({
                    message: "Provide productId",
                    error: true,
                    success: false,
                });
            }

            const checkItemCard = await CartProduct.findOne({
                userId: userId,
                productId: productId,
            });

            if (checkItemCard) {
                checkItemCard.quantity += quantity;
                const updatedItem = await checkItemCard.save();

                return res.status(200).json({
                    message: "Item already in cart, increased quantity",
                    success: true,
                    data: updatedItem,
                });
            }

            const cartItem = new CartProduct({
                quantity: quantity,
                userId: userId,
                productId: productId,
            });
            const save = await cartItem.save();

            // Cập nhật giỏ hàng người dùng
            const updatedCartUser = await UserModel.updateOne({ _id: userId }, {
                $push: {
                    shopping_cart: productId,
                },
            });

            console.log("Updated Cart User:", updatedCartUser);

            // Kiểm tra dữ liệu giỏ hàng sau khi cập nhật
            const userDetails = await UserModel.findById(userId).populate(
                "shopping_cart"
            );
            console.log("User Shopping Cart:", userDetails.shopping_cart);

            return res.status(200).json({
                data: save,
                message: "Item added to cart successfully",
                error: false,
                success: true,
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message || error,
                error: true,
                success: false,
            });
        }
    },
    getCardItem: async(req, res) => {
        try {
            const userId = req.userId;
            const cartItem = await CartProduct.find({
                userId: userId,
            });
            return res.status(200).json({
                data: cartItem,
                error: false,
                success: true,
            });
        } catch (error) {
            return res.status(500).json({
                message: message.error || error,
                error: true,
                success: false,
            });
        }
    },
};

export default cardControllers;