import { createSelector } from "@reduxjs/toolkit";

export const cardItemsSelector = (state) => state.card.cartItems;


export const cartItemsCountSelector = createSelector(
    cardItemsSelector,
    (cartItems) => {
        console.log("Cart Items:", cartItems); // Debug dữ liệu cartItems

        if (Array.isArray(cartItems)) {
            return cartItems.reduce((count, item) => count + item.quantity, 0);
        } else {
            console.error("cartItems is not an array");
            return 0;
        }
    }
);
// selectors.js

// Calculate total of cart
export const cartTotalSelector = createSelector(
    cardItemsSelector,
    (cartItems) => {
        console.log("Cart Items:", cartItems); // Debug cartItems
        const total = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        console.log("Total Price:", total); // Debug total
        return total;
    }
);