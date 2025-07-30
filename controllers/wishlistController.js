const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
      path: 'products',
      select: 'name price image brand rating reviews inStock quantity discount'
    });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] });
      await wishlist.save();
    }

    res.json({
      wishlist: {
        id: wishlist._id,
        products: wishlist.products,
        totalItems: wishlist.products.length,
        updatedAt: wishlist.updatedAt
      }
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error fetching wishlist' });
  }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist/add
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] });
    }

    // Check if product is already in wishlist
    const isProductInWishlist = wishlist.products.some(
      item => item.toString() === productId
    );

    if (isProductInWishlist) {
      return res.status(400).json({ message: 'Product is already in your wishlist' });
    }

    // Add product to wishlist
    wishlist.products.push(productId);
    await wishlist.save();

    // Populate the wishlist with product details
    await wishlist.populate({
      path: 'products',
      select: 'name price image brand rating reviews inStock quantity discount'
    });

    res.json({
      message: 'Product added to wishlist successfully',
      wishlist: {
        id: wishlist._id,
        products: wishlist.products,
        totalItems: wishlist.products.length,
        updatedAt: wishlist.updatedAt
      }
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error adding item to wishlist' });
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/remove/:productId
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Check if product is in wishlist
    const productIndex = wishlist.products.findIndex(
      item => item.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    // Remove product from wishlist
    wishlist.products.splice(productIndex, 1);
    await wishlist.save();

    // Populate the wishlist with product details
    await wishlist.populate({
      path: 'products',
      select: 'name price image brand rating reviews inStock quantity discount'
    });

    res.json({
      message: 'Product removed from wishlist successfully',
      wishlist: {
        id: wishlist._id,
        products: wishlist.products,
        totalItems: wishlist.products.length,
        updatedAt: wishlist.updatedAt
      }
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error removing item from wishlist' });
  }
};

// @desc    Clear entire wishlist
// @route   DELETE /api/wishlist/clear
// @access  Private
const clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = [];
    await wishlist.save();

    res.json({
      message: 'Wishlist cleared successfully',
      wishlist: {
        id: wishlist._id,
        products: wishlist.products,
        totalItems: wishlist.products.length,
        updatedAt: wishlist.updatedAt
      }
    });
  } catch (error) {
    console.error('Clear wishlist error:', error);
    res.status(500).json({ message: 'Server error clearing wishlist' });
  }
};

// @desc    Check if product is in wishlist
// @route   GET /api/wishlist/check/:productId
// @access  Private
const checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user._id });
    
    const isInWishlist = wishlist ? wishlist.products.some(
      item => item.toString() === productId
    ) : false;

    res.json({
      isInWishlist,
      productId
    });
  } catch (error) {
    console.error('Check wishlist error:', error);
    res.status(500).json({ message: 'Server error checking wishlist' });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkWishlist
}; 