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
    name: "Lavida Caramel Sauce Topping - 530 Gm",
    description: "Lavida Caramel Sauce Topping is the ideal choice for enhancing your desserts and beverages with a rich, buttery caramel flavor. This versatile topping is perfect for drizzling over ice creams, pancakes, or cakes, making every treat even more delightful.",
    price: 83,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/76/8079401/1.jpg?6561",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/76/8079401/1.jpg?6561"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 5,
    reviews: 0,
    inStock: true,
    quantity: 6,
    sku: "LA598FF2X9LVONAFAMZ",
    tags: ["caramels", "candy", "chocolate"],
    discount: 0,
    discountedPrice: 83
  },
  {
    name: "Lavida BBQ Sauce - 1kg",
    description: "Lavida BBQ Sauce is a delicious condiment designed to elevate your grilling experience. Made with organic ingredients, this 1kg bottle of BBQ sauce is perfect for enhancing the flavor of appetizers, salads, and hot dishes. With a shelf life of 12 months, you can enjoy this versatile sauce anytime you need a burst of flavor in your meals.",
    price: 83,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/04/875622/1.jpg?6613",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/04/875622/1.jpg?6613"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 4.7,
    reviews: 21,
    inStock: true,
    quantity: 6,
    sku: "LA598FF02WI1YNAFAMZ",
    tags: ["barbecue sauce", "organic ingredients"],
    discount: 0,
    discountedPrice: 83
  },
  {
    name: "Lavida Mayonnaise - 1 Kg",
    description: "Lavida Mayonnaise - 1 Kg is a versatile condiment perfect for enhancing the flavor of your favorite dishes. Its creamy texture makes it an ideal addition to sandwiches, salads, and dips, ensuring every meal is deliciously satisfying.",
    price: 83,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/89/1496501/1.jpg?1043",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/89/1496501/1.jpg?1043"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 3.2,
    reviews: 19,
    inStock: true,
    quantity: 5,
    sku: "LA598FF34M4SYNAFAMZ",
    tags: ["lavida", "barbecue sauce", "beverage"],
    discount: 14,
    discountedPrice: 71.38
  },
  {
    name: "Zain Roastery Chocolate Almonds - 250 Grams",
    description: "Roasted almonds coated in rich chocolate, perfect for snacking.",
    price: 270,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/43/7819031/1.jpg?3824",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/43/7819031/1.jpg?3824"],
    category: "snacks",
    brand: "Zain Roastery",
    rating: 4.6,
    reviews: 870,
    inStock: true,
    quantity: 270,
    sku: "BR546FF2DLQTRNAFAMZ",
    tags: ["beverage", "lemon-lime", "carbonated", "caffeine-free"],
    discount: 0,
    discountedPrice: 270
  },
  {
    name: "Zumra Matcha Green Tea Powder Ceremony - Grade AAAA",
    description: "Enjoy the morning sunshine and start your beautiful day with a cup of delicious, frothy green matcha that will give you energy and vitality throughout the day.",
    price: 755,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/69/6645331/1.jpg?4984",
    images: [
      "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/69/6645331/2.jpg?4984",
      "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/69/6645331/2.jpg?4984",
      "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/69/6645331/3.jpg?4984",
      "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/69/6645331/4.jpg?4984"
    ],
    category: "beverages",
    brand: "Zumra",
    rating: 4.3,
    reviews: 480,
    inStock: true,
    quantity: 9,
    sku: "ZU176DB2T0HZPNAFAMZ",
    tags: ["organic", "tea", "vegan", "non-gmo"],
    discount: 26,
    discountedPrice: 558.7
  },
  {
    name: "Zumra Creamy Coconut Milk 20-22% Fats - 400 ml",
    description: "made from high-quality coconut and water to deliver a thick, velvety texture and deep tropical flavor.creamy coconut milk",
    price: 120,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/18/2575331/1.jpg?8902",
    images: [
      "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/18/2575331/2.jpg?8902",
      "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/18/2575331/3.jpg?8902",
      "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/18/2575331/4.jpg?8902"
    ],
    category: "canned & jarred foods",
    brand: "Zumra",
    rating: 4.8,
    reviews: 2400,
    inStock: true,
    quantity: 7,
    sku: "ZU176FF1YEO3HNAFAMZ",
    tags: ["milk", "coconut", "canned", "jarred"],
    discount: 0,
    discountedPrice: 120
  },
  {
    name: "Best Juice 190ml (20 pieces, Mango)",
    description: "Best Juice 190ml (20 pieces, Mango) is a refreshing beverage made from 100% natural fruits, designed for juice lovers who appreciate unique flavors and natural ingredients.",
    price: 205,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/81/2314331/1.jpg?2923",
    images: [
      "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/81/2314331/2.jpg?2923",
      "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/81/2314331/3.jpg?2923"
    ],
    category: "beverages",
    brand: "Best Juice",
    rating: 4.7,
    reviews: 1800,
    inStock: true,
    quantity: 4,
    sku: "GE810DB2ZWF2HNAFAMZ",
    tags: ["juice", "mango", "fruit juice", "natural ingredients"],
    discount: 0,
    discountedPrice: 205
  },
  {
    name: "Kaha Mango Nectar - 1 Liter",
    description: "Water - Sugar - Natural Mango Juice (less than 25%) - Citric Acid E330 - (Texture Enhancers)Sodium Carboxymethyl Cellulose E466 - Natural Flavors and ColorsSoluble Solids Not Less Than 14%Store and Display in a Well-Ventilated Place",
    price: 76,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/64/7926811/1.jpg?5107",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/64/7926811/1.jpg?5107"],
    category: "beverages",
    brand: "Best Juice",
    rating: 4.4,
    reviews: 1300,
    inStock: true,
    quantity: 300,
    sku: "GE810DB2Q42UHNAFAMZ",
    tags: ["juice", "mango", "fruit juice", "natural ingredients"],
    discount: 12,
    discountedPrice: 66.88
  },
  {
    name: "Lavida Fire Sauce - 400 g",
    description: "Savory spicy fire sauce by Lavida، perfect for appetizers and hot dishes.",
    price: 83,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/15/352306/1.jpg?1442",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/15/352306/1.jpg?1442"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 5,
    reviews: 2,
    inStock: true,
    quantity: 5,
    sku: "LA598FF0951WYNAFAMZ",
    tags: ["fire sauce", "spicy", "condiment"],
    discount: 2,
    discountedPrice: 81.34
  },
  {
    name: "Lavida Hot Sauce - 1 kg",
    description: "Popular hot sauce used in salads and appetizers.",
    price: 75,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/15/400232/1.jpg?6547",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/15/400232/1.jpg?6547"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 4.4,
    reviews: 16,
    inStock: true,
    quantity: 10,
    sku: "LA598FF0962W8NAFAMZ",
    tags: ["hot sauce", "condiment", "popular"],
    discount: 0,
    discountedPrice: 75
  },
  {
    name: "Lavida Texas Sauce - 385 g",
    description: "Lavida's Texas-style sauce, flavorful for complex dishes.",
    price: 74,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/77/091622/1.jpg?3245",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/77/091622/1.jpg?3245"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 4.0,
    reviews: 2,
    inStock: true,
    quantity: 8,
    sku: "LA598FF19WC9YNAFAMZ",
    tags: ["texas sauce", "sauce", "condiment"],
    discount: 0,
    discountedPrice: 74
  },
  {
    name: "Lavida Texas Sauce - 1 kg",
    description: "Lavida Texas Sauce in kilogram size for larger use.",
    price: 144,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/911052/1.jpg?4543",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/911052/1.jpg?4543"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 3.5,
    reviews: 8,
    inStock: true,
    quantity: 4,
    sku: "LA598FF073AMKNAFAMZ",
    tags: ["texas sauce", "large pack", "grilling"],
    discount: 0,
    discountedPrice: 144
  },
  {
    name: "Lavida Mustard Sauce - 1 kg",
    description: "Creamy mustard sauce by Lavida, perfect for sandwiches and salads.",
    price: 94,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/07/091622/1.jpg?4135",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/07/091622/1.jpg?4135"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 4.3,
    reviews: 23,
    inStock: true,
    quantity: 6,
    sku: "LA598FF047ZXINAFAMZ",
    tags: ["mustard", "sauce", "condiment"],
    discount: 0,
    discountedPrice: 94
  },
  {
    name: "Lavida Tomato Ketchup - 1 kg",
    description: "Lavida ketchup in 1 kg bottle, perfect for everyday use.",
    price: 71,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/05/614422/1.jpg?6533",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/05/614422/1.jpg?6533"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 4.2,
    reviews: 27,
    inStock: true,
    quantity: 12,
    sku: "LA598FF03CC46NAFAMZ",
    tags: ["ketchup", "tomato", "condiment"],
    discount: 0,
    discountedPrice: 71
  },
  {
    name: "Lavida Tomato Ketchup - 2.25 kg",
    description: "Large bottle of Lavida ketchup for catering or family use.",
    price: 109,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/96/764622/1.jpg?6601",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/96/764622/1.jpg?6601"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 4.6,
    reviews: 42,
    inStock: true,
    quantity: 5,
    sku: "LA598FF1LM026NAFAMZ",
    tags: ["ketchup", "large", "tomato"],
    discount: 0,
    discountedPrice: 109
  },
  {
    name: "Lavida Spicy Ketchup - 1 kg",
    description: "Ketchup with spicy twist by Lavida.",
    price: 72,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/99/1496501/1.jpg?1043",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/99/1496501/1.jpg?1043"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 3.8,
    reviews: 9,
    inStock: true,
    quantity: 8,
    sku: "LA598FF3AKGUQNAFAMZ",
    tags: ["spicy", "ketchup", "tomato"],
    discount: 0,
    discountedPrice: 72
  },
  {
    name: "Lavida Mayonnaise - 385 g",
    description: "Lavida Mayonnaise - 1 Kg is a versatile condiment perfect for enhancing the flavor of your favorite dishes. Its creamy texture makes it an ideal addition to sandwiches, salads, and dips, ensuring every meal is deliciously satisfying.",
    price: 64,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/76/091622/1.jpg?4447",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/76/091622/1.jpg?4447"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 4.0,
    reviews: 5,
    inStock: true,
    quantity: 15,
    sku: "LA598FF19AWO6NAFAMZ",
    tags: ["mayonnaise", "condiment", "sandwich"],
    discount: 0,
    discountedPrice: 64
  },
  {
    name: "Lavida Thousand Island Sauce - 420 g",
    description: "Lavida Thousand Island sauce is a creamy dressing perfect for salads and sandwiches. Its rich flavor enhances the taste of your meals, making it a must-have condiment in your kitchen.",
    price: 89,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/1087601/1.jpg?6398",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/1087601/1.jpg?6398"],
    category: "sauces & condiments",
    brand: "Lavida",
    rating: 5,
    reviews: 1,
    inStock: true,
    quantity: 10,
    sku: "LA598FF2JR32WNAFAMZ",
    tags: ["thousand island", "dressing", "sauce"],
    discount: 0,
    discountedPrice: 89
  },
  {
    name: "Kaha Tomato Sauce Pack - 300 g (3 pcs)",
    description: "Kaha concentrated tomato sauce (15-17 % TSS) - pack of 3 for everyday cooking.",
    price: 50,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/80/8216411/1.jpg?6472",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/80/8216411/2.jpg?6472"],
    category: "sauces & condiments",
    brand: "Kaha",
    rating: 4.5,
    reviews: 6,
    inStock: true,
    quantity: 5,
    sku: "GE810FF2ZNMVDNAFAMZ",
    tags: ["kaha", "tomato sauce", "concentrated", "3-pack"],
    discount: 49,
    discountedPrice: 25.5
  },
  {
    name: "Kaha Tam Sauce - 750 g",
    description: "Kaha Tam Sauce concentrated 21 % solids - smooth tomato paste for recipes.",
    price: 97,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/04/5127411/1.jpg?2623",
    images: [
      "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/04/5127411/2.jpg?2623",
      "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/04/5127411/3.jpg?2623"
    ],
    category: "sauces & condiments",
    brand: "Kaha",
    rating: 5,
    reviews: 1,
    inStock: true,
    quantity: 2,
    sku: "GE810FF1Q82JPNAFAMZ",
    tags: ["kaha", "tomato paste", "concentrated", "premium"],
    discount: 27,
    discountedPrice: 70.81
  },
  {
    name: "Kaha Tam Sauce - 1100 g",
    description: "Large jar of Kaha Tam Sauce - 21 % concentrated tomato paste, ideal for bulk cooking.",
    price: 117,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/74/7926811/1.jpg?5107",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/74/7926811/2.jpg?5107"],
    category: "sauces & condiments",
    brand: "Kaha",
    rating: 0,
    reviews: 0,
    inStock: true,
    quantity: 1,
    sku: "GE810FF2W2EW9NAFAMZ",
    tags: ["kaha", "tomato paste", "bulk", "concentrated"],
    discount: 11,
    discountedPrice: 104.13
  },
  {
    name: "Abu Auf Meat & BBQ Spice - 35 g (2 pcs)",
    description: "Premium Egyptian Abu Auf meat-seasoning powder - ideal for BBQ, grills and marinades.",
    price: 63,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/98/270798/1.jpg?6812",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/98/270798/1.jpg?6812"],
    category: "spices & seasonings",
    brand: "Abu Auf",
    rating: 4.5,
    reviews: 2,
    inStock: true,
    quantity: 10,
    sku: "AB761FF1MIA8ENAFAMZ",
    tags: ["abu auf", "meat spice", "barbecue", "egyptian brand"],
    discount: 36,
    discountedPrice: 40.32
  },
  {
    name: "Abu Auf Smoked Paprika - 35 g (2 pcs)",
    description: "Abu Auf smoked paprika seasoning - aromatic and smoky flavour for dishes.",
    price: 70,
    image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/02/4320131/1.jpg?1253",
    images: ["https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/02/4320131/1.jpg?1253"],
    category: "spices & seasonings",
    brand: "Abu Auf",
    rating: 4.0,
    reviews: 3,
    inStock: true,
    quantity: 8,
    sku: "AB761FF1OZH1PNAFAMZ",
    tags: ["abu auf", "paprika", "smoked", "seasoning"],
    discount: 20,
    discountedPrice: 56
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
    console.log(`Created ${createdProducts.length} sample products`);
    
    console.log('Products seeded successfully!');
    console.log('Categories available: sauces & condiments, snacks, beverages, canned & jarred foods, spices & seasonings');
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