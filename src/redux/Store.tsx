import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../components/CartSlice";
import booksReducer from "./BooksSlice"; 

const store = configureStore({
  reducer: {
    cart: cartReducer,
    books: booksReducer, 
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
