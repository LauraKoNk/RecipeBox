import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import RecipeCard from '../components/RecipeCard';
import { useMyRecipes } from '../context/MyRecipesContext';

export default function MyRecipesScreen() {
  const { myRecipes } = useMyRecipes();

  if (myRecipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Aucune recette créée
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={myRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});