import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { submitCalorieGoal } from "../AccountStorageAPI";

export interface UserInfoState {
  isMale: boolean;
  age: number;
  ageError: string;
  weeklyActivity: number;
  weeklyActivityError: string;
  calorieGoal: number;
  calorieGoalError: string;
}

const initialState: UserInfoState = {
  isMale: true,
  age: null,
  ageError: "",
  weeklyActivityError: "",
  weeklyActivity: null,
  calorieGoal: null,
  calorieGoalError: "No calorie goal set.",
};

export interface SubmitGoalArgs {
  calorieGoal: number;
}

export const submitGoalAsync = createAsyncThunk(
  "userInfo/submitGoal",
  async ({ calorieGoal }: SubmitGoalArgs, { rejectWithValue }) => {
    try {
      const response = await submitCalorieGoal(calorieGoal).catch((error) => {
        return rejectWithValue(error.message);
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getGoalAsync = createAsyncThunk(
  "userInfo/getGoal",
  async (undefined, { rejectWithValue }) => {
    try {
      const response = await getGoalAsync().catch((error) => {
        return rejectWithValue(error.message);
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateAge: (state, action) => {
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
    updateWeeklyActivity: (state, action) => {
      //TODO: updates payload anyway.
      if (
        _isWholeNumber(action.payload) &&
        _isValidWeeklyActivity(parseInt(action.payload))
      ) {
        state.weeklyActivity = parseInt(action.payload);
        state.weeklyActivityError = "";
      } else {
        state.weeklyActivityError =
          "Please enter valid weekly activity between 0 and 30.";
      }

      state.weeklyActivity = action.payload;
    },

    updateGender: (state, action) => {
      state.isMale = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitGoalAsync.fulfilled, (state, action) => {
        state.calorieGoal = action.payload;
        if (action.payload > 0) {
          state.calorieGoalError = "";
        }
      })
      .addCase(submitGoalAsync.rejected, (state, action) => {
        state.calorieGoalError = action.payload as string;
      })
      .addCase(getGoalAsync.fulfilled, (state, action) => {
        state.calorieGoal = action.payload;
        if (action.payload > 0) {
          state.calorieGoalError = "";
        }
      })
      .addCase(getGoalAsync.rejected, (state, action) => {
        state.calorieGoalError = action.payload as string;
      });
  },
});

//TODO: fix letters ' ex is accepted
function _isWholeNumber(n: string): boolean {
  return !isNaN(parseInt(n)) && Number.isInteger(parseFloat(n));
}

function _isValidAge(n: number): boolean {
  return n >= 10 && n <= 130;
}

function _isValidWeeklyActivity(n: number): boolean {
  return n >= 0 && n <= 30;
}

export const { updateAge, updateGender, updateWeeklyActivity } =
  userInfoSlice.actions;

export const selectUserInfo = (state) => state.userInfo;

export default userInfoSlice.reducer;
