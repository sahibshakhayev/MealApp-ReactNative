// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import recipesReducer from './recipesSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    recipes: recipesReducer,
  },
});

export default store;
