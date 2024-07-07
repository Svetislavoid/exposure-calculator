import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isShown: false,
    customFieldsConfig: []
  },
  reducers: {
    toggleModal: (state) => {
      // Redux Toolkit allows us to write 'mutating' logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a 'draft state' and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.isShown = !state.isShown;
    },
    setCustomFieldsConfig: (state, data) => {
      state.customFieldsConfig = data.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleModal, setCustomFieldsConfig } = modalSlice.actions;

export default modalSlice.reducer;
