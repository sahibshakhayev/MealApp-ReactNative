// src/api.js
import axios from 'axios';

const API_URL = 'https://www.themealdb.com/api/json/v1/1';


export const searchMealByName = async (mealName) => {
    try {
      const response = await axios.get(`${API_URL}/search.php?s=${mealName}`);
      return response.data.meals;
    } catch (error) {
      console.error('Error searching meal by name:', error);
      return null;
    }
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


// Function to get all filter options (categories, areas, ingredients)
export const getFilterOptions = async () => {
  try {
    const [categoriesRes, areasRes, ingredientsRes] = await Promise.all([
      axios.get(`${API_URL}/list.php?c=list`),  // List all categories
      axios.get(`${API_URL}/list.php?a=list`),  // List all areas
      axios.get(`${API_URL}/list.php?i=list`),  // List all ingredients
    ]);

    return {
      categories: categoriesRes.data.meals,
      areas: areasRes.data.meals,
      ingredients: ingredientsRes.data.meals,
    };
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return null;
  }
};

// Function to filter meals by selected category, area, and ingredient
export const filterMeals = async ({ category, area, ingredient }) => {
  try {
    let filterUrl = `${API_URL}/filter.php?`;

    if (category) {
      filterUrl += `c=${category}&`;
    }

    if (area) {
      filterUrl += `a=${area}&`;
    }

    if (ingredient) {
      filterUrl += `i=${ingredient}&`;
    }

    const response = await axios.get(filterUrl);
    return response.data.meals;
  } catch (error) {
    console.error('Error filtering meals:', error);
    return null;
  }
};

// Function to fetch meal details by ID
export const lookupMealById = async (mealId) => {
  try {
    const response = await axios.get(`${API_URL}/lookup.php?i=${mealId}`);
    return response.data.meals[0];
  } catch (error) {
    console.error('Error fetching meal details:', error);
    return null;
  }
};

// Function to get a random meal
export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${API_URL}/random.php`);
    return response.data.meals[0];
  } catch (error) {
    console.error('Error fetching random meal:', error);
    return null;
  }
};
