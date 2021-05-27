import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Food, FoodData, getFood } from "./foodsAPI";

export interface FoodState {
  food: FoodData;
  status: "idle" | "loading" | "failed";
  error: string;
}

const initialState: FoodState = {
  food: new FoodData(new Food("", ""), []),
  status: "idle",
  error: "",
};

export const setFoodAsync = createAsyncThunk(
  "food/getFood",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getFood(id).catch((error) => {
        return rejectWithValue(error.message);
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setFoodAsync.fulfilled, (state, action) => {
        state.food = action.payload;
        state.status = "idle";
        state.error = "";
      })
      .addCase(setFoodAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(setFoodAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      });
  },
});

//TODO: find correct state object
export const selectFood = (state) => state.food;

//foodSliceReducer
export default foodSlice.reducer;
