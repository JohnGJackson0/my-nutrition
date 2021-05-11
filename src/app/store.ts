import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/authentication/userSlice";
import passwordResetReducer from "../features/authentication/ResetPassword/PasswordResetSlice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({
  user: userReducer,
  passwordReset: passwordResetReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["passwordReset"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  //middleware: [thunk],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
