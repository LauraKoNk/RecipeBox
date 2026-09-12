# RecipeBox

RecipeBox est une application mobile de recettes réalisée en React Native avec Expo.

Le but de l'application est de pouvoir consulter des recettes provenant d'une API, les rechercher, les filtrer et afficher leur détail. Aussi il est possible de créer ses propres recettes et de les gérer directement dans l'application.

## Fonctionnalités

L'application permet de :

* consulter des recettes provenant de l'API
* rechercher une recette par son nom
* filtrer les recettes par difficulté
* consulter le détail d'une recette 
* ajouter ou retirer une recette des favoris
* créer, modifier et supprimer une recette personnelle
* conserver les favoris et recettes personnelles après la fermeture de l'application
* continuer à accéder aux données locales hors connexion
* partager une recette (depuis le menu du téléphone)

## Technologies utilisées

Le projet utilise principalement :

* React Native
* Expo
* React Navigation
* Context API
* AsyncStorage
* NetInfo
* l'API DummyJSON Recipes

## Organisation du projet

Voici la structure du projet :

```text
src/
├── components/
├── context/
├── navigation/
├── screens/
└── services/
```

Les appels à l'API sont regroupés dans `services`
Les écrans se trouvent dans `screens` 
La gestion globale des favoris et recettes personnelles se trouve dans `context`

## API

Les recettes principales proviennent de l'API REST DummyJSON Recipes.

## Stockage local

AsyncStorage est utilisé pour enregistrer :

* les favoris
* les recettes personnelles

## Hors connexion

NetInfo permet de détecter si l'utilisateur a accès à Internet.

Sans connexion, les recettes venant de l'API ne sont plus disponibles sur l'accueil, mais les recettes personnelles et les favoris déjà enregistrés restent accessibles.

## Installation

### Prérequis

Avant de lancer le projet, il faut avoir installé :

* Node.js
* npm 
* Expo Go sur un téléphone (ou un émulateur Android/iOS)

### Récupérer le projet

Cloner le dépôt :

```bash
git clone https://github.com/LauraKoNk/RecipeBox.git
```

Ensuite se placer dans le dossier du projet :

```bash
cd RecipeBox
```

### Installer les dépendances

```bash
npm install
```

### Lancer l'application

```bash
npx expo start
```

Une fois Expo lancé, plusieurs possibilités sont disponibles :

* scanner le QR code avec Expo Go sur un téléphone
* lancer l'application sur un émulateur Android
* lancer l'application sur un simulateur iOS

Pour utiliser Expo Go sur un téléphone, le téléphone et l'ordinateur doivent être connectés au même réseau.


Si l'application ne se lance pas correctement, il est possible de relancer Expo en vidant le cache :

```bash
npx expo start -c
```

 
## Recherches utilisées

Pour réaliser le projet, je me suis appuyé de documentations comme :

* Expo : https://docs.expo.dev/get-started/create-a-project/
* React Native (ici le Share mais toute la doc) : https://reactnative.dev/docs/share
* React Navigation : https://reactnavigation.org/docs/getting-started/
* AsyncStorage : https://react-native-async-storage.github.io/2.0/Usage/
* NetInfo : https://docs.expo.dev/versions/latest/sdk/netinfo/
* DummyJSON Recipes : https://dummyjson.com/docs/recipes

## Vidéo

Lien vers la vidéo de démonstration et d'explication du projet :

https://youtu.be/z2Wd5mnzWiE
