import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function RecipeCard({ recipe, onPress }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      {recipe.image && !imageError ? (
        <Image
          source={{ uri: recipe.image }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>
            {recipe.isPersonal
              ? "Pas d'image"
              : 'Image indisponible'}
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>
          {recipe.name}
        </Text>

        <Text style={styles.info}>
          {recipe.cuisine} • {recipe.difficulty}
        </Text>

        <Text style={styles.rating}>
          ⭐ {recipe.rating}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  image: {
    width: '100%',
    height: 180,
  },

  noImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#dddddd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  noImageText: {
    color: '#666666',
    fontSize: 16,
  },

  content: {
    padding: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  info: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 6,
  },

  rating: {
    fontSize: 14,
  },
});