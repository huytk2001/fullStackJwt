import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import userReducer from "../redux/userSlice";
import cardReducer from "../redux/Card/cardSlice";
import orderReducer from "../redux/orderSlice"
const rootReducer = combineReducers({
    user: userReducer,
    card: cardReducer,
    order: orderReducer
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "card"], // Persist cả user và card reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persist = persistStore(store);

export { store, persist };
export default store;