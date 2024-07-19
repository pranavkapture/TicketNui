import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index'; // Adjust the import if needed

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Example of additional middleware configuration
    }),
});

export default store;
