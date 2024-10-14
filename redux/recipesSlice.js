// redux/recipesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    categories: [],
    trendingMeals: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTrendingMeals: (state, action) => {
      state.trendingMeals = action.payload;
    },
  },
});

export const { setCategories, setTrendingMeals } = recipesSlice.actions;
export default recipesSlice.reducer;
