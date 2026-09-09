import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MyRecipesScreen from '../screens/MyRecipesScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Recettes',
        }}
      />

      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={{
          title: 'Détail de la recette',
        }}
      />

      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Mes favoris',
        }}
      />

      <Stack.Screen
        name="MyRecipes"
        component={MyRecipesScreen}
        options={{
          title: 'Mes recettes',
        }}
      />
    </Stack.Navigator>
  );
}