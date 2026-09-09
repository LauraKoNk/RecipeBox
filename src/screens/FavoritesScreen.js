import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import RecipeCard from '../components/RecipeCard';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Aucun favori
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
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
    marginBottom: 10,
  },
});