import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";

const API_ENDPOINT = "/boards";

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async (_, thunkAPI) => {
  try {
    const response = await api.get(`${API_ENDPOINT}/fetchBoards`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch boards");
  }
});

export const createBoard = createAsyncThunk("boards/createBoard", async (boardData, thunkAPI) => {
  try {
    const response = await api.post(API_ENDPOINT, boardData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create board");
  }
});

export const updateBoard = createAsyncThunk("boards/updateBoard", async ({ id, ...updates }, thunkAPI) => {
  try {
    const response = await api.put(`${API_ENDPOINT}/${id}`, updates);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update board");
  }
});

export const deleteBoard = createAsyncThunk("boards/deleteBoard", async (id, thunkAPI) => {
  try {
    await api.delete(`${API_ENDPOINT}/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete board");
  }
});

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        console.log("createBoard in extraReducer : " + action.payload);
        state.items.push(action.payload);
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        const idx = state.items.findIndex(b => b.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.items = state.items.filter(b => b.id !== action.payload);
      });
  }
});

export default boardsSlice.reducer;