import { createSlice } from "@reduxjs/toolkit";

//note mesurement is stored in a different slice
export interface UserInfoMetricState {
  weightInKg: number;
  heightInCM: number;
  weightError: string;
  heightInCMError: string;
}

const initialState: UserInfoMetricState = {
  weightInKg: null,
  heightInCM: null,
  weightError: "",
  heightInCMError: "",
};

const userInfoMetricSlice = createSlice({
  name: "userInfoMetric",
  initialState,
  reducers: {
    updateWeightMetric: (state, action) => {
      if (
        _isWholeNumber(action.payload) &&
        _isValidWeight(parseInt(action.payload))
      ) {
        state.weightError = "";
        state.weightInKg = parseInt(action.payload);
      } else {
        state.weightError =
          "Please enter a whole number between 10 and 600 into the weight field.";
      }

      state.weightInKg = action.payload;
    },
    updateHeightMetric: (state, action) => {
      //action.payload should be a string from the user input, unvalidated
      if (
        _isWholeNumber(action.payload) &&
        _isValidHeight(parseInt(action.payload))
      ) {
        state.heightInCM = parseInt(action.payload);
        state.heightInCMError = "";
      } else {
        state.heightInCMError =
          "Please enter a whole number between 30 and 275 into the height field.";
      }
      state.heightInCM = action.payload;
    },
  },
});

function _isValidWeight(n: number): boolean {
  return n >= 10 && n <= 600;
}

function _isValidHeight(n: number): boolean {
  return n >= 30 && n <= 275;
}

function _isWholeNumber(n: string): boolean {
  return !isNaN(parseInt(n)) && Number.isInteger(parseFloat(n));
}

export const { updateWeightMetric, updateHeightMetric } =
  userInfoMetricSlice.actions;

export const selectUserInfoMetric = (state) => state.userInfoMetric;

export default userInfoMetricSlice.reducer;
