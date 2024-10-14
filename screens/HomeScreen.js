import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, FlatList, ActivityIndicator, TouchableNativeFeedback, Image,
  StyleSheet, SafeAreaView, StatusBar, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setTrendingMeals } from '../redux/recipesSlice';
import { fetchCategories, fetchRandomMeals } from '../models/api';
import { globalStyles } from '../styles/globalStyles';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { categories, trendingMeals } = useSelector((state) => state.recipes);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoryData = await fetchCategories();
        const trendingData = await fetchRandomMeals(10);
        dispatch(setCategories(categoryData.categories));
        dispatch(setTrendingMeals(trendingData));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  const searchFilterFunction = (text) => {
    setSearchKeyword(text);
  };

  return (
    isLoading ? (
      <View style={styles.loaderContainer}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={styles.container}>
          
          {/* Header Text */}
          <View style={styles.header}>
            <Text style={styles.title}>Sahib Meal App</Text>
            <Text style={styles.subtitle}>Final Project for React Native Course</Text>
          </View>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              onChangeText={searchFilterFunction}
              value={searchKeyword}
            />
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#00000040', false)}
              onPress={() => {
                if (!searchKeyword) return;
                navigation.navigate('Recipes', { searchKeyword });
                setSearchKeyword('');
              }}
            >
              <View style={styles.searchButton}>
                <Icon name="search-outline" size={30} color="white" />
              </View>
            </TouchableNativeFeedback>
          </View>

          {/* View Favorites Button */}
          <TouchableOpacity
            style={styles.favoritesButton}
            onPress={() => navigation.navigate('Favorites')}
          >
            <Icon name="heart-outline" size={20} color="white" />
            <Text style={styles.favoritesButtonText}>View Favorites</Text>
          </TouchableOpacity>

          {/* Conditionally render Categories and Trending when no search keyword */}
          {searchKeyword === '' && (
            <>
              {/* Categories Section */}
              <Text style={styles.sectionTitle}>Categories</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                data={categories}
                keyExtractor={(item) => item.idCategory}
                renderItem={({ item }) => (
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('#00000040', false)}
                    onPress={() => navigation.navigate('Recipes', { category: item })}
                  >
                    <View style={styles.categoryItem}>
                      <Image source={{ uri: item.strCategoryThumb }} style={styles.categoryImage} />
                      <View style={styles.categoryOverlay}>
                        <Text style={styles.categoryText} numberOfLines={1}>{item.strCategory}</Text>
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                )}
              />
              
              {/* Trending Meals Section */}
              <Text style={styles.sectionTitle}>Trending</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                data={trendingMeals.slice(0, 5)}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => (
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('#00000040', false)}
                    onPress={() => navigation.navigate('Details', { selectedItem: item })}
                  >
                    <View style={styles.trendingItem}>
                      <Image source={{ uri: item.strMealThumb }} style={styles.trendingImage} />
                      <View style={styles.trendingOverlay}>
                        <Text style={styles.trendingText} numberOfLines={1}>{item.strMeal}</Text>
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                )}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 17,
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F0EEEE',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: '600',
  },
  searchButton: {
    backgroundColor: '#FC6474',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 60,
    width: 70,
    marginLeft: 10,
  },
  favoritesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC6474',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  favoritesButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: '500',
    paddingHorizontal: 2,
    marginVertical: 10,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  categoryItem: {
    overflow: 'hidden',
    borderRadius: 12,
    margin: 4,
    justifyContent: 'flex-end',
    width: 100,
    height: 100,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingVertical: 5,
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
  },
  trendingItem: {
    borderRadius: 24,
    margin: 4,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: 180,
    height: 180,
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    alignItems: 'flex-start',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  trendingText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
