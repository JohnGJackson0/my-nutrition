import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/authentication/userSlice";
import passwordResetReducer from "../features/authentication/ResetPassword/PasswordResetSlice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import measurementSystemReducer from "../features/userSurvey/questions/MeasuringSystemSlice";
import userInfoMetricReducer from "../features/userSurvey/questions/UserInfoInMetricSlice";
import userInfoUsReducer from "../features/userSurvey/questions/UserInfoInUSSlice";
import userInfoReducer from "../features/userSurvey/questions/UserInfoSlice";

const reducers = combineReducers({
  user: userReducer,
  passwordReset: passwordResetReducer,
  measurementSystem: measurementSystemReducer,
  userInfoMetric: userInfoMetricReducer,
  userInfoUS: userInfoUsReducer,
  userInfo: userInfoReducer,
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
