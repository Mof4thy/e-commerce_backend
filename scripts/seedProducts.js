const mongoose = require('mongoose');
const Product = require('../models/Product');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_db');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const sampleProducts = [
  {
    name: "Fresh Bananas - 1kg",
    description: "Fresh premium bananas, perfect for breakfast, smoothies, or healthy snacking. Rich in potassium and vitamins.",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
    images: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224"
    ],
    category: "fruits",
    brand: "Fresh Market",
    rating: 4.5,
    reviews: 324,
    inStock: true,
    quantity: 150,
    sku: "FM-BAN-1KG",
    tags: ["fresh", "fruits", "organic", "healthy", "potassium"],
    discount: 10
  },
  {
    name: "Egyptian Basmati Rice - 5kg",
    description: "Premium long-grain basmati rice from Egypt. Perfect for biryani, kabsa, and daily meals.",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e26c",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e26c",
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6"
    ],
    category: "grains",
    brand: "Egypt Mills",
    rating: 4.7,
    reviews: 856,
    inStock: true,
    quantity: 75,
    sku: "EM-BAS-5KG",
    tags: ["rice", "basmati", "grains", "egyptian", "premium"],
    discount: 5
  },
  {
    name: "Almarai Fresh Milk - 2L",
    description: "Fresh full-fat milk from Almarai farms. Rich, creamy, and perfect for drinking or cooking.",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    images: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150",
      "https://images.unsplash.com/photo-1563636619-e9143da7973b"
    ],
    category: "dairy",
    brand: "Almarai",
    rating: 4.8,
    reviews: 1245,
    inStock: true,
    quantity: 200,
    sku: "ALM-MILK-2L",
    tags: ["milk", "dairy", "fresh", "almarai", "full-fat"]
  },
  {
    name: "Sunflower Cooking Oil - 1.8L",
    description: "Pure sunflower cooking oil, ideal for frying, cooking, and baking. Heart-healthy and cholesterol-free.",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
      "https://images.unsplash.com/photo-1582878603063-20a8f6e88ae5"
    ],
    category: "oils",
    brand: "Golden Drop",
    rating: 4.3,
    reviews: 567,
    inStock: true,
    quantity: 120,
    sku: "GD-SUN-1.8L",
    tags: ["oil", "sunflower", "cooking", "healthy", "cholesterol-free"]
  },
  {
    name: "Chicken Breast Fresh - 1kg",
    description: "Fresh premium chicken breast, hormone-free and locally sourced. Perfect for grilling, roasting, or curry.",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
    images: [
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
      "https://images.unsplash.com/photo-1608877907149-a206d75ba011"
    ],
    category: "meat",
    brand: "Fresh Poultry",
    rating: 4.6,
    reviews: 423,
    inStock: true,
    quantity: 80,
    sku: "FP-CHB-1KG",
    tags: ["chicken", "meat", "fresh", "protein", "halal"],
    discount: 15
  },
  {
    name: "Egyptian Feta Cheese - 500g",
    description: "Traditional Egyptian white cheese (feta), made from fresh milk. Perfect for breakfast, salads, and mezze.",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862",
    images: [
      "https://images.unsplash.com/photo-1452195100486-9cc805987862",
      "https://images.unsplash.com/photo-1589881133595-e7b8233664fb"
    ],
    category: "dairy",
    brand: "Dairy Fresh",
    rating: 4.4,
    reviews: 234,
    inStock: true,
    quantity: 90,
    sku: "DF-FETA-500G",
    tags: ["cheese", "feta", "dairy", "egyptian", "traditional"]
  },
  {
    name: "Red Onions - 2kg",
    description: "Fresh red onions, essential for Middle Eastern cooking. Sharp flavor perfect for salads and cooking.",
    price: 20.00,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    images: [
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38"
    ],
    category: "vegetables",
    brand: "Farm Fresh",
    rating: 4.2,
    reviews: 445,
    inStock: true,
    quantity: 180,
    sku: "FF-ONI-2KG",
    tags: ["onions", "vegetables", "fresh", "cooking", "middle-eastern"]
  },
  {
    name: "Dove Soap Bar - 4 Pack",
    description: "Moisturizing beauty bar with 1/4 moisturizing cream. Gentle on skin, suitable for daily use.",
    price: 28.00,
    image: "https://images.unsplash.com/photo-1556228578-dd339ab3a4f3",
    images: [
      "https://images.unsplash.com/photo-1556228578-dd339ab3a4f3",
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f"
    ],
    category: "personal-care",
    brand: "Dove",
    rating: 4.7,
    reviews: 789,
    inStock: true,
    quantity: 150,
    sku: "DOV-SOAP-4PK",
    tags: ["soap", "personal-care", "moisturizing", "gentle", "beauty"],
    discount: 12
  },
  {
    name: "Tomatoes Fresh - 1kg",
    description: "Fresh ripe tomatoes, perfect for salads, cooking, and making fresh tomato sauce. Locally grown.",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1546470427-e013342a4d24",
    images: [
      "https://images.unsplash.com/photo-1546470427-e013342a4d24",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea"
    ],
    category: "vegetables",
    brand: "Local Farms",
    rating: 4.3,
    reviews: 167,
    inStock: true,
    quantity: 200,
    sku: "LF-TOM-1KG",
    tags: ["tomatoes", "vegetables", "fresh", "local", "cooking"]
  },
  {
    name: "Fairy Dishwashing Liquid - 1L",
    description: "Powerful dishwashing liquid that cuts through grease. Gentle on hands, tough on dirt.",
    price: 22.00,
    image: "https://images.unsplash.com/photo-1585338447937-7082f8fc763d",
    images: [
      "https://images.unsplash.com/photo-1585338447937-7082f8fc763d",
      "https://images.unsplash.com/photo-1563453392212-326e0c2f9a16"
    ],
    category: "cleaning",
    brand: "Fairy",
    rating: 4.5,
    reviews: 312,
    inStock: true,
    quantity: 100,
    sku: "FAI-DISH-1L",
    tags: ["dishwashing", "cleaning", "household", "grease-cutting", "gentle"]
  },
  {
    name: "Arabic Bread (Khubz) - 5 pieces",
    description: "Fresh traditional Arabic flatbread, perfect for meals, wraps, and dipping. Baked daily.",
    price: 8.00,
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73",
    images: [
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73",
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df"
    ],
    category: "bakery",
    brand: "Fresh Bakery",
    rating: 4.6,
    reviews: 543,
    inStock: true,
    quantity: 300,
    sku: "FB-KHUBZ-5PC",
    tags: ["bread", "arabic", "fresh", "traditional", "daily-baked"]
  },
  {
    name: "Egyptian Yogurt - 1kg",
    description: "Creamy natural yogurt made from fresh milk. Perfect for breakfast, cooking, or as a healthy snack.",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1571212515416-6b7b0c93c74d",
    images: [
      "https://images.unsplash.com/photo-1571212515416-6b7b0c93c74d",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890"
    ],
    category: "dairy",
    brand: "Valley Fresh",
    rating: 4.4,
    reviews: 687,
    inStock: true,
    quantity: 120,
    sku: "VF-YOG-1KG",
    tags: ["yogurt", "dairy", "natural", "healthy", "probiotic"]
  },
  {
    name: "Cucumber Fresh - 1kg",
    description: "Fresh crisp cucumbers, perfect for salads, sandwiches, and healthy snacking. High water content.",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6",
    images: [
      "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6",
      "https://images.unsplash.com/photo-1604977042946-1eecc30f269e"
    ],
    category: "vegetables",
    brand: "Garden Fresh",
    rating: 4.1,
    reviews: 234,
    inStock: true,
    quantity: 160,
    sku: "GF-CUC-1KG",
    tags: ["cucumber", "vegetables", "fresh", "crisp", "healthy"]
  },
  {
    name: "Persil Laundry Detergent - 2.5kg",
    description: "Powerful laundry detergent that removes tough stains and keeps clothes fresh. Suitable for all fabrics.",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c"
    ],
    category: "cleaning",
    brand: "Persil",
    rating: 4.6,
    reviews: 892,
    inStock: true,
    quantity: 70,
    sku: "PER-DET-2.5KG",
    tags: ["detergent", "laundry", "cleaning", "stain-removal", "fresh"],
    discount: 8
  },
  {
    name: "Green Tea Bags - 100 pieces",
    description: "Premium green tea bags, antioxidant-rich and refreshing. Perfect for daily consumption and health benefits.",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e"
    ],
    category: "beverages",
    brand: "Lipton",
    rating: 4.3,
    reviews: 456,
    inStock: true,
    quantity: 85,
    sku: "LIP-GT-100PC",
    tags: ["tea", "green-tea", "beverages", "antioxidant", "healthy"]
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Created ${createdProducts.length} sample grocery products`);
    
    console.log('Grocery store products seeded successfully!');
    console.log('Categories available: fruits, vegetables, dairy, meat, grains, oils, bakery, personal-care, cleaning, beverages');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase; 