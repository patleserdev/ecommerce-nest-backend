# 📦 E-commerce API (v1.0)

> API RESTful pour la gestion des utilisateurs, produits, commandes, paiements, panier, etc.  

---

## 🏠 App

### `GET /api`

- **Description** : Description Swagger de l'API

---

### `GET /`

- **Description** : Point d'entrée de l'API

---

## 🩺 Health

### `GET /health`

- **Description** : Vérifie l'état de santé de l'API

---

## 👤 Users

### `POST /users/register`

- **Description** : Inscription utilisateur

### `POST /users/login`

- **Description** : Connexion utilisateur

### `GET /users/profile`

- **Description** : Récupérer la photo de profil

### `PATCH /users/profile`

- **Description** : Modifier le profil utilisateur

### `DELETE /users/profile`

- **Description** : Supprimer un utilisateur

### `POST /users/logout`

- **Description** : Déconnexion

---

## 🛍️ Products

### `POST /products`

- **Description** : Ajouter un produit

### `GET /products`

- **Description** : Récupérer tous les produits

### `GET /products/{id}`

- **Description** : Récupérer un produit par ID

### `PATCH /products/{id}`

- **Description** : Modifier un produit

### `DELETE /products/{id}`

- **Description** : Supprimer un produit

### `GET /products/slug/{slug}`

- **Description** : Récupérer un produit par son slug

### `GET /products/categories/{id}`

- **Description** : Récupérer les produits d'une catégorie

---

## 🧩 Product Variations

### `POST /product-variations`

- **Description** : Ajouter une variation

### `GET /product-variations`

- **Description** : Récupérer toutes les variations

### `GET /product-variations/{id}`

- **Description** : Récupérer une variation par ID

### `PATCH /product-variations/{id}`

- **Description** : Modifier une variation

### `DELETE /product-variations/{id}`

- **Description** : Supprimer une variation

---

## 🏷️ Categories

### `POST /categories`

- **Description** : Ajouter une catégorie

### `GET /categories`

- **Description** : Récupérer toutes les catégories

### `GET /categories/{id}`

- **Description** : Récupérer une catégorie par ID

### `PATCH /categories/{id}`

- **Description** : Modifier une catégorie

### `DELETE /categories/{id}`

- **Description** : Supprimer une catégorie

### `GET /categories/slug/{slug}`

- **Description** : Récupérer une catégorie par slug parent

### `GET /categories/parent/{id}`

- **Description** : Récupérer les sous-catégories

---

## 🛒 Cart

### `POST /cart/add`

- **Description** : Ajouter un article au panier

### `PATCH /cart/update/{itemId}`

- **Description** : Modifier un article du panier

### `DELETE /cart/remove/{itemId}`

- **Description** : Supprimer un article du panier

### `GET /cart/summary`

- **Description** : Récupérer le contenu du panier

### `POST /cart/checkout`

- **Description** : Valider un panier

---

## 🧾 Orders

### `POST /orders`

- **Description** : Créer une commande

### `GET /orders`

- **Description** : Récupérer toutes les commandes

### `GET /orders/{id}`

- **Description** : Récupérer une commande par ID

### `DELETE /orders/{id}`

- **Description** : Supprimer une commande

### `PATCH /orders/{id}/status`

- **Description** : Modifier le statut d'une commande

---

## 💳 Payments

### `POST /payments/create-payment-intent/{orderId}`

- **Description** : Créer un paiement Stripe pour une commande

### `POST /payments/webhook`

- **Description** : Gérer les webhooks Stripe

---

## 📄 Invoices

### `GET /invoices/{orderId}`

- **Description** : Générer la facture d'une commande

---

## 🏭 Brands

### `POST /brands`

- **Description** : Ajouter une marque

### `GET /brands`

- **Description** : Récupérer toutes les marques

### `GET /brands/{id}`

- **Description** : Récupérer une marque par ID

### `PATCH /brands/{id}`

- **Description** : Modifier une marque

### `DELETE /brands/{id}`

- **Description** : Supprimer une marque

---

## 🏡 Addresses

### `POST /addresses`

- **Description** : Ajouter une adresse

### `GET /addresses`

- **Description** : Récupérer toutes les adresses

### `GET /addresses/{id}`

- **Description** : Récupérer une adresse par ID

### `PATCH /addresses/{id}`

- **Description** : Modifier une adresse

### `DELETE /addresses/{id}`

- **Description** : Supprimer une adresse

---

## 🔐 Address Roles

### `POST /address-roles`

- **Description** : Créer un rôle d'adresse

### `GET /address-roles`

- **Description** : Récupérer tous les rôles d'adresse

### `GET /address-roles/{id}`

- **Description** : Récupérer un rôle par ID

### `PATCH /address-roles/{id}`

- **Description** : Modifier un rôle

### `DELETE /address-roles/{id}`

- **Description** : Supprimer un rôle
