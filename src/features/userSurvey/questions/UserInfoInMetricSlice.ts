import { createSlice } from "@reduxjs/toolkit";

//note mesurement is stored in a different slice
export interface UserInfoMetricState {
  weightInKg: number;
  heightInCm: number;
  weightError: string;
  heightInCmError: string;
}

const initialState: UserInfoMetricState = {
  weightInKg: null,
  heightInCm: null,
  weightError: "",
  heightInCmError: "",
};

const userInfoMetricSlice = createSlice({
  name: "userInfoMetric",
  initialState,
  reducers: {
    updateWeightKm: (state, action) => {
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
    updateHeightCm: (state, action) => {
      //action.payload should be a string from the user input, unvalidated
      if (
        _isWholeNumber(action.payload) &&
        _isValidHeight(parseInt(action.payload))
      ) {
        console.log("passed");
        state.heightInCm = parseInt(action.payload);
        state.heightInCmError = "";
      } else {
        state.heightInCmError =
          "Please enter a whole number between 30 and 275 into the height field.";
      }
      state.heightInCm = action.payload;
    },
  },
});

function _isValidWeight(n: number): boolean {
  return n >= 10 && n <= 600;
}

function _isValidHeight(n: number): boolean {
  return n >= 30 && n <= 275;
}

//TODO: fix letters ' ex is accepted
function _isWholeNumber(n: string): boolean {
  return !isNaN(parseInt(n)) && Number.isInteger(parseFloat(n));
}

export const { updateWeightKm, updateHeightCm } = userInfoMetricSlice.actions;

export const selectUserInfoMetric = (state) => state.userInfoMetric;

export default userInfoMetricSlice.reducer;
