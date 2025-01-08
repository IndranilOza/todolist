import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.register(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
