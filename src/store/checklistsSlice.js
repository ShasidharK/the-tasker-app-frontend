import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";
import { addCheckitemsInChecklists } from "./checkitemsSlice";

const API_ENDPOINT = "/checklists";

export const fetchChecklists = createAsyncThunk("checklists/fetchChecklists", async (cardId, thunkAPI) => {
  try {
    const response = await api.get(`${API_ENDPOINT}/fetchChecklists?cardId=${cardId}`);
    // console.log(response.data);
    const CheckitemsArray = response.data.flatMap(checklist => checklist.ChecklistItems);
    // console.log(CheckitemsArray)
    thunkAPI.dispatch(addCheckitemsInChecklists(CheckitemsArray))
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch checklists");
  }
});

export const createChecklist = createAsyncThunk("checklists/createChecklist", async (checklistData, thunkAPI) => {
  try {
    const response = await api.post(API_ENDPOINT, checklistData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create checklist");
  }
});

export const updateChecklist = createAsyncThunk("checklists/updateChecklist", async ({ id, ...updates }, thunkAPI) => {
  try {
    const response = await api.patch(`${API_ENDPOINT}/${id}`, updates);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update checklist");
  }
});

export const deleteChecklist = createAsyncThunk("checklists/deleteChecklist", async (id, thunkAPI) => {
  try {
    await api.delete(`${API_ENDPOINT}/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete checklist");
  }
});

const checklistsSlice = createSlice({
  name: "checklists",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  reducers: {
    addChecklistsInCards : (state, action) =>{
      // console.log(action.payload);
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChecklists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchChecklists.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.items = action.payload;
      })
      .addCase(fetchChecklists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createChecklist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateChecklist.fulfilled, (state, action) => {
        const idx = state.items.findIndex(cl => cl.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteChecklist.fulfilled, (state, action) => {
        state.items = state.items.filter(cl => cl.id !== action.payload);
      });
  }
});

export const {addChecklistsInCards} = checklistsSlice.actions;
export default checklistsSlice.reducer;