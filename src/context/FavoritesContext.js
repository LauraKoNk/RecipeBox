import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function addFavorite(recipe) {
    setFavorites([...favorites, recipe]);
  }

  function removeFavorite(recipeId) {
    const newFavorites = favorites.filter(
      (recipe) => recipe.id !== recipeId
    );

    setFavorites(newFavorites);
  }

  function isFavorite(recipeId) {
    return favorites.some(
      (recipe) => recipe.id === recipeId
    );
  }

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