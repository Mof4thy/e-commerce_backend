const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkWishlist
} = require('../controllers/wishlistController');
const { auth } = require('../middleware/auth');

// All wishlist routes require authentication
router.use(auth);

// @route   GET /api/wishlist
// @desc    Get user's wishlist
// @access  Private
router.get('/', getWishlist);

// @route   POST /api/wishlist/add
// @desc    Add item to wishlist
// @access  Private
router.post('/add', addToWishlist);

// @route   DELETE /api/wishlist/remove/:productId
// @desc    Remove item from wishlist
// @access  Private
router.delete('/remove/:productId', removeFromWishlist);

// @route   DELETE /api/wishlist/clear
// @desc    Clear entire wishlist
// @access  Private
router.delete('/clear', clearWishlist);

// @route   GET /api/wishlist/check/:productId
// @desc    Check if product is in wishlist
// @access  Private
router.get('/check/:productId', checkWishlist);

module.exports = router; 