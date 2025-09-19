const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { validateProductAddToCart } = require('../middleware/validation');
const { getData, saveData } = require('../utils/dataLoader');

// Get user's cart
router.get('/', authenticateToken, (req, res) => {
  try {
    const cartData = getData.cart();
    const userCart = cartData[req.user.id] || {
      items: [],
      subtotal: 0,
      deliveryFee: 1.00,
      total: 1.00,
      currency: 'KD',
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: userCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
});

// Add product to cart
router.post('/add', authenticateToken, validateProductAddToCart, (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const products = getData.products();
    const cartData = getData.cart();

    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!product.inStock) {
      return res.status(400).json({
        success: false,
        message: 'Product is out of stock'
      });
    }

    const userId = req.user.id;
    let userCart = cartData[userId] || {
      items: [],
      subtotal: 0,
      deliveryFee: 1.00,
      total: 1.00,
      currency: 'KD',
      lastUpdated: new Date().toISOString()
    };

    // Check if product already exists in cart
    const existingItemIndex = userCart.items.findIndex(item => item.productId === productId);

    if (existingItemIndex > -1) {
      // Update quantity
      userCart.items[existingItemIndex].quantity += quantity;
      userCart.items[existingItemIndex].totalPrice = 
        userCart.items[existingItemIndex].quantity * userCart.items[existingItemIndex].unitPrice;
    } else {
      // Add new item
      const cartItem = {
        id: `cart_item_${Date.now()}`,
        productId: product.id,
        productName: product.name,
        productImage: product.imageUrl,
        quantity,
        unitPrice: product.currentPrice,
        totalPrice: product.currentPrice * quantity,
        currency: product.currency,
        addedAt: new Date().toISOString()
      };
      userCart.items.push(cartItem);
    }

    // Recalculate totals
    userCart.subtotal = userCart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    userCart.total = userCart.subtotal + userCart.deliveryFee;
    userCart.lastUpdated = new Date().toISOString();

    cartData[userId] = userCart;
    saveData.cart(cartData);

    res.json({
      success: true,
      message: 'Product added to cart',
      data: userCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding product to cart',
      error: error.message
    });
  }
});

// Update cart item quantity
router.put('/items/:itemId', authenticateToken, (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const cartData = getData.cart();

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const userId = req.user.id;
    const userCart = cartData[userId];

    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = userCart.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    userCart.items[itemIndex].quantity = quantity;
    userCart.items[itemIndex].totalPrice = 
      userCart.items[itemIndex].quantity * userCart.items[itemIndex].unitPrice;

    // Recalculate totals
    userCart.subtotal = userCart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    userCart.total = userCart.subtotal + userCart.deliveryFee;
    userCart.lastUpdated = new Date().toISOString();

    cartData[userId] = userCart;
    saveData.cart(cartData);

    res.json({
      success: true,
      message: 'Cart item updated',
      data: userCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart item',
      error: error.message
    });
  }
});

// Remove item from cart
router.delete('/items/:itemId', authenticateToken, (req, res) => {
  try {
    const { itemId } = req.params;
    const cartData = getData.cart();

    const userId = req.user.id;
    const userCart = cartData[userId];

    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = userCart.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    userCart.items.splice(itemIndex, 1);

    // Recalculate totals
    userCart.subtotal = userCart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    userCart.total = userCart.subtotal + userCart.deliveryFee;
    userCart.lastUpdated = new Date().toISOString();

    cartData[userId] = userCart;
    saveData.cart(cartData);

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: userCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing cart item',
      error: error.message
    });
  }
});

// Clear cart
router.delete('/', authenticateToken, (req, res) => {
  try {
    const cartData = getData.cart();
    const userId = req.user.id;

    cartData[userId] = {
      items: [],
      subtotal: 0,
      deliveryFee: 1.00,
      total: 1.00,
      currency: 'KD',
      lastUpdated: new Date().toISOString()
    };

    saveData.cart(cartData);

    res.json({
      success: true,
      message: 'Cart cleared',
      data: cartData[userId]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message
    });
  }
});

module.exports = router;
