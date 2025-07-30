const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
});

// Index for better performance
wishlistSchema.index({ user: 1 }, { unique: true });
wishlistSchema.index({ products: 1 });

module.exports = mongoose.model('Wishlist', wishlistSchema); 