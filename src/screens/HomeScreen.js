import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../services/recipeApi';

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadRecipes() {
    try {
      setLoading(true);
      setError('');

      const data = await getRecipes();

      setRecipes(data);
    } catch (err) {
      setError('Impossible de charger les recettes.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDifficulty =
      difficulty === 'All' || recipe.difficulty === difficulty;

    return matchesSearch && matchesDifficulty;
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Chargement des recettes...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Une erreur est survenue
        </Text>

        <Text style={styles.errorText}>
          {error}
        </Text>

        <Pressable
          style={styles.retryButton}
          onPress={loadRecipes}
        >
          <Text style={styles.retryButtonText}>
            Réessayer
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.favoritesButton}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.buttonText}>
          Voir mes favoris
        </Text>
      </Pressable>

      <Pressable
        style={styles.myRecipesButton}
        onPress={() => navigation.navigate('MyRecipes')}
      >
        <Text style={styles.buttonText}>
          Mes recettes
        </Text>
      </Pressable>

      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher une recette..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filters}>
        <Pressable
          style={[
            styles.filterButton,
            difficulty === 'All' && styles.activeFilterButton,
          ]}
          onPress={() => setDifficulty('All')}
        >
          <Text>Tous</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            difficulty === 'Easy' && styles.activeFilterButton,
          ]}
          onPress={() => setDifficulty('Easy')}
        >
          <Text>Facile</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            difficulty === 'Medium' && styles.activeFilterButton,
          ]}
          onPress={() => setDifficulty('Medium')}
        >
          <Text>Moyen</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            difficulty === 'Hard' && styles.activeFilterButton,
          ]}
          onPress={() => setDifficulty('Hard')}
        >
          <Text>Difficile</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredRecipes}
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
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Aucune recette trouvée.
          </Text>
        }
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

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  favoritesButton: {
    backgroundColor: '#f573ad',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },

  myRecipesButton: {
    backgroundColor: '#f97316',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  searchInput: {
    backgroundColor: '#ffffff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    fontSize: 16,
  },

  filters: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  filterButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
  },

  activeFilterButton: {
    backgroundColor: '#fed7aa',
    borderColor: '#f97316',
  },

  loadingText: {
    marginTop: 12,
    color: '#666666',
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  errorText: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: '#f97316',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },

  retryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#666666',
  },
});