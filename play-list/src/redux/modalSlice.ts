import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    selectedItemId: null as string | null,
  };

export const modalSlice = createSlice({
  name : 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string | null>) => {
      state.isOpen = true;
      state.selectedItemId = action.payload; 
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectedItemId = null; 
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer