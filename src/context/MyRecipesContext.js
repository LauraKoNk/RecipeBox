import { createContext, useContext, useState } from 'react';

const MyRecipesContext = createContext();

export function MyRecipesProvider({ children }) {
  const [myRecipes, setMyRecipes] = useState([]);

  return (
    <MyRecipesContext.Provider
      value={{
        myRecipes,
        setMyRecipes,
      }}
    >
      {children}
    </MyRecipesContext.Provider>
  );
}

export function useMyRecipes() {
  return useContext(MyRecipesContext);
}