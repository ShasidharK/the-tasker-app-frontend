import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";
import { addCardsInList } from "./cardsSlice";

const API_ENDPOINT = "/lists";
export const fetchLists = createAsyncThunk("lists/fetchLists", async (boardId, thunkAPI) => {
  try {
    const response = await api.get(`${API_ENDPOINT}/fetchLists?boardId=${boardId}`);
    const CardsArray = response.data.flatMap(list => list.Cards);
    // console.log(CardsArray)
    thunkAPI.dispatch(addCardsInList(CardsArray))
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch lists");
  }
});

export const createList = createAsyncThunk("lists/createList", async (listData, thunkAPI) => {
  try {
    const response = await api.post(API_ENDPOINT, listData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create list");
  }
});

export const updateList = createAsyncThunk("lists/updateList", async ({ id, ...updates }, thunkAPI) => {
  try {
    const response = await api.put(`${API_ENDPOINT}/${id}`, updates);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update list");
  }
});

export const deleteList = createAsyncThunk("lists/deleteList", async (id, thunkAPI) => {
  try {
    await api.delete(`${API_ENDPOINT}/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete list");
  }
});

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const idx = state.items.findIndex(l => l.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.items = state.items.filter(l => l.id !== action.payload);
      });
  }
});

export default listsSlice.reducer;