import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./account";

export const rootReducer = combineReducers({
  account: accountSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./index", () => {
    const newRootReducer = require("./index").rootReducer;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export default store;
