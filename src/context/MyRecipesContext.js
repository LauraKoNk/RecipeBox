import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyRecipesContext = createContext();

export function MyRecipesProvider({ children }) {
  const [myRecipes, setMyRecipes] = useState([]);

  async function loadRecipes() {
    try {
      const savedRecipes = await AsyncStorage.getItem('myRecipes');

      if (savedRecipes) {
        setMyRecipes(JSON.parse(savedRecipes));
      }
    } catch (error) {
      console.log('Erreur lors du chargement des recettes personnelles');
    }
  }

  async function addRecipe(recipe) {
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      isPersonal: true,
    };

    const newRecipes = [...myRecipes, newRecipe];

    setMyRecipes(newRecipes);

    try {
      await AsyncStorage.setItem(
        'myRecipes',
        JSON.stringify(newRecipes)
      );
    } catch (error) {
      console.log('Erreur lors de la sauvegarde de la recette');
    }
  }

  async function updateRecipe(updatedRecipe) {
    const newRecipes = myRecipes.map((recipe) => {
      if (recipe.id === updatedRecipe.id) {
        return updatedRecipe;
      }

      return recipe;
    });

    setMyRecipes(newRecipes);

    try {
      await AsyncStorage.setItem(
        'myRecipes',
        JSON.stringify(newRecipes)
      );
    } catch (error) {
      console.log('Erreur lors de la modification de la recette');
    }
  }

  async function deleteRecipe(recipeId) {
    const newRecipes = myRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );

    setMyRecipes(newRecipes);

    try {
      await AsyncStorage.setItem(
        'myRecipes',
        JSON.stringify(newRecipes)
      );
    } catch (error) {
      console.log('Erreur lors de la suppression de la recette');
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <MyRecipesContext.Provider
      value={{
        myRecipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </MyRecipesContext.Provider>
  );
}

export function useMyRecipes() {
  return useContext(MyRecipesContext);
}