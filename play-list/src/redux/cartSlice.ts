import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import cartItems from '../data/cartItems';

const initialState = {
  items: cartItems,
  totalAmount: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name : 'cart',
  initialState,
  reducers: {
    increase: (state, action:PayloadAction<string>) => {
      const item = state.items.find(item=>item.id===action.payload);
      if(item) item.amount += 1;
    },
    decrease: (state, action:PayloadAction<string>) => {
      const item = state.items.find(item=>item.id===action.payload);
      if(item) item.amount -= 1;
    },
    removeItem: (state, action:PayloadAction<string>) =>{
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },
    calculateTotals: (state) => {
      state.totalAmount = state.items.reduce((total,item)=>{
        return total + item.amount;
      },0);

      state.totalPrice = state.items.reduce((total,item)=>{
        return total + parseInt(item.price) * item.amount;
      },0);
    },
  },
})

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer