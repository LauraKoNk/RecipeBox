import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  async function loadFavorites() {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.log('Erreur lors du chargement des favoris');
    }
  }

  async function addFavorite(recipe) {
    const newFavorites = [...favorites, recipe];

    setFavorites(newFavorites);

    try {
      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify(newFavorites)
      );
    } catch (error) {
      console.log('Erreur lors de la sauvegarde des favoris');
    }
  }

  async function removeFavorite(recipeId) {
    const newFavorites = favorites.filter(
      (recipe) => recipe.id !== recipeId
    );

    setFavorites(newFavorites);

    try {
      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify(newFavorites)
      );
    } catch (error) {
      console.log('Erreur lors de la sauvegarde des favoris');
    }
  }

  function isFavorite(recipeId) {
    return favorites.some(
      (recipe) => recipe.id === recipeId
    );
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}