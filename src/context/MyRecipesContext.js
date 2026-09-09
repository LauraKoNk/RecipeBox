import { createContext, useContext, useState } from 'react';

const MyRecipesContext = createContext();

export function MyRecipesProvider({ children }) {
  const [myRecipes, setMyRecipes] = useState([]);

  function addRecipe(recipe) {
    const newRecipe = {
      ...recipe,
      id: Date.now(),
    };

    setMyRecipes([...myRecipes, newRecipe]);
  }

  return (
    <MyRecipesContext.Provider
      value={{
        myRecipes,
        addRecipe,
      }}
    >
      {children}
    </MyRecipesContext.Provider>
  );
}

export function useMyRecipes() {
  return useContext(MyRecipesContext);
}