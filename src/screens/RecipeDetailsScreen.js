import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useFavorites } from '../context/FavoritesContext';

export default function RecipeDetailsScreen({ route }) {
  const { recipe } = route.params;

  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  const favorite = isFavorite(recipe.id);

  function handleFavorite() {
    if (favorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {recipe.name}
        </Text>

        <Text style={styles.info}>
          {recipe.cuisine} • {recipe.difficulty}
        </Text>

        <Text style={styles.info}>
          ⭐ {recipe.rating}
        </Text>

        <Pressable
          style={styles.favoriteButton}
          onPress={handleFavorite}
        >
          <Text style={styles.favoriteButtonText}>
            {favorite
              ? 'Retirer des favoris'
              : 'Ajouter aux favoris'}
          </Text>
        </Pressable>

        <Text style={styles.sectionTitle}>
          Ingrédients
        </Text>

        {recipe.ingredients.map((ingredient, index) => (
          <Text
            key={index}
            style={styles.text}
          >
            • {ingredient}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>
          Instructions
        </Text>

        {recipe.instructions.map((instruction, index) => (
          <Text
            key={index}
            style={styles.text}
          >
            {index + 1}. {instruction}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  image: {
    width: '100%',
    height: 250,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  info: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 5,
  },

  favoriteButton: {
    backgroundColor: '#f573ad',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },

  favoriteButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
});