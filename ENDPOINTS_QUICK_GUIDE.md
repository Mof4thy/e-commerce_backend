# 🚀 API Endpoints Quick Reference

**Base URL:** `http://localhost:5000/api`

---

## 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | Login user | ❌ |
| `GET` | `/auth/profile` | Get user profile | ✅ |
| `PUT` | `/auth/profile` | Update user profile | ✅ |

**Register/Login Body:**
```json
{
  "name": "Ahmed Mohamed",
  "email": "ahmed@example.com", 
  "password": "password123"
}
```

---

## 🛍️ Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/products` | Get all products | ❌ |
| `GET` | `/products/:id` | Get product by ID | ❌ |
| `GET` | `/products/category/:category` | Get products by category | ❌ |
| `GET` | `/products/categories` | Get all categories | ❌ |
| `GET` | `/products/brands` | Get all brands | ❌ |
| `GET` | `/products/featured` | Get featured products | ❌ |
| `GET` | `/products/search/:query` | Search products | ❌ |

**Query Parameters:**
- `category` - Filter by category
- `brand` - Filter by brand  
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `search` - Search term
- `sortBy` - Sort field (price, rating, name, createdAt)
- `sortOrder` - asc/desc
- `inStock` - true/false

**Examples:**
```bash
GET /products?category=dairy&sortBy=price&sortOrder=asc
GET /products/category/fruits
GET /products/search/milk
```

---

## 🛒 Cart (Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cart` | Get user cart |
| `POST` | `/cart/add` | Add item to cart |
| `PUT` | `/cart/update` | Update cart item |
| `DELETE` | `/cart/remove/:productId` | Remove item from cart |
| `DELETE` | `/cart/clear` | Clear entire cart |

**Add/Update Cart Body:**
```json
{
  "productId": "64a5b2c8f123456789abcdef",
  "quantity": 2
}
```

---

## 💖 Wishlist (Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/wishlist` | Get user wishlist |
| `POST` | `/wishlist/add` | Add item to wishlist |
| `DELETE` | `/wishlist/remove/:productId` | Remove item from wishlist |
| `DELETE` | `/wishlist/clear` | Clear entire wishlist |
| `GET` | `/wishlist/check/:productId` | Check if item in wishlist |

**Add to Wishlist Body:**
```json
{
  "productId": "64a5b2c8f123456789abcdef"
}
```

---

## 🏪 Available Categories

- `fruits` - Fresh fruits
- `vegetables` - Fresh vegetables  
- `dairy` - Milk, cheese, yogurt
- `meat` - Fresh chicken, meat
- `grains` - Rice, wheat products
- `oils` - Cooking oils
- `bakery` - Fresh bread
- `personal-care` - Soaps, hygiene
- `cleaning` - Household products
- `beverages` - Tea, drinks

---

## 🔑 Authentication Headers

For protected routes, include JWT token:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📱 Quick Test Commands

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"123456"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

**Get All Products:**
```bash
curl http://localhost:5000/api/products
```

**Get Dairy Products:**
```bash
curl http://localhost:5000/api/products/category/dairy
```

**Search Products:**
```bash
curl http://localhost:5000/api/products/search/milk
```

**Add to Cart (with token):**
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"productId":"PRODUCT_ID","quantity":2}'
```

---

## ⚡ Response Format

**Success Response:**
```json
{
  "message": "Success message",
  "data": {...}
}
```

**Error Response:**
```json
{
  "message": "Error message"
}
```

**Products Response:**
```json
{
  "products": [...],
  "totalProducts": 15,
  "filters": {...}
}
```

**Cart Response:**
```json
{
  "cart": {
    "items": [...],
    "totalItems": 3,
    "totalAmount": 54.00
  }
}
```

---

## 🎯 Common Status Codes

- `200` - Success
- `201` - Created (register)
- `400` - Bad request / Validation error
- `401` - Unauthorized (no/invalid token)
- `403` - Forbidden (admin required)
- `404` - Not found
- `500` - Server error

---

## 🚦 Quick Workflow

1. **Register** → Get token
2. **Browse products** → `GET /products`
3. **Filter by category** → `GET /products/category/dairy`
4. **Add to cart** → `POST /cart/add`
5. **View cart** → `GET /cart`
6. **Add to wishlist** → `POST /wishlist/add`

**Server running on:** `http://localhost:5000` 