# API Endpoints

Base URL: `http://localhost:3000/api`

## Auth
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/register` | Registrar usuario |
| GET | `/auth/profile` | Obtener perfil (🔒) |

## Users
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/users` | Listar usuarios |
| GET | `/users/:id` | Obtener usuario |
| POST | `/users` | Crear usuario |
| PATCH | `/users/:id` | Actualizar usuario |
| DELETE | `/users/:id` | Eliminar usuario |

## Products
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/products` | Listar productos |
| GET | `/products/:id` | Obtener producto |
| POST | `/products` | Crear producto |
| PATCH | `/products/:id` | Actualizar producto |
| DELETE | `/products/:id` | Eliminar producto |

## Product Types
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/product-types` | Listar tipos |
| GET | `/product-types/:id` | Obtener tipo |
| POST | `/product-types` | Crear tipo |
| PATCH | `/product-types/:id` | Actualizar tipo |
| DELETE | `/product-types/:id` | Eliminar tipo |

## Discounts
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/discounts` | Listar descuentos |
| GET | `/discounts/:id` | Obtener descuento |
| POST | `/discounts` | Crear descuento |
| PATCH | `/discounts/:id` | Actualizar descuento |
| DELETE | `/discounts/:id` | Eliminar descuento |

## Combos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/combos` | Listar combos |
| GET | `/combos/:id` | Obtener combo |
| POST | `/combos` | Crear combo |
| PATCH | `/combos/:id` | Actualizar combo |
| DELETE | `/combos/:id` | Eliminar combo |

---
🔒 = Requiere token JWT en header `Authorization: Bearer <token>`
