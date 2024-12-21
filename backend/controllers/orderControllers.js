import mongoose from "mongoose"
import OrderModel from "../models/OrderModel.js"
import CartProduct from "../models/CardProductModel.js"
import UserModel from "../models/UserModel.js"
import Stripe from "../config/stripe.js"
import ProductModel from "../models/ProductModel.js"

export const priceWithDiscount = (price, dis = 1) => {
    const discountAmount = Math.ceil(Number(price) * Number(dis) / 100)
    const actualPrice = Number(price) - Number(discountAmount)
    return actualPrice
}
export const getOrderProductItem = async({ line_items, userId, addressId, paymentId, payment_status }) => {
    const productList = []
    if (line_items && line_items.data && line_items.data.length) {
        for (const item of line_items.data) {
            const product = await Stripe.product.retrieve(item.price.product)

            const payload = {
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: produce.metadata.productId,
                productDetails: {
                    name: product.name,
                    image: product.images
                },
                paymentId: paymentId,
                payment_status: payment_status,
                delivery_addresses: addressId,
                subTotalAmt: Number(item.amount_total / 100),
                totalAmt: Number(item.amount_total / 100),
            }
            productList.push(payload)
        }
    }
    return productList
}
const orderControllers = {
    CashOnDeliveryOrder: async(request, response) => {
        try {
            const userId = request.userId // auth middleware 
            console.log("UserId in Controller:", request.userId);
            const { list_items, totalAmt, addressId, subTotalAmt } = request.body

            const payload = list_items.map(el => {
                return ({
                    userId: userId,
                    orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                    productId: el.productId._id,
                    product_details: {
                        name: el.productId.name,
                        image: el.productId.image
                    },
                    paymentId: "",
                    payment_status: "CASH ON DELIVERY",
                    delivery_addresses: addressId,
                    subTotalAmt: subTotalAmt,
                    totalAmt: totalAmt,
                })
            })
            const generatedOrder = await OrderModel.insertMany(payload)

            const removeCartItems = await CartProduct.deleteMany({ userId: userId })
            const updatedUser = await UserModel.updateOne({ _id: userId }, { shopping_cart: [] })
            for (const item of list_items) {
                const productId = item.productId;
                const quantityPurchased = item.quantity

                // tim san pham va giam stock
                const product = await ProductModel.findById(productId)
                if (product) {
                    console.log("Before update:", product.stock);
                    product.stock -= item.quantity;
                    console.log("After update:", product.stock);
                    await product.save();

                }
            }
            return response.status(200).json({
                message: "Order successfully",
                error: false,
                success: true,
                data: generatedOrder
            })
        } catch (error) {
            return response.status(500).json({
                message: error.message || error,
                error: true,
                success: false
            })
        }
    },

    paymentController: async(request, response) => {
        try {
            const userId = request.userId // auth middleware
            const {
                list_items,
                addressId,
                subTotalAmt,
                totalAmt
            } = request.body

            // Kiểm tra xem list_items có phải là mảng không và có phần tử hay không
            if (!Array.isArray(list_items) || list_items.length === 0) {
                return response.status(400).json({
                    message: "Invalid array: list_items must be a non-empty array",
                    error: true,
                    success: false,
                });
            }

            const user = await UserModel.findById(userId)

            const line_items = list_items.map(item => {
                const productData = {
                    name: item.name,
                    images: item.image,
                    metadata: {
                        productId: item._id
                    }
                };

                // Log productData để kiểm tra thông tin
                console.log("Product Data:", productData);
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: productData,
                        unit_amount: priceWithDiscount(item.price, item.discount) * 100
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                }
            })

            console.log("d1:", line_items);

            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                customer_email: user.email,
                metadata: {
                    userId: userId,
                    addressId: addressId
                },
                line_items: line_items,
                success_url: `${process.env.FRONTEND_URL}/success`,
                cancel_url: `${process.env.FRONTEND_URL}/cancel`
            }

            console.log("Sd:", params);

            const session = await Stripe.checkout.sessions.create(params);

            console.log("Stripe session created:", session);

            return response.status(200).json(session)

        } catch (error) {
            return response.status(500).json({
                message: error.message || error,
                error: true,
                success: false
            })
        }
    },
    getOrderDetail: async(request, response) => {
        try {
            const userId = request.userId
            const orderList = await OrderModel.find({ userId: userId }).sort({ createAt: -1 }).populate("delivery_address")
            return response.status(200).json({
                data: orderList,
                success: true,
                error: false,

            })
        } catch (error) {
            return response.status(500).json({
                success: true,
                error: false,
                message: message.error || error
            })
        }
    },
    webhookStripe: async(request, response) => {
        const event = request.body;
        const endPointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY
        console.log("event", event);
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                const lineItems = await Stripe.checkout.sessions.listLineItems(session.id)
                const userId = session.metadata.userId
                const orderProduct = await getOrderProductItem({
                    lineItems: lineItems,
                    userId: userId,
                    addressId: session.metadata.addressId,
                    paymentId: session.paymentId,
                    payment_status: session.payment_status
                })
                const order = await OrderModel.insertMany(orderProduct)
                console.log("order", order);
                if (Boolean(order[0])) {
                    const removeCartItems = await UserModel.findByIdAndUpdate(userId, {
                        shopping_cart: []
                    })
                    const removeCartProducts = await CartProduct.deleteMany({ userId: userId })
                }
                break;
            default:
                console.log(`UnHandle type ${event.type}`);

        }
        response.json({ received: true });
    }

}
export default orderControllers