import { createSlice } from "@reduxjs/toolkit";

//note mesurement is stored in a different slice
export interface UserInfoUSState {
  weightInLb: number;
  heightInFt: number;
  heightInIn: number;
  weightError: string;
  heightErrorFt: string;
  heightErrorIn: string;
}

const initialState: UserInfoUSState = {
  weightInLb: null,
  heightInFt: null,
  heightInIn: null,
  weightError: "",
  heightErrorFt: "",
  heightErrorIn: "",
};

const userInfoMetricSlice = createSlice({
  name: "userInfoUS",
  initialState,
  reducers: {
    updateWeightLb: (state, action) => {
      if (
        _isWholeNumber(action.payload) &&
        _isValidWeight(parseInt(action.payload))
      ) {
        state.weightError = "";
        state.weightInLb = parseInt(action.payload);
      } else {
        state.weightError =
          "Please enter a whole number between 22 and 1322 into the weight field.";
      }

      state.weightInLb = action.payload;
    },
    updateHeightFt: (state, action) => {
      //action.payload should be a string from the user input, unvalidated
      if (
        _isWholeNumber(action.payload) &&
        _isValidFeet(parseInt(action.payload))
      ) {
        state.heightErrorFt = "";
      } else {
        state.heightErrorFt =
          "Please enter a valid value in Feet (under 8, must be a whole number).";
      }

      state.heightInFt = action.payload;
    },
    updateHeightIn: (state, action) => {
      //action.payload should be a string from the user input, unvalidated
      if (
        _isWholeNumber(action.payload) &&
        _isValidInch(parseInt(action.payload))
      ) {
        state.heightErrorIn = "";
      } else {
        state.heightErrorIn =
          "Please enter a valid value in Inch (under 12, must be a whole number).";
      }
      state.heightInIn = action.payload;
    },
  },
});

function _isValidWeight(n: number): boolean {
  return n >= 22 && n <= 1322;
}

function _isValidFeet(n: number): boolean {
  return n >= 1 && n <= 8;
}

function _isValidInch(n: number): boolean {
  return n >= 0 && n <= 12;
}

//TODO: fix letters ' ex is accepted
function _isWholeNumber(n: string): boolean {
  return !isNaN(parseInt(n)) && Number.isInteger(parseFloat(n));
}

export const { updateWeightLb, updateHeightFt, updateHeightIn } =
  userInfoMetricSlice.actions;

export const selectUserInfoUS = (state) => state.userInfoUS;

export default userInfoMetricSlice.reducer;
