import { createSlice } from '@reduxjs/toolkit';

export const reducers = createSlice({
  name: 'global',
  initialState: {
    isModalShown: false,
    isAboutPage: false,
    showResult: false
  },
  reducers: {
    toggleModal: (state) => {
      // Redux Toolkit allows us to write 'mutating' logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a 'draft state' and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.isModalShown = !state.isModalShown;
    },
    toggleResult: (state) => {
      state.showResult = !state.showResult
    },
    toggleAboutPage: (state) => {
      state.isAboutPage = !state.isAboutPage
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleModal, toggleResult, toggleAboutPage } = reducers.actions;

export default reducers.reducer;
