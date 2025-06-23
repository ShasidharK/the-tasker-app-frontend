import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";

const API_ENDPOINT = "/cards";

export const fetchCards = createAsyncThunk("cards/fetchCards", async (listId, thunkAPI) => {
  try {
    const response = await api.get(`${API_ENDPOINT}/fetchCards?listId=${listId}`);
    // console.log("Get cards thunk")
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch cards");
  }
});

export const createCard = createAsyncThunk("cards/createCard", async (cardData, thunkAPI) => {
  try {
    const response = await api.post(API_ENDPOINT, cardData);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create card");
  }
});

export const updateCard = createAsyncThunk("cards/updateCard", async ({ id, ...updates }, thunkAPI) => {
  try {
    const response = await api.put(`${API_ENDPOINT}/${id}`, updates);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update card");
  }
});

export const deleteCard = createAsyncThunk("cards/deleteCard", async (id, thunkAPI) => {
  try {
    await api.delete(`${API_ENDPOINT}/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete card");
  }
});

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  reducers: {
    addCardsInList : (state, action) =>{
      console.log(action.payload)
      state.items.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const idx = state.items.findIndex(c => c.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  }
});

export const { addCardsInList } = cardsSlice.actions;
export default cardsSlice.reducer;