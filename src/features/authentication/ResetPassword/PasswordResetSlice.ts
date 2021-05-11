import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { resetPassword } from "../authAPI";
import { Email } from "../entities";

export interface PasswordResetState {
  passwordResetMessage: String | null;
}

const initialState: PasswordResetState = {
  passwordResetMessage: null,
};

export const resetPasswordAsync = createAsyncThunk(
  "passwordReset/reset",
  async (email: string, { rejectWithValue }) => {
    try {
      const message = await resetPassword(new Email(email));
      console.log("make fulfilled ", message);
      return message;
    } catch (error) {
      console.log("make error ", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const selectPasswordResetMessage = (state: RootState) =>
  state.passwordReset;

const PasswordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        console.log("error 3 ", action.payload as string);
        state.passwordResetMessage = action.payload as string;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        console.log("fulfilled called ", action.payload as string);
        state.passwordResetMessage = action.payload as string;
      });
  },
});

export default PasswordResetSlice.reducer;
