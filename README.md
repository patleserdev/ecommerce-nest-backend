# ecommerce-nest-backcend
Développement d'une solution backend de gestion de site e-commerce avec Nest JS

## Routes API fonctionnelles

### 🔐 POST `/users/register`

Permet l'enregistrement d'un nouvel utilisateur.
req{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",       // Exemple : "customer" ou "admin"
  "profile": "string"     // URL de l'image ou texte, optionnel
}
res{

}

### 🔐 POST `/users/login`

Permet la connexion d'un utilisateur.
req{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",       // Exemple : "customer" ou "admin"
  "profile": "string"     // URL de l'image ou texte, optionnel
}
res{
    "access_token": "string",
}

 {/users/login, POST} route +1ms
 {/users/profile, GET} route +1ms
 {/users/profile, PATCH} route +1ms
 {/users/profile, DELETE} route +1ms
[Nest] 16644  - 15/05/2025 17:45:20     LOG [RoutesResolver] ProductsController {/products}: +0ms
 {/products, POST} route +1ms
 {/products, GET} route +1ms
 {/products/:id, GET} route +1ms
 {/products/:id, PATCH} route +1ms
 {/products/:id, DELETE} route +1ms
 {/products/categories, POST} route +1ms
 {/products/categories, GET} route +0ms
 {/products/categories/:id, GET} route +1ms
 {/products/categories/:id, PATCH} route +0ms
 {/products/categories/:id, DELETE} route +1ms
[Nest] 16644  - 15/05/2025 17:45:20     LOG [RoutesResolver] CategoriesController {/categories}: +0ms
 {/categories, POST} route +1ms
 {/categories, GET} route +1ms
 {/categories/:id, GET} route +0ms
 {/categories/:id, PATCH} route +1ms
 {/categories/:id, DELETE} route +1ms
[Nest] 16644  - 15/05/2025 17:45:20     LOG [RoutesResolver] OrdersController {/orders}: +0ms
 {/orders, POST} route +1ms
 {/orders, GET} route +0ms
 {/orders/:id, GET} route +1ms
 {/orders/:id/status, PATCH} route +1ms
 {/orders/:id, DELETE} route +0ms
[Nest] 16644  - 15/05/2025 17:45:20     LOG [RoutesResolver] PaymentsController {/payments}: +1ms
 {/payments/create-payment-intent/:orderId, POST} route +0ms
 {/payments/webhook, POST} route +1ms
[Nest] 16644  - 15/05/2025 17:45:20     LOG [RoutesResolver] InvoicesController {/invoices}: +0ms
 {/invoices/:orderId, GET} route +1ms
[Nest] 16644  - 15/05/2025 17:45:20     LOG [RoutesResolver] PaymentsController {/payments}: +0ms
 {/payments/create-payment-intent/:orderId, POST} route +1ms
 {/payments/webhook, POST} route +1ms
[Nest] 16644  - 15/05/2025 17:45:20     LOG [RoutesResolver] InvoicesController {/invoices}: +0ms
 {/invoices/:orderId, GET} route +1ms
[Nest] 16644  - 15/05/2025 17:45:20     LOG [RoutesResolver] CartController {/cart}: +0ms
 {/cart/add, POST} route +1ms
 {/cart/update/:itemId, PATCH} route +0ms
 {/cart/remove/:itemId, DELETE} route +1ms
 {/cart/summary, GET} route +0ms
 {/cart/checkout, POST} route +1ms
