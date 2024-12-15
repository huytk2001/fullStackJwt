import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "../redux/userSlice";

// Kết hợp reducer bằng combineReducers
const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

// Tạo persistedReducer bằng persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store với persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
export default store;
