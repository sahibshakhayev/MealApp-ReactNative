const API_URL = 'https://www.themealdb.com/api/json/v1/1';
import axios from 'axios';
export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories.php`);
  return await response.json();
};

export const fetchRandomMeals = async (count = 10) => {
  let meals = [];
  for (let i = 0; i < count; i++) {
    const response = await fetch(`${API_URL}/random.php`);
    const data = await response.json();
    meals.push(data.meals[0]);
  }
  return meals;
};


export async function lookupMealById(mealId) {
  try {
    const response = await axios.get(`${API_URL}/lookup.php?i=${mealId}`);
    return response.data.meals[0]; // Return the full meal details
  } catch (error) {
    console.error('Error fetching meal details:', error);
    return null;
  }
}

export const fetchMealsByCategory = async (category) => {
  const response = await fetch(`${API_URL}/filter.php?c=${category}`);
  return await response.json();
};

export const fetchMealsBySearch = async (query) => {
  const response = await fetch(`${API_URL}/search.php?s=${query}`);
  return await response.json();
};
