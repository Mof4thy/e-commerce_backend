const Product = require('../models/Product');

// @desc    Get all products with filtering and sorting (no pagination)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      inStock
    } = req.query;

    // Build filter object
    const filter = {};

    if (category) {
      filter.category = category.toLowerCase();
    }

    if (brand) {
      filter.brand = new RegExp(brand, 'i');
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (inStock !== undefined) {
      filter.inStock = inStock === 'true';
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query without pagination
    const products = await Product.find(filter)
      .sort(sort)
      .select('-__v');

    res.json({
      products,
      totalProducts: products.length,
      filters: {
        category,
        brand,
        minPrice,
        maxPrice,
        search,
        inStock
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select('-__v');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product by ID error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    
    res.status(500).json({ message: 'Server error fetching product' });
  }
};

// @desc    Get products by category (no pagination)
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const {
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = { category: category.toLowerCase() };

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const products = await Product.find(filter)
      .sort(sort)
      .select('-__v');

    res.json({
      products,
      category,
      totalProducts: products.length
    });
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({ message: 'Server error fetching products by category' });
  }
};

// @desc    Get all categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({ categories: categories.sort() });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error fetching categories' });
  }
};

// @desc    Get all brands
// @route   GET /api/products/brands
// @access  Public
const getBrands = async (req, res) => {
  try {
    const brands = await Product.distinct('brand');
    res.json({ brands: brands.sort() });
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({ message: 'Server error fetching brands' });
  }
};

// @desc    Get featured products (top rated, no pagination)
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    const products = await Product.find({ inStock: true })
      .sort({ rating: -1, reviews: -1 })
      .limit(Number(limit))
      .select('-__v');

    res.json({ products });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({ message: 'Server error fetching featured products' });
  }
};

// @desc    Search products (no pagination)
// @route   GET /api/products/search/:query
// @access  Public
const searchProducts = async (req, res) => {
  try {
    const { query } = req.params;
    const {
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters long' });
    }

    const searchRegex = new RegExp(query, 'i');
    const filter = {
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { brand: searchRegex },
        { tags: { $in: [searchRegex] } }
      ]
    };

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const products = await Product.find(filter)
      .sort(sort)
      .select('-__v');

    res.json({
      products,
      searchQuery: query,
      totalProducts: products.length
    });
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({ message: 'Server error searching products' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getCategories,
  getBrands,
  getFeaturedProducts,
  searchProducts
}; 