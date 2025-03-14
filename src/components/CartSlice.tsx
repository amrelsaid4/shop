import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalAmount = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      state.totalAmount = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
      state.totalAmount = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // إضافة reducer جديد لتحميل العناصر من localStorage
    loadCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, loadCart } =
  cartSlice.actions;

export default cartSlice.reducer;