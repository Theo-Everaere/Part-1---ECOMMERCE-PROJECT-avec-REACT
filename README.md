# Part-1---ECOMMERCE-PROJECT-avec-REACT

# Description:

Ce projet implémente le frontend d'une plateforme e-commerce en utilisant React. Il permet aux utilisateurs de s'inscrire, se connecter et gérer des produits dans leur profil. L'application communique avec un backend sécurisé en utilisant JWT pour l'authentification et gère les produits avec les fonctionnalités de création, modification et suppression.

# TODO: Gestion du Pannier de l'utilisateur. -> Part-2

# Fonctionnalités principales :
Gestion des utilisateurs : Inscription, connexion et déconnexion via JWT.
Vérification du token pour les actions sécurisées (gestion des produits).

# Gestion des produits :
Création d'un produit : Les utilisateurs peuvent ajouter de nouveaux produits à leur profil.
Modification d'un produit : Possibilité de modifier les informations du produit (nom, description, prix, etc.).
Suppression d'un produit : Les utilisateurs peuvent supprimer des produits de leur profil.
Affichage des produits : Les utilisateurs peuvent voir la liste des produits qu'ils ont ajoutés.

# Sécurisation des actions :

Chaque action sensible (ajouter, modifier, supprimer) nécessite un token JWT valide.
Le frontend vérifie que l'utilisateur est authentifié avant de lui permettre de modifier ou supprimer un produit.

# Technologies utilisées :

React : pour le développement du frontend.
React Router : pour la gestion de la navigation entre les différentes pages.
Axios : pour les requêtes HTTP vers le backend.
JWT (JSON Web Token) : pour la gestion de l'authentification et des sessions utilisateur.
