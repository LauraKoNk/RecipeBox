import { createContext, useContext, useState } from 'react';

const MyRecipesContext = createContext();

export function MyRecipesProvider({ children }) {
  const [myRecipes, setMyRecipes] = useState([]);

  function addRecipe(recipe) {
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      isPersonal: true,
    };

    setMyRecipes([...myRecipes, newRecipe]);
  }

  function updateRecipe(updatedRecipe) {
    const newRecipes = myRecipes.map((recipe) => {
      if (recipe.id === updatedRecipe.id) {
        return updatedRecipe;
      }

      return recipe;
    });

    setMyRecipes(newRecipes);
  }

  return (
    <MyRecipesContext.Provider
      value={{
        myRecipes,
        addRecipe,
        updateRecipe,
      }}
    >
      {children}
    </MyRecipesContext.Provider>
  );
}

export function useMyRecipes() {
  return useContext(MyRecipesContext);
}