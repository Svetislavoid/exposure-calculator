import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './reducers';

export default configureStore({
  reducer: {
    global: globalReducer
  },
});
