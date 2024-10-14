import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import CustomList from '../components/CustomList';
import { globalStyles } from '../styles/globalStyles';
import { Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton'; 
import { lookupMealById } from '../models/api';  // Import API function to fetch full meal details

const DetailsScreen = ({ route }) => {
  const { selectedItem } = route.params;
  const [mealDetails, setMealDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const navigation = useNavigation();

  // Fetch full meal details by meal ID
  useEffect(() => {
    const fetchMealDetails = async () => {
      if (selectedItem.idMeal) {
        const mealData = await lookupMealById(selectedItem.idMeal);
        setMealDetails(mealData);
      }
      setIsLoading(false);
    };

    fetchMealDetails();
  }, [selectedItem]);

  // Check if the item is in favorites
  useEffect(() => {
    if (mealDetails) {
      setIsFavorite(favorites.some((meal) => meal.idMeal === mealDetails.idMeal));
    }
  }, [favorites, mealDetails]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(mealDetails));
    } else {
      dispatch(addFavorite(mealDetails));
    }
    setIsFavorite(!isFavorite);
    setSnackbarVisible(true);
  };

  const getIngredients = () => {
    const ingredients = [];
    if (mealDetails) {
      for (let i = 1; i <= 20; i++) {
        const ingredient = mealDetails[`strIngredient${i}`];
        const measure = mealDetails[`strMeasure${i}`];
        if (ingredient) {
          ingredients.push({ ingredient, measure });
        }
      }
    }
    return ingredients;
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FC6474" />
      </View>
    );
  }

  const ingredients = getIngredients();

  return (
    <CustomList>
      { navigation.canGoBack() && <BackButton />}

      {mealDetails && (
        <>
          <Image source={{ uri: mealDetails.strMealThumb }} style={styles.image} />
          <View style={styles.container}>
            <Text style={globalStyles.title}>{mealDetails.strMeal}</Text>
            
            {/* Instructions */}
            <Text style={globalStyles.subtitle}>Instructions</Text>
            <Text style={styles.instructions}>{mealDetails.strInstructions}</Text>

            {/* Ingredients */}
            <Text style={globalStyles.subtitle}>Ingredients</Text>
            <FlatList
              data={ingredients}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.ingredientRow}>
                  <Text style={styles.ingredientText}>{item.ingredient}</Text>
                  <Text style={styles.measureText}>{item.measure}</Text>
                </View>
              )}
            />

            {/* Add/Remove from Favorites Button */}
            <TouchableOpacity 
              style={[styles.favoriteButton, { backgroundColor: isFavorite ? '#FC6474' : '#3CB371' }]}
              onPress={handleFavoriteToggle}
            >
              <Icon name={isFavorite ? 'heart' : 'hearto'} size={24} color="white" />
              <Text style={styles.favoriteButtonText}>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Text>
            </TouchableOpacity>

            {/* Snackbar for feedback on favorite action */}
            <Snackbar
              visible={snackbarVisible}
              onDismiss={() => setSnackbarVisible(false)}
              duration={3000}
            >
              {isFavorite ? "Removed from Favorites" : "Added to Favorites"}
            </Snackbar>
          </View>
        </>
      )}
    </CustomList>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  container: {
    padding: 20,
  },
  instructions: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 22,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  ingredientText: {
    fontSize: 16,
    fontWeight: '500',
  },
  measureText: {
    fontSize: 16,
    color: 'gray',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 20,
  },
  favoriteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default DetailsScreen;
