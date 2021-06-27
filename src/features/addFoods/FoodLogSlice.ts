import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FoodLogState, logFoodState } from "../AccountAPI";
import { FoodData } from "./foodsAPI";

export const logFoodAsync = createAsyncThunk(
  "food/logFood",
  async (foodState: FoodLogState, { rejectWithValue }) => {
    try {
      const response = await logFoodState(foodState).catch((error) => {
        return rejectWithValue(error.message);
      });
      return response;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
