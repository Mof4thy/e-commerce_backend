const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
});

// Index for better performance
wishlistSchema.index({ user: 1 });
wishlistSchema.index({ products: 1 });

// Prevent duplicate products in the same wishlist
wishlistSchema.index({ user: 1, products: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Wishlist', wishlistSchema); 