const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { validateAddressUpdate } = require('../middleware/validation');
const { getData, saveData } = require('../utils/dataLoader');

/**
 * @swagger
 * /api/v1/customer/info:
 *   get:
 *     summary: Get user information
 *     description: Returns user profile information including wallet balance
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "user001"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     phone:
 *                       type: string
 *                       example: "+96512345678"
 *                     profileImage:
 *                       type: string
 *                       example: "https://example.com/profile.jpg"
 *                     isValidForDiscount:
 *                       type: boolean
 *                       example: true
 *                     walletBalance:
 *                       type: number
 *                       example: 25.50
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/info', authenticateToken, (req, res) => {
  try {
    const users = getData.users();
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove sensitive data and format response
    const { password, ...userInfo } = user;
    const formattedUserInfo = {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      profileImage: userInfo.profileImage || "https://example.com/default_profile.jpg",
      isValidForDiscount: userInfo.isValidForDiscount || true,
      walletBalance: userInfo.walletBalance || 0
    };
    
    res.json({
      success: true,
      data: formattedUserInfo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user information',
      error: error.message
    });
  }
});

// Get user profile (legacy endpoint)
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

/**
 * @swagger
 * /api/v1/customer/address/list:
 *   get:
 *     summary: Get user address list
 *     description: Returns list of user saved addresses
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Address list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "addr001"
 *                       address:
 *                         type: string
 *                         example: "Maadi Star Towers, Kornish Al Nile"
 *                       latitude:
 *                         type: string
 *                         example: "29.9727388"
 *                       longitude:
 *                         type: string
 *                         example: "31.2360419"
 *                       addressType:
 *                         type: string
 *                         example: "home"
 *                       isDefault:
 *                         type: boolean
 *                         example: true
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/address/list', authenticateToken, (req, res) => {
  try {
    const users = getData.users();
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Format addresses with proper structure
    const addresses = [
      {
        id: "addr001",
        address: user.address ? `${user.address.addressLine1}, ${user.address.city}` : "Maadi Star Towers, Kornish Al Nile",
        latitude: user.address?.coordinates?.lat || "29.9727388",
        longitude: user.address?.coordinates?.lng || "31.2360419",
        addressType: "home",
        isDefault: true
      }
    ];

    res.json({
      success: true,
      data: addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching address list',
      error: error.message
    });
  }
});

// Get user address (legacy endpoint)
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

/**
 * @swagger
 * /api/v1/customer/notifications:
 *   get:
 *     summary: Get user notifications
 *     description: Returns user notifications with proper formatting
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "notif001"
 *                       title:
 *                         type: string
 *                         example: "Order Confirmed"
 *                       message:
 *                         type: string
 *                         example: "Your order #12345 has been confirmed"
 *                       type:
 *                         type: string
 *                         example: "order"
 *                       isRead:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00Z"
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
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

    // Format notifications with proper structure
    const formattedNotifications = (user.notifications || []).map(notif => ({
      id: notif.id,
      title: notif.title,
      message: notif.message,
      type: notif.type || 'general',
      isRead: notif.read || false,
      createdAt: notif.createdAt || new Date().toISOString()
    }));

    res.json({
      success: true,
      data: formattedNotifications
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
