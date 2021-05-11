import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/authentication/userSlice";
import passwordResetReducer from "../features/authentication/ResetPassword/PasswordResetSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    passwordReset: passwordResetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
