import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator, SafeAreaView, TouchableNativeFeedback, Image
} from 'react-native';
import { fetchMealsByCategory, fetchMealsBySearch } from '../models/api';
import CustomList from '../components/CustomList';
import { globalStyles } from '../styles/globalStyles';
import BackButton from '../components/BackButton'; 


const RecipesScreen = ({ route, navigation }) => {
  const { searchKeyword, category } = route.params || {};
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const mealData = searchKeyword
          ? await fetchMealsBySearch(searchKeyword)
          : await fetchMealsByCategory(category.strCategory);
        setMeals(mealData.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [searchKeyword, category]);

  return (
    <SafeAreaView style={globalStyles.containerMargin}>
    <View style={globalStyles.container}>
      { navigation.canGoBack() && <BackButton />}
      {isLoading ? (
        <View style={globalStyles.centered}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <CustomList>
          <View style={{ padding: 10 }}>
            <Text style={globalStyles.title}>
              {searchKeyword ? `Search: "${searchKeyword}"` : category.strCategory}
            </Text>
            {meals.length === 0 ? (
              <Text style={globalStyles.subtitle}>No results found.</Text>
            ) : (
              <FlatList
                data={meals}
                renderItem={({ item }) => (
                  <TouchableNativeFeedback
  onPress={() => navigation.navigate('Details', { selectedItem: item })}  // Pass the selected meal
>
  <View style={{ margin: 10, borderRadius: 8, overflow: 'hidden' }}>
    <Image source={{ uri: item.strMealThumb }} style={globalStyles.listItemImage} />
    <Text style={globalStyles.listItemTitle}>{item.strMeal}</Text>
  </View>
</TouchableNativeFeedback>

                )}
                keyExtractor={(item) => item.idMeal}
              />
            )}
          </View>
        </CustomList>
      )}
    </View>
    </SafeAreaView>
  );
};

export default RecipesScreen;
