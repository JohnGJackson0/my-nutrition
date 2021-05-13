import { createSlice } from "@reduxjs/toolkit";

//note mesurement is stored in a different slice
export interface UserInfoUSState {
  isMale: boolean;
  age: number;
  ageError: string;
}

const initialState: UserInfoUSState = {
  isMale: true,
  age: null,
  ageError: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateAge: (state, action) => {
      //action.payload should be a string from the user input, unvalidated
      if (
        _isWholeNumber(action.payload) &&
        _isValidAge(parseInt(action.payload))
      ) {
        state.age = parseInt(action.payload);
        state.ageError = "";
      } else {
        state.ageError =
          "Please enter a whole number between 10 and 130 into the age field.";
      }

      state.age = action.payload;
    },
    updateGender: (state, action) => {
      state.isMale = action.payload;
    },
  },
});

function _isWholeNumber(n: string): boolean {
  return !isNaN(parseInt(n)) && Number.isInteger(parseFloat(n));
}

function _isValidAge(n: number): boolean {
  return n >= 10 && n <= 130;
}

export const { updateAge, updateGender } = userInfoSlice.actions;

export const selectUserInfo = (state) => state.userInfo;

export default userInfoSlice.reducer;
