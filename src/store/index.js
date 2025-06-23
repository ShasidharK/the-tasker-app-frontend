import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import boardsReducer from './boardsSlice'
import listsReducer from './listsSlice'
import cardsReducer from './cardsSlice'
import checklistsReducer from './checklistsSlice'
import checkitemsReducer from './checkitemsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer,
    checklists: checklistsReducer,
    checkitems: checkitemsReducer
  },
  devTools: true
})