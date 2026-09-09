import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useFavorites } from '../context/FavoritesContext';
import { useMyRecipes } from '../context/MyRecipesContext';

export default function RecipeDetailsScreen({ navigation, route }) {
  const routeRecipe = route.params.recipe;

  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  const {
    myRecipes,
    deleteRecipe,
  } = useMyRecipes();

  let recipe = routeRecipe;

  if (routeRecipe.isPersonal) {
    const currentRecipe = myRecipes.find(
      (item) => item.id === routeRecipe.id
    );

    if (currentRecipe) {
      recipe = currentRecipe;
    }
  }

  const favorite = isFavorite(recipe.id);

  function handleFavorite() {
    if (favorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  }

  function handleEdit() {
    navigation.navigate('RecipeForm', {
      recipe: recipe,
    });
  }

  function handleDelete() {
    Alert.alert(
      'Supprimer la recette',
      'Voulez-vous vraiment supprimer cette recette ?',
      [
        {
          text: 'Annuler',
        },
        {
          text: 'Supprimer',
          onPress: () => {
            if (favorite) {
              removeFavorite(recipe.id);
            }

            deleteRecipe(recipe.id);

            navigation.goBack();
          },
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container}>
      {recipe.image ? (
        <Image
          source={{ uri: recipe.image }}
          style={styles.image}
        />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>
            Pas d'image
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

        <Text style={styles.info}>
          ⭐ {recipe.rating}
        </Text>

        <Pressable
          style={styles.favoriteButton}
          onPress={handleFavorite}
        >
          <Text style={styles.buttonText}>
            {favorite
              ? 'Retirer des favoris'
              : 'Ajouter aux favoris'}
          </Text>
        </Pressable>

        {recipe.isPersonal && (
          <>
            <Pressable
              style={styles.editButton}
              onPress={handleEdit}
            >
              <Text style={styles.buttonText}>
                Modifier la recette
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>
                Supprimer la recette
              </Text>
            </Pressable>
          </>
        )}

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

  noImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#dddddd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  noImageText: {
    color: '#666666',
    fontSize: 16,
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

  editButton: {
    backgroundColor: '#f97316',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },

  buttonText: {
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