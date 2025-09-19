const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { getData, saveData } = require('../utils/dataLoader');

// Get user's orders
router.get('/', authenticateToken, (req, res) => {
  try {
    const orders = getData.orders().filter(order => order.userId === req.user.id);
    
    // Sort by order date (newest first)
    orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    res.json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

// Get order by ID
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const orders = getData.orders();
    const order = orders.find(o => o.id === id && o.userId === req.user.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
});

// Create new order
router.post('/', authenticateToken, (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;
    const cartData = getData.cart();
    const orders = getData.orders();

    const userId = req.user.id;
    const userCart = cartData[userId];

    if (!userCart || userCart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Create new order
    const newOrder = {
      id: `order${Date.now()}`,
      userId,
      orderNumber: `ORD-${Date.now()}`,
      status: 'pending',
      orderDate: new Date().toISOString(),
      deliveryDate: null,
      items: userCart.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice
      })),
      subtotal: userCart.subtotal,
      deliveryFee: userCart.deliveryFee,
      total: userCart.total,
      currency: userCart.currency,
      deliveryAddress: deliveryAddress || userCart.deliveryAddress,
      paymentMethod: paymentMethod || 'Credit Card',
      paymentStatus: 'pending',
      trackingNumber: `TRK${Date.now()}`,
      estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      actualDelivery: null
    };

    orders.push(newOrder);

    // Clear user's cart
    cartData[userId] = {
      items: [],
      subtotal: 0,
      deliveryFee: 1.00,
      total: 1.00,
      currency: 'KD',
      lastUpdated: new Date().toISOString()
    };

    saveData.orders(orders);
    saveData.cart(cartData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: newOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
});

// Update order status
router.put('/:id/status', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const orders = getData.orders();

    const orderIndex = orders.findIndex(o => o.id === id && o.userId === req.user.id);
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    orders[orderIndex].status = status;
    
    if (status === 'delivered') {
      orders[orderIndex].actualDelivery = new Date().toISOString();
    }

    saveData.orders(orders);

    res.json({
      success: true,
      message: 'Order status updated',
      data: orders[orderIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
});

// Cancel order
router.put('/:id/cancel', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const orders = getData.orders();

    const orderIndex = orders.findIndex(o => o.id === id && o.userId === req.user.id);
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (orders[orderIndex].status === 'delivered' || orders[orderIndex].status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel this order'
      });
    }

    orders[orderIndex].status = 'cancelled';
    saveData.orders(orders);

    res.json({
      success: true,
      message: 'Order cancelled',
      data: orders[orderIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling order',
      error: error.message
    });
  }
});

module.exports = router;
