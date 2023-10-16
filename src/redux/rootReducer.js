import { combineReducers } from "redux";
import { baseApi } from "../redux/api/baseApi";
import userReducers from "./features/users/userSlice";
import cartReducers from "./features/cart/cartSlice";

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducers,
  cart: cartReducers,
});
