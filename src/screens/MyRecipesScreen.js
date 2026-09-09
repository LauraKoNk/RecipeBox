import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import RecipeCard from '../components/RecipeCard';
import { useMyRecipes } from '../context/MyRecipesContext';

export default function MyRecipesScreen({ navigation }) {
  const { myRecipes } = useMyRecipes();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('RecipeForm')}
      >
        <Text style={styles.addButtonText}>
          Ajouter une recette
        </Text>
      </Pressable>

      {myRecipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Aucune recette créée
          </Text>
        </View>
      ) : (
        <FlatList
          data={myRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() => {
                navigation.navigate('RecipeDetails', {
                  recipe: item,
                });
              }}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },

  addButton: {
    backgroundColor: '#f573ad',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },

  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});