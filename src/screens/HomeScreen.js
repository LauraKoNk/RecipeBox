import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getRecipes } from '../services/recipeApi';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Chargement des recettes
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
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.recipeName}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    color: '#bd3d3d',
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

  recipeName: {
    fontSize: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
});