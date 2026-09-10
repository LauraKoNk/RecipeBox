import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useMyRecipes } from '../context/MyRecipesContext';
import { useFavorites } from '../context/FavoritesContext';

export default function RecipeFormScreen({ navigation, route }) {
  const {
    addRecipe,
    updateRecipe,
  } = useMyRecipes();

  const {
    isFavorite,
    updateFavorite,
  } = useFavorites();

  const recipeToEdit = route.params
    ? route.params.recipe
    : null;

  const [name, setName] = useState(
    recipeToEdit ? recipeToEdit.name : ''
  );

  const [cuisine, setCuisine] = useState(
    recipeToEdit ? recipeToEdit.cuisine : ''
  );

  const [difficulty, setDifficulty] = useState(
    recipeToEdit ? recipeToEdit.difficulty : ''
  );

  const [ingredients, setIngredients] = useState(
    recipeToEdit
      ? recipeToEdit.ingredients.join(', ')
      : ''
  );

  const [instructions, setInstructions] = useState(
    recipeToEdit
      ? recipeToEdit.instructions.join(' ')
      : ''
  );

  const [error, setError] = useState('');

  function handleSubmit() {
    if (
      name.trim() === '' ||
      cuisine.trim() === '' ||
      difficulty === '' ||
      ingredients.trim() === '' ||
      instructions.trim() === ''
    ) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    const recipe = {
      name: name,
      cuisine: cuisine,
      difficulty: difficulty,
      ingredients: ingredients.split(','),
      instructions: [instructions],
      rating: 0,
      image: '',
    };

    if (recipeToEdit) {
      const updatedRecipe = {
        ...recipe,
        id: recipeToEdit.id,
        isPersonal: true,
      };

      updateRecipe(updatedRecipe);

      if (isFavorite(updatedRecipe.id)) {
        updateFavorite(updatedRecipe);
      }
    } else {
      addRecipe(recipe);
    }

    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nom</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex : Pâtes carbonara"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Cuisine</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex : Italienne"
        value={cuisine}
        onChangeText={setCuisine}
      />

      <Text style={styles.label}>Difficulté</Text>

      <View style={styles.difficultyContainer}>
        <Pressable
          style={[
            styles.difficultyButton,
            difficulty === 'Easy' && styles.difficultyButtonActive,
          ]}
          onPress={() => setDifficulty('Easy')}
        >
          <Text
            style={[
              styles.difficultyText,
              difficulty === 'Easy' && styles.difficultyTextActive,
            ]}
          >
            Easy
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.difficultyButton,
            difficulty === 'Medium' && styles.difficultyButtonActive,
          ]}
          onPress={() => setDifficulty('Medium')}
        >
          <Text
            style={[
              styles.difficultyText,
              difficulty === 'Medium' && styles.difficultyTextActive,
            ]}
          >
            Medium
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.difficultyButton,
            difficulty === 'Hard' && styles.difficultyButtonActive,
          ]}
          onPress={() => setDifficulty('Hard')}
        >
          <Text
            style={[
              styles.difficultyText,
              difficulty === 'Hard' && styles.difficultyTextActive,
            ]}
          >
            Hard
          </Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Ingrédients</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex : pâtes, oeufs, parmesan"
        value={ingredients}
        onChangeText={setIngredients}
      />

      <Text style={styles.label}>Instructions</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Décrivez les étapes..."
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      {error !== '' && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      <Pressable
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {recipeToEdit
            ? 'Modifier la recette'
            : 'Ajouter la recette'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },

  difficultyContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  difficultyButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },

  difficultyButtonActive: {
    backgroundColor: '#f573ad',
    borderColor: '#f573ad',
  },

  difficultyText: {
    color: '#333333',
  },

  difficultyTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  error: {
    color: 'red',
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#f573ad',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});