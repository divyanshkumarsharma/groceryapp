const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { validateAddressUpdate } = require('../middleware/validation');
const { getData, saveData } = require('../utils/dataLoader');

// Get user profile
router.get('/profile', authenticateToken, (req, res) => {
  try {
    const users = getData.users();
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove sensitive data
    const { password, ...userProfile } = user;
    
    res.json({
      success: true,
      data: userProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
});

// Get user address
router.get('/address', authenticateToken, (req, res) => {
  try {
    const users = getData.users();
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user.address
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user address',
      error: error.message
    });
  }
});

// Update user address
router.put('/address', authenticateToken, validateAddressUpdate, (req, res) => {
  try {
    const users = getData.users();
    const userIndex = users.findIndex(u => u.id === req.user.id);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { label, addressLine1, addressLine2, city, country, coordinates } = req.body;
    
    users[userIndex].address = {
      id: users[userIndex].address.id,
      label,
      addressLine1,
      addressLine2,
      city,
      country,
      coordinates: coordinates || users[userIndex].address.coordinates
    };
    users[userIndex].updatedAt = new Date().toISOString();

    saveData.users(users);

    res.json({
      success: true,
      message: 'Address updated successfully',
      data: users[userIndex].address
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating address',
      error: error.message
    });
  }
});

// Get user favorites
router.get('/favorites', authenticateToken, (req, res) => {
  try {
    const users = getData.users();
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching favorites',
      error: error.message
    });
  }
});

// Get user notifications
router.get('/notifications', authenticateToken, (req, res) => {
  try {
    const users = getData.users();
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user.notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notifications',
      error: error.message
    });
  }
});

// Mark notification as read
router.put('/notifications/:notificationId/read', authenticateToken, (req, res) => {
  try {
    const { notificationId } = req.params;
    const users = getData.users();
    const userIndex = users.findIndex(u => u.id === req.user.id);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const notificationIndex = users[userIndex].notifications.findIndex(
      n => n.id === notificationId
    );

    if (notificationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    users[userIndex].notifications[notificationIndex].read = true;
    users[userIndex].updatedAt = new Date().toISOString();

    saveData.users(users);

    res.json({
      success: true,
      message: 'Notification marked as read',
      data: users[userIndex].notifications[notificationIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating notification',
      error: error.message
    });
  }
});

module.exports = router;
