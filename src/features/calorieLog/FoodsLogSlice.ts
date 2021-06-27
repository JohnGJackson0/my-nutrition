import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FoodLogState, getFoodState } from "../AccountAPI";

export interface FoodLogs {
  foodLogs: Array<FoodLogState>;
  status: "idle" | "loading" | "failed";
}

const initialState: FoodLogs = {
  foodLogs: null,
  status: "idle",
};

export const getFoodLogsAsync = createAsyncThunk(
  "foodsLogged/getFoodsLogged",
  async (uid: string, { rejectWithValue }) => {
    try {
      const response = await getFoodState(uid).catch((error) => {
        return rejectWithValue(error.message);
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const foodsLogSlice = createSlice({
  name: "foodsLogged",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFoodLogsAsync.fulfilled, (state, action) => {
        //similar error to the link below,
        //status: "idle" causes immer error.
        //http://5.9.10.113/67418074/redux-thunk-modifying-state-unhandled-promise-rejection-error-immer-immer
        return (state = {
          ...state,
          status: "idle",
          foodLogs: action.payload,
        });
      })
      .addCase(getFoodLogsAsync.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
        });
      })
      .addCase(getFoodLogsAsync.pending, (state) => {
        return (state = {
          ...state,
          status: "loading",
        });
      });
  },
});

export const selectFoods = (state) => state.foodLog;

export default foodsLogSlice.reducer;
