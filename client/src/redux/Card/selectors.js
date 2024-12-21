import { createSelector } from "@reduxjs/toolkit";

export const cardItemsSelector = (state) => state.card.cartItems;


export const cartItemsCountSelector = createSelector(
    cardItemsSelector,
    (cartItems) => {


        if (Array.isArray(cartItems)) {
            return cartItems.reduce((count, item) => count + item.quantity, 0);
        } else {

            return 0;
        }
    }
);
// selectors.js

// Calculate total of cart
export const cartTotalSelector = createSelector(
    cardItemsSelector,
    (cartItems) => {
        const total = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        return total;
    }
);