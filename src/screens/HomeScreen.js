import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getRecipes } from '../services/recipeApi';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadRecipes() {
    const data = await getRecipes();

    setRecipes(data);
    setLoading(false);
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Chargement des recettes</Text>
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
  },

  recipeName: {
    fontSize: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
});