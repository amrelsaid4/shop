import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
}


interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [], 
};

const BooksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
  },
});


export const { addBook, removeBook } = BooksSlice.actions;
export default BooksSlice.reducer;
