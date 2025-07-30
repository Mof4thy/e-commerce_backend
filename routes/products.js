const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductsByCategory,
  getCategories,
  getBrands,
  getFeaturedProducts,
  searchProducts
} = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products with filtering and pagination
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/categories
// @desc    Get all product categories
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/products/brands
// @desc    Get all product brands
// @access  Public
router.get('/brands', getBrands);

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.get('/featured', getFeaturedProducts);

// @route   GET /api/products/search/:query
// @desc    Search products
// @access  Public
router.get('/search/:query', searchProducts);

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', getProductsByCategory);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', getProductById);

module.exports = router; 