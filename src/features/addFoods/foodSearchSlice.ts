import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFoods, Food } from "./foodsAPI";

export interface FoodsState {
  food: Array<Food>;
  status: "idle" | "loading" | "failed";
}

const initialState: FoodsState = {
  food: null,
  status: "idle",
};

export const getFoodsAsync = createAsyncThunk(
  "foodsSearch/getFoods",
  async (search: string, { rejectWithValue }) => {
    try {
      const response = await getFoods(search).catch((error) => {
        return rejectWithValue(error.message);
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const foodsSearchSlice = createSlice({
  name: "foodsSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFoodsAsync.fulfilled, (state, action) => {
        state.food = action.payload;
        state.status = "idle";
      })
      .addCase(getFoodsAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getFoodsAsync.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const selectFoods = (state) => state.foods;

export default foodsSearchSlice.reducer;
