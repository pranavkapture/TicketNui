import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index'; // Adjust the import if needed

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools only in development
  // If you have custom middleware or need to configure it further, you can do so here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Example of additional middleware configuration
    }),
});

export default store;
