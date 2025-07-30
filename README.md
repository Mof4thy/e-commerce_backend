# 🛒 Ecommerce Backend API

A full-featured RESTful API for an ecommerce platform built with Node.js, Express, and MongoDB. This backend provides comprehensive functionality for user authentication, product management, shopping cart, and wishlist features.

## 🚀 Features

- **User Authentication** - Register, login, profile management with JWT
- **Product Management** - Browse, search, filter products by category/brand/price
- **Shopping Cart** - Add, update, remove items with quantity management
- **Wishlist** - Save favorite products for later
- **Advanced Filtering** - Search, sort, and filter products
- **Category System** - Organized product categories (fruits, dairy, meat, etc.)

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcryptjs for hashing
- **Environment:** dotenv for configuration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   ```

4. **Seed the database with sample products**
   ```bash
   node scripts/seedProducts.js
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

The server will start on `http://localhost:3000`
