import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { MyRecipesProvider } from './src/context/MyRecipesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <MyRecipesProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </MyRecipesProvider>
    </FavoritesProvider>
  );
}