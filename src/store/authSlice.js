import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";

// Helper function to get token from localStorage
const getStoredToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

// Initialize auth state from localStorage if available
const storedToken = getStoredToken();
let initialUser = null;

// If token exists in localStorage, set initial state with token
try {
  const userString = localStorage.getItem('user');
  if (userString) {
    initialUser = JSON.parse(userString);
  }
} catch (error) {
  console.error('Error parsing stored user:', error);
}

export const login = createAsyncThunk("/auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const response = await api.post(`/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const register = createAsyncThunk("/auth/register", async ({ username, email, password }, thunkAPI) => {
  try {
    const response = await api.post(`/auth/register`, { username, email, password });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
    token: storedToken,
    status: "idle",
    error: null,
    isAuthenticated: !!storedToken
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;