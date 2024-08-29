import { LoginResponse } from "./../interface/auth.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { RootState } from "./store";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
  token: string | null;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export interface UserState {
  token: string | null;
  loginErrorMessage?: string;
  profile?: UserProfile;
}

const initialState: UserState = {
  token: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.token ?? null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        "https://b20e349e3a741b9b.mokky.dev/auth",
        {
          email: params.email,
          password: params.password,
        }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
);

export const getProfile = createAsyncThunk<
  UserProfile,
  void,
  { state: RootState }
>("user/profile", async (_, thunkApi) => {
  const token = thunkApi.getState().user.token;
  const { data } = await axios.get<UserProfile>(
    "https://b20e349e3a741b9b.mokky.dev/auth_me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(data);
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.token = action.payload.token;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { logout, clearLoginError } = userSlice.actions;
export default userSlice.reducer;
