import { createSlice } from "@reduxjs/toolkit";

export interface MesuringSystemState {
  isUSAMeasurement: boolean;
}

const initialState: MesuringSystemState = {
  isUSAMeasurement: true,
};

const measuringSystemSlice = createSlice({
  name: "measurementSystem",
  initialState,
  reducers: {
    setIsUSAMeasurement: (state, action) => {
      state.isUSAMeasurement = action.payload;
    },
  },
});

export const { setIsUSAMeasurement } = measuringSystemSlice.actions;

export const selectIsUSAMeasurement = (state) =>
  state.measurementSystem.isUSAMeasurement;

export default measuringSystemSlice.reducer;

