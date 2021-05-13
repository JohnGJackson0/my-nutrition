import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetPassword } from "../authAPI";
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
      const message = await resetPassword(email);
      return message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const selectPasswordResetMessage = (state) => state.passwordReset;

const PasswordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.passwordResetMessage = action.payload as string;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.passwordResetMessage = action.payload as string;
      });
  },
});

export default PasswordResetSlice.reducer;
