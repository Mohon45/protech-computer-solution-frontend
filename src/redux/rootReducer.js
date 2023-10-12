import { combineReducers } from "redux";
import { baseApi } from "../redux/api/baseApi";
import userReducers from "./features/users/userSlice";

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducers,
});
