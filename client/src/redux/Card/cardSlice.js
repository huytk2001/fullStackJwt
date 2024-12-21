import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
import SummaryApi from "../../common/SummaryApi";
import AxiosToastError from "../AxiosToastError";
import toast from "react-hot-toast";
import CartApi from "../../Api/cartApi";
import productApi from "../../Api/productApi";
export const addToCardProduct = async(productId, quantity) => {
    try {
        const res = await CartApi.create({ productId, quantity })
        const { data } = res
        if (data && data.success) {
            toast.success(data.message)
            return data
        }
    } catch (error) {
        AxiosToastError(error);
    }
};


export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async(_, { rejectWithValue }) => {
        try {
            const response = await CartApi.get();
            const { data: cartData } = response;

            if (cartData.success) {
                const cartItems = cartData.data;

                // Gọi API riêng lẻ để lấy thông tin từng sản phẩm
                const combinedItems = await Promise.all(
                    cartItems.map(async(item) => {
                        try {
                            const productResponse = await productApi.getId(item.productId);
                            const { data: productDetails } = productResponse;

                            return {
                                ...item,
                                name: productDetails.name,
                                price: productDetails.price,
                                image: productDetails.image,
                                stock: productDetails.stock,
                                discount: productDetails.discount
                            };
                        } catch (error) {
                            console.error(`Failed to get product ${item.productId}`, error);
                            return {
                                ...item,
                                name: "Sản phẩm không tồn tại",
                                price: 0
                            };
                        }
                    })
                );

                return combinedItems;
            }
            return cartData
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch cart items");
        }
    }
);

const cardSlice = createSlice({
    name: "cart",
    initialState: {
        showMiniCard: false,
        cartItems: [],
        isLoading: false,
        error: null
    },
    reducers: {
        showMiniCard(state) {
            state.showMiniCard = true;
        },
        hideMiniCard(state) {
            state.showMiniCard = false;
        },
        addToCard(state, action) {
            const newItem = action.payload;
            const index = state.cartItems.findIndex(
                (x) => x.productId === newItem.productId
            );

            if (index >= 0) {
                state.cartItems[index] = {
                    ...state.cartItems[index], // Giữ lại các thuộc tính cũ
                    quantity: state.cartItems[index].quantity + newItem.quantity // Cập nhật số lượng
                };

            } else {
                // Thêm mới sản phẩm nếu chưa có trong giỏ hàng
                state.cartItems.push(newItem);
            }
        },
        handleAddItemCart: (state, action) => {
            state.cartItems = [...action.payload]
        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            // Check if product is available in card
            const index = state.cartItems.findIndex((x) => x.id === id);
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
        },
        increaseQuantity(state, action) {
            const { productId } = action.payload;
            const item = state.cartItems.findIndex((x) => x.productId === productId);
            if (item) {
                if (item.quantity < item.stock) {
                    item.quantity += 1
                } else {
                    toast.error("Đã tới giói hạn sản phẩm")
                }
            }
        },
        decreaseQuantity(state, action) {
            const { productId } = action.payload;
            const item = state.cartItems.findIndex((x) => x.productId === productId);
            if (item) {
                if (item.quantity < item.stock) {
                    item.quantity -= 1
                } else {
                    toast.error("Đã tới giói hạn sản phẩm")
                }
            }
        },
        removeFromCard(state, action) {
            const idNeedToRemove = action.payload;
            state.cartItems = state.cartItems.filter((x) => x.id !== idNeedToRemove);
        },
        clearCart(state) {
            state.cartItems = []
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload
            })
            .addCase(fetchCartItems.rejected, (state) => {
                state.error = true
                state.isLoading = false;
            })
    }
});

const { actions, reducer } = cardSlice;
export const {
    showMiniCard,
    hideMiniCard,
    addToCard,
    setQuantity,
    removeFromCard,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    handleAddItemCart
} = actions;
export default reducer;