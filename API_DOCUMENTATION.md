# 🛒 Grocery Ecommerce API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
- **Type**: Bearer Token (JWT)
- **Header**: `Authorization: Bearer <token>`

---

## 🔐 Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "Ahmed Mohamed",
  "email": "ahmed@example.com",
  "password": "password123",
  "phone": "+201234567890",
  "address": {
    "street": "123 Tahrir Square",
    "city": "Cairo",
    "state": "Cairo Governorate",
    "zipCode": "11511",
    "country": "Egypt"
  }
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a5b2c8f123456789abcdef",
    "name": "Ahmed Mohamed",
    "email": "ahmed@example.com",
    "isAdmin": false,
    "phone": "+201234567890",
    "address": {
      "street": "123 Tahrir Square",
      "city": "Cairo",
      "state": "Cairo Governorate",
      "zipCode": "11511",
      "country": "Egypt"
    }
  }
}
```

### 2. Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a5b2c8f123456789abcdef",
    "name": "Ahmed Mohamed",
    "email": "ahmed@example.com",
    "isAdmin": false,
    "phone": "+201234567890",
    "address": {
      "street": "123 Tahrir Square",
      "city": "Cairo",
      "state": "Cairo Governorate",
      "zipCode": "11511",
      "country": "Egypt"
    }
  }
}
```

### 3. Get User Profile
**GET** `/auth/profile`
**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "user": {
    "id": "64a5b2c8f123456789abcdef",
    "name": "Ahmed Mohamed",
    "email": "ahmed@example.com",
    "isAdmin": false,
    "phone": "+201234567890",
    "address": {
      "street": "123 Tahrir Square",
      "city": "Cairo",
      "state": "Cairo Governorate",
      "zipCode": "11511",
      "country": "Egypt"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Update User Profile
**PUT** `/auth/profile`
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Ahmed Ali",
  "phone": "+201987654321",
  "address": {
    "street": "456 New Cairo",
    "city": "New Cairo",
    "state": "Cairo Governorate",
    "zipCode": "11835",
    "country": "Egypt"
  },
  "currentPassword": "password123",
  "newPassword": "newpassword456"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "64a5b2c8f123456789abcdef",
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "isAdmin": false,
    "phone": "+201987654321",
    "address": {
      "street": "456 New Cairo",
      "city": "New Cairo",
      "state": "Cairo Governorate",
      "zipCode": "11835",
      "country": "Egypt"
    },
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

---

## 🛍️ Product Endpoints

### 1. Get All Products
**GET** `/products`

**Query Parameters:**
- `category` (string): Filter by category
- `brand` (string): Filter by brand
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `search` (string): Search term
- `sortBy` (string): Sort field (default: createdAt)
- `sortOrder` (string): asc/desc (default: desc)
- `inStock` (boolean): Filter by stock status

**Example Request:**
```
GET /api/products?category=dairy&minPrice=10&maxPrice=50&sortBy=price&sortOrder=asc
```

**Response (200):**
```json
{
  "products": [
    {
      "_id": "64a5b2c8f123456789abcdef",
      "name": "Almarai Fresh Milk - 2L",
      "description": "Fresh full-fat milk from Almarai farms. Rich, creamy, and perfect for drinking or cooking.",
      "price": 18.00,
      "discountedPrice": 18.00,
      "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150",
      "images": [
        "https://images.unsplash.com/photo-1550583724-b2692b85b150",
        "https://images.unsplash.com/photo-1563636619-e9143da7973b"
      ],
      "category": "dairy",
      "brand": "Almarai",
      "rating": 4.8,
      "reviews": 1245,
      "inStock": true,
      "quantity": 200,
      "sku": "ALM-MILK-2L",
      "tags": ["milk", "dairy", "fresh", "almarai", "full-fat"],
      "discount": 0,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    },
    {
      "_id": "64a5b2c8f123456789abcde2",
      "name": "Egyptian Feta Cheese - 500g",
      "description": "Traditional Egyptian white cheese (feta), made from fresh milk. Perfect for breakfast, salads, and mezze.",
      "price": 35.00,
      "discountedPrice": 35.00,
      "category": "dairy",
      "brand": "Dairy Fresh",
      "rating": 4.4,
      "reviews": 234,
      "inStock": true,
      "quantity": 90
    }
  ],
  "totalProducts": 2,
  "filters": {
    "category": "dairy",
    "minPrice": "10",
    "maxPrice": "50"
  }
}
```

### 2. Get Product by ID
**GET** `/products/:id`

**Response (200):**
```json
{
  "product": {
    "_id": "64a5b2c8f123456789abcdef",
    "name": "Almarai Fresh Milk - 2L",
    "description": "Fresh full-fat milk from Almarai farms. Rich, creamy, and perfect for drinking or cooking.",
    "price": 18.00,
    "discountedPrice": 18.00,
    "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    "images": [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150",
      "https://images.unsplash.com/photo-1563636619-e9143da7973b"
    ],
    "category": "dairy",
    "brand": "Almarai",
    "rating": 4.8,
    "reviews": 1245,
    "inStock": true,
    "quantity": 200,
    "sku": "ALM-MILK-2L",
    "tags": ["milk", "dairy", "fresh", "almarai", "full-fat"],
    "discount": 0,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

### 3. Get Products by Category
**GET** `/products/category/:category`

**Example:** `/products/category/dairy`

**Query Parameters:**
- `sortBy` (string): Sort field (default: createdAt)
- `sortOrder` (string): asc/desc (default: desc)

**Response (200):**
```json
{
  "products": [
    {
      "_id": "64a5b2c8f123456789abcdef",
      "name": "Almarai Fresh Milk - 2L",
      "price": 18.00,
      "category": "dairy",
      "brand": "Almarai",
      "rating": 4.8,
      "inStock": true
    },
    {
      "_id": "64a5b2c8f123456789abcde2",
      "name": "Egyptian Feta Cheese - 500g",
      "price": 35.00,
      "category": "dairy",
      "brand": "Dairy Fresh",
      "rating": 4.4,
      "inStock": true
    }
  ],
  "category": "dairy",
  "totalProducts": 2
}
```

### 4. Get All Categories
**GET** `/products/categories`

**Response (200):**
```json
{
  "categories": [
    "bakery",
    "beverages",
    "cleaning",
    "dairy",
    "fruits",
    "grains",
    "meat",
    "oils",
    "personal-care",
    "vegetables"
  ]
}
```

### 5. Get All Brands
**GET** `/products/brands`

**Response (200):**
```json
{
  "brands": [
    "Almarai",
    "Dairy Fresh",
    "Dove",
    "Egypt Mills",
    "Fairy",
    "Farm Fresh",
    "Fresh Bakery",
    "Fresh Market",
    "Fresh Poultry",
    "Garden Fresh",
    "Golden Drop",
    "Lipton",
    "Local Farms",
    "Persil",
    "Valley Fresh"
  ]
}
```

### 6. Get Featured Products
**GET** `/products/featured`

**Query Parameters:**
- `limit` (number): Number of products (default: 8)

**Response (200):**
```json
{
  "products": [
    {
      "_id": "64a5b2c8f123456789abcdef",
      "name": "Almarai Fresh Milk - 2L",
      "price": 18.00,
      "rating": 4.8,
      "reviews": 1245,
      "inStock": true
    },
    {
      "_id": "64a5b2c8f123456789abcde2",
      "name": "Fresh Chicken Breast - 1kg",
      "price": 75.00,
      "rating": 4.6,
      "reviews": 423,
      "inStock": true
    }
  ]
}
```

### 7. Search Products
**GET** `/products/search/:query`

**Example:** `/products/search/milk`

**Query Parameters:**
- `sortBy` (string): Sort field (default: createdAt)
- `sortOrder` (string): asc/desc (default: desc)

**Response (200):**
```json
{
  "products": [
    {
      "_id": "64a5b2c8f123456789abcdef",
      "name": "Almarai Fresh Milk - 2L",
      "price": 18.00,
      "category": "dairy",
      "brand": "Almarai",
      "rating": 4.8,
      "inStock": true
    }
  ],
  "searchQuery": "milk",
  "totalProducts": 1
}
```

---

## 🛒 Cart Endpoints
**All cart endpoints require authentication**

### 1. Get User Cart
**GET** `/cart`
**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "cart": {
    "id": "64a5b2c8f123456789abcdef",
    "items": [
      {
        "_id": "64a5b2c8f123456789abcde1",
        "product": {
          "_id": "64a5b2c8f123456789abcdef",
          "name": "Almarai Fresh Milk - 2L",
          "price": 18.00,
          "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150",
          "brand": "Almarai",
          "inStock": true,
          "quantity": 200,
          "discount": 0
        },
        "quantity": 2,
        "price": 18.00
      }
    ],
    "totalItems": 2,
    "totalAmount": 36.00,
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

### 2. Add Item to Cart
**POST** `/cart/add`
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "productId": "64a5b2c8f123456789abcdef",
  "quantity": 2
}
```

**Response (200):**
```json
{
  "message": "Item added to cart successfully",
  "cart": {
    "id": "64a5b2c8f123456789abcdef",
    "items": [
      {
        "_id": "64a5b2c8f123456789abcde1",
        "product": {
          "_id": "64a5b2c8f123456789abcdef",
          "name": "Almarai Fresh Milk - 2L",
          "price": 18.00,
          "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150",
          "brand": "Almarai",
          "inStock": true,
          "quantity": 200,
          "discount": 0
        },
        "quantity": 2,
        "price": 18.00
      }
    ],
    "totalItems": 2,
    "totalAmount": 36.00,
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

### 3. Update Cart Item
**PUT** `/cart/update`
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "productId": "64a5b2c8f123456789abcdef",
  "quantity": 3
}
```

**Response (200):**
```json
{
  "message": "Cart updated successfully",
  "cart": {
    "id": "64a5b2c8f123456789abcdef",
    "items": [
      {
        "_id": "64a5b2c8f123456789abcde1",
        "product": {
          "_id": "64a5b2c8f123456789abcdef",
          "name": "Almarai Fresh Milk - 2L",
          "price": 18.00
        },
        "quantity": 3,
        "price": 18.00
      }
    ],
    "totalItems": 3,
    "totalAmount": 54.00,
    "updatedAt": "2024-01-15T11:35:00.000Z"
  }
}
```

### 4. Remove Item from Cart
**DELETE** `/cart/remove/:productId`
**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Item removed from cart successfully",
  "cart": {
    "id": "64a5b2c8f123456789abcdef",
    "items": [],
    "totalItems": 0,
    "totalAmount": 0.00,
    "updatedAt": "2024-01-15T11:40:00.000Z"
  }
}
```

### 5. Clear Cart
**DELETE** `/cart/clear`
**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Cart cleared successfully",
  "cart": {
    "id": "64a5b2c8f123456789abcdef",
    "items": [],
    "totalItems": 0,
    "totalAmount": 0.00,
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

---

## 💖 Wishlist Endpoints
**All wishlist endpoints require authentication**

### 1. Get User Wishlist
**GET** `/wishlist`
**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "wishlist": {
    "id": "64a5b2c8f123456789abcdef",
    "products": [
      {
        "_id": "64a5b2c8f123456789abcdef",
        "name": "Almarai Fresh Milk - 2L",
        "price": 18.00,
        "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150",
        "brand": "Almarai",
        "rating": 4.8,
        "reviews": 1245,
        "inStock": true,
        "quantity": 200,
        "discount": 0
      }
    ],
    "totalItems": 1,
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

### 2. Add Item to Wishlist
**POST** `/wishlist/add`
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "productId": "64a5b2c8f123456789abcdef"
}
```

**Response (200):**
```json
{
  "message": "Product added to wishlist successfully",
  "wishlist": {
    "id": "64a5b2c8f123456789abcdef",
    "products": [
      {
        "_id": "64a5b2c8f123456789abcdef",
        "name": "Almarai Fresh Milk - 2L",
        "price": 18.00,
        "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150",
        "brand": "Almarai",
        "rating": 4.8,
        "reviews": 1245,
        "inStock": true,
        "quantity": 200,
        "discount": 0
      }
    ],
    "totalItems": 1,
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

### 3. Remove Item from Wishlist
**DELETE** `/wishlist/remove/:productId`
**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Product removed from wishlist successfully",
  "wishlist": {
    "id": "64a5b2c8f123456789abcdef",
    "products": [],
    "totalItems": 0,
    "updatedAt": "2024-01-15T12:05:00.000Z"
  }
}
```

### 4. Clear Wishlist
**DELETE** `/wishlist/clear`
**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Wishlist cleared successfully",
  "wishlist": {
    "id": "64a5b2c8f123456789abcdef",
    "products": [],
    "totalItems": 0,
    "updatedAt": "2024-01-15T12:10:00.000Z"
  }
}
```

### 5. Check if Product is in Wishlist
**GET** `/wishlist/check/:productId`
**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "isInWishlist": true,
  "productId": "64a5b2c8f123456789abcdef"
}
```

---

## ❌ Error Responses

### Authentication Errors
```json
// 401 Unauthorized
{
  "message": "No token, authorization denied"
}

// 401 Invalid Token
{
  "message": "Token is not valid"
}

// 403 Admin Required
{
  "message": "Admin access required"
}
```

### Validation Errors
```json
// 400 Bad Request
{
  "message": "Validation error",
  "errors": [
    "Name is required",
    "Email is required",
    "Password must be at least 6 characters long"
  ]
}
```

### Not Found Errors
```json
// 404 Not Found
{
  "message": "Product not found"
}

// 404 Cart Not Found
{
  "message": "Cart not found"
}

// 404 User Not Found
{
  "message": "User not found"
}
```

### Business Logic Errors
```json
// 400 Out of Stock
{
  "message": "Product is out of stock"
}

// 400 Insufficient Stock
{
  "message": "Only 5 items available in stock"
}

// 400 Already in Wishlist
{
  "message": "Product is already in your wishlist"
}
```

---

## 🧪 Testing Examples

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Mohamed",
    "email": "ahmed@example.com",
    "password": "password123"
  }'
```

**Get All Products:**
```bash
curl -X GET "http://localhost:5000/api/products"
```

**Get Products by Category:**
```bash
curl -X GET "http://localhost:5000/api/products/category/dairy"
```

**Search Products:**
```bash
curl -X GET "http://localhost:5000/api/products/search/milk"
```

**Add to Cart:**
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": "PRODUCT_ID",
    "quantity": 2
  }'
```

### Using JavaScript/Fetch

**Login and Get Token:**
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'ahmed@example.com',
    password: 'password123'
  })
});

const data = await response.json();
const token = data.token;
```

**Get All Products:**
```javascript
const productsResponse = await fetch('http://localhost:5000/api/products');
const productsData = await productsResponse.json();
console.log(`Total products: ${productsData.totalProducts}`);
console.log(productsData.products);
```

**Get Products by Category:**
```javascript
const dairyResponse = await fetch('http://localhost:5000/api/products/category/dairy');
const dairyData = await dairyResponse.json();
console.log(`Dairy products: ${dairyData.totalProducts}`);
```

**Search Products:**
```javascript
const searchResponse = await fetch('http://localhost:5000/api/products/search/milk');
const searchData = await searchResponse.json();
console.log(`Found ${searchData.totalProducts} products matching "milk"`);
```

**Get Cart with Authentication:**
```javascript
const cartResponse = await fetch('http://localhost:5000/api/cart', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const cart = await cartResponse.json();
```

---

## 📝 Notes

1. **JWT Token Expiry**: Tokens expire after 30 days
2. **Password Security**: Passwords are hashed using bcrypt with 12 salt rounds
3. **Cart Persistence**: Carts are automatically created for authenticated users
4. **Price Calculation**: Discounted prices are calculated automatically
5. **Stock Management**: Stock levels are validated when adding to cart
6. **Search**: Search works across product name, description, brand, and tags
7. **No Pagination**: All product endpoints return complete results without pagination
8. **Sorting**: Products can be sorted by price, rating, name, or creation date
9. **Filtering**: Products can be filtered by category, brand, price range, and stock status

---

## 🚀 Quick Start Testing Workflow

1. **Register a user** → Get JWT token
2. **Browse all products** → `GET /api/products`
3. **Filter by category** → `GET /api/products/category/dairy`
4. **Search products** → `GET /api/products/search/milk`
5. **Add products to cart** → Test cart functionality
6. **Add products to wishlist** → Test wishlist functionality
7. **Update quantities** → Test cart updates

## 🏪 Grocery Store Categories Available

- 🍌 **fruits** - Fresh fruits like bananas
- 🥕 **vegetables** - Fresh vegetables like tomatoes, onions, cucumbers
- 🥛 **dairy** - Milk, cheese, yogurt products
- 🍗 **meat** - Fresh chicken and meat products
- 🌾 **grains** - Rice, wheat, and grain products
- 🛢️ **oils** - Cooking oils and fats
- 🍞 **bakery** - Fresh bread and baked goods
- 🧼 **personal-care** - Soaps, shampoos, hygiene products
- 🧽 **cleaning** - Household cleaning products
- 🍵 **beverages** - Tea, coffee, juices, and drinks

This API is ready for integration with any frontend grocery store application like Carrefour or Lulu! All endpoints return complete data without pagination for simpler frontend development. 