import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isCatchClause } from "typescript";
import { RootState } from "../../app/store";
import { signInUser, signUpUser, resetPassword } from "./authAPI";
import { User, Credential, Email } from "./entities";

export interface UserState {
  user: User | null;
  status: "idle" | "loading" | "failed";
  message: string;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  message: null,
};

export interface SignInArgs {
  email: string;
  password: string;
}

export const resetPasswordAsync = createAsyncThunk(
  "user/reset",
  async (email: string, { rejectWithValue }) => {
    try {
      const message = await resetPassword(new Email(email));
      return message;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const SignInAsync = createAsyncThunk(
  "user/signIn",
  async ({ email, password }: SignInArgs, { rejectWithValue }) => {
    try {
      const credential = new Credential(email, password);
      const response = await signInUser(credential).catch((error) => {
        return rejectWithValue(error.message);
      });
      return response;
    } catch (error) {
      console.log("error handled");
      return rejectWithValue(error.message);
    }
  }
);

export interface SignUpArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const signUpAsync = createAsyncThunk(
  "user/signUp",
  async (
    { firstName, lastName, email, password }: SignUpArgs,
    { rejectWithValue }
  ) => {
    try {
      const credential = new Credential(email, password);
      const user = new User(firstName, lastName, email);
      const response = await signUpUser(user, credential).catch((error) => {
        return rejectWithValue(error.message);
      });
      return response;
    } catch (error) {
      //catches synchronous errors ex. making the user/credential object
      return rejectWithValue(error.message);
    }
  }
);

export const selectLoggedInUser = (state: RootState) => state.user;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignInAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.message = null;
      })
      .addCase(SignInAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.message = null;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
        console.log(action.payload as string);
        state.user = null;
      })
      .addCase(SignInAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
        console.log(action.payload as string);
        state.user = null;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.message = action.payload as string;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.message = action.payload as string;
      });
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
