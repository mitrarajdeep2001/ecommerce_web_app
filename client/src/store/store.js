import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";

import shopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";

// Combine all your reducers
const rootReducer = combineReducers({
  auth: authReducer,

  adminProducts: adminProductsSlice,
  adminOrder: adminOrderSlice,

  shopProducts: shopProductsSlice,
  shopCart: shopCartSlice,
  shopAddress: shopAddressSlice,
  shopOrder: shopOrderSlice,
  shopSearch: shopSearchSlice,
  shopReview: shopReviewSlice,

  commonFeature: commonFeatureSlice,
});

// Redux persist configuration
const persistConfig = {
  key: "root",
  storage, // Using localStorage as the default storage
  whitelist: ["auth"], // Add the reducers you want to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
