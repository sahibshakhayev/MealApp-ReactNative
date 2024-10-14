import React from 'react';
import { View, Text, FlatList,SafeAreaView, Image, TouchableNativeFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { globalStyles } from '../styles/globalStyles';


import BackButton from '../components/BackButton'; 

const FavoritesScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.favorites.items);
 

  return (
    <SafeAreaView style={globalStyles.containerMargin}>
       { navigation.canGoBack() && <BackButton />}
    <View style={globalStyles.container}>
      
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <TouchableNativeFeedback onPress={() => navigation.navigate('Details', { selectedItem: item })}>
              <View style={{ marginVertical: 10, borderRadius: 8, overflow: 'hidden' }}>
                <Image source={{ uri: item.strMealThumb }} style={globalStyles.listItemImage} />
                <Text style={globalStyles.listItemTitle}>{item.strMeal}</Text>
              </View>
            </TouchableNativeFeedback>
          )}
          keyExtractor={(item) => item.idMeal}
        />
      ) : (
        <View style={globalStyles.centered}>
          <Text style={globalStyles.subtitle}>No Favorites Yet</Text>
        </View>
      )}
    </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
