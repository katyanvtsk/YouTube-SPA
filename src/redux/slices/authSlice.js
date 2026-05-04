import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logIn, register } from "../../server/api";

const initialState = {
  loading: false,
  error: null,
  token: localStorage.getItem("token") || null,
  success: false, //успешный вход
  user: localStorage.getItem("user") || null,
};

//регистрация
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const data = { ...formData, age: parseInt(formData.age) };
      const res = await register(data);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

//логин
export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const res = await logIn(formData);
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      const user = {
        email: formData.email,
      };
      localStorage.setItem("user", JSON.stringify(user));

      return { token: res.token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
//получение токена
export const getToken = createAsyncThunk(
  "auth/getToken",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("токена нет");
      }

      return { token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

//выход
export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  selectors: {
    selectAuth: (state) => state,
  },
  extraReducers: (builder) => {
    //логин
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.success = true;
        state.loading = false;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.success = true;
        state.loading = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.success = false;
        state.loading = false;
        state.token = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "ошибка запроса";
        },
      );
  },
});

export const { selectAuth } = authSlice.selectors;
export default authSlice.reducer;
