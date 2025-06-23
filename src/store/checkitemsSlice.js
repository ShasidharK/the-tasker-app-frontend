import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";

const API_ENDPOINT = "/checklist-items";

export const fetchCheckitems = createAsyncThunk("checkitems/fetchCheckitems", async (checklistId, thunkAPI) => {
  try {
    const response = await api.get(`${API_ENDPOINT}/fetchChecklistItems?checklistId=${checklistId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch checkitems");
  }
});

export const createCheckitem = createAsyncThunk("checkitems/createCheckitem", async (checkitemData, thunkAPI) => {
  try {
    const response = await api.post(API_ENDPOINT, checkitemData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create checkitem");
  }
});

export const updateCheckitem = createAsyncThunk("checkitems/updateCheckitem", async ({ id, ...updates }, thunkAPI) => {
  try {
    const response = await api.put(`${API_ENDPOINT}/${id}`, updates);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update checkitem");
  }
});

export const deleteCheckitem = createAsyncThunk("checkitems/deleteCheckitem", async (id, thunkAPI) => {
  try {
    await api.delete(`${API_ENDPOINT}/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete checkitem");
  }
});

const checkitemsSlice = createSlice({
  name: "checkitems",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckitems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCheckitems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCheckitems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createCheckitem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCheckitem.fulfilled, (state, action) => {
        const idx = state.items.findIndex(ci => ci.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteCheckitem.fulfilled, (state, action) => {
        state.items = state.items.filter(ci => ci.id !== action.payload);
      });
  }
});

export default checkitemsSlice.reducer;