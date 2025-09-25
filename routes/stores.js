const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { getData, saveData } = require('../utils/dataLoader');

/**
 * @swagger
 * /api/v1/stores/get-stores:
 *   get:
 *     summary: Get stores with filtering
 *     description: Returns stores with optional filtering by search, type, and open status
 *     tags: [Stores]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for store name or type
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by store type
 *       - in: query
 *         name: isOpen
 *         schema:
 *           type: string
 *         description: Filter by open status (true/false)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of records to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records to return
 *     responses:
 *       200:
 *         description: Stores retrieved successfully
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
 *                         example: "store001"
 *                       name:
 *                         type: string
 *                         example: "Smart Shopping"
 *                       type:
 *                         type: string
 *                         example: "Supermarket"
 *                       logoUrl:
 *                         type: string
 *                         example: "https://example.com/spar_logo.png"
 *                       rating:
 *                         type: number
 *                         example: 4.2
 *                       reviewCount:
 *                         type: string
 *                         example: "2K+"
 *                       distanceKm:
 *                         type: number
 *                         example: 2.5
 *                       deliveryTimeMins:
 *                         type: string
 *                         example: "15-20"
 *                       deliveryFeeKd:
 *                         type: number
 *                         example: 1.00
 *                       isFavorite:
 *                         type: boolean
 *                         example: false
 *                       promotions:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             type:
 *                               type: string
 *                               example: "percentage_off"
 *                             description:
 *                               type: string
 *                               example: "10.0% OFF"
 *                             discountPercentage:
 *                               type: number
 *                               example: 10
 *                       address:
 *                         type: string
 *                         example: "House: 00, Road: 00, City-000, Cou..."
 *                       phone:
 *                         type: string
 *                         example: "+96512345678"
 *                       isOpen:
 *                         type: boolean
 *                         example: true
 *                       operatingHours:
 *                         type: string
 *                         example: "24/7"
 *                 count:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Internal server error
 */
router.get('/get-stores', (req, res) => {
  try {
    const { search, type, isOpen, offset = 0, limit = 10 } = req.query;
    let stores = getData.stores();

    // Filter by search term
    if (search) {
      stores = stores.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.type.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by type
    if (type) {
      stores = stores.filter(s => s.type.toLowerCase() === type.toLowerCase());
    }

    // Filter by open status
    if (isOpen === 'true') {
      stores = stores.filter(s => s.isOpen);
    }

    // Apply pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedStores = stores.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedStores,
      count: stores.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stores',
      error: error.message
    });
  }
});

// Get all stores (legacy endpoint)
router.get('/', (req, res) => {
  try {
    const { search, type, isOpen } = req.query;
    let stores = getData.stores();

    // Filter by search term
    if (search) {
      stores = stores.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.type.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by type
    if (type) {
      stores = stores.filter(s => s.type.toLowerCase() === type.toLowerCase());
    }

    // Filter by open status
    if (isOpen === 'true') {
      stores = stores.filter(s => s.isOpen);
    }

    res.json({
      success: true,
      data: stores,
      count: stores.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stores',
      error: error.message
    });
  }
});

// Get popular stores
router.get('/popular', (req, res) => {
  try {
    const stores = getData.stores();
    
    // Sort by rating and review count
    const popularStores = stores
      .sort((a, b) => {
        const aRating = parseFloat(a.rating) || 0;
        const bRating = parseFloat(b.rating) || 0;
        if (aRating !== bRating) return bRating - aRating;
        
        const aReviews = parseInt(a.reviewCount?.replace(/[^\d]/g, '') || '0');
        const bReviews = parseInt(b.reviewCount?.replace(/[^\d]/g, '') || '0');
        return bReviews - aReviews;
      })
      .slice(0, 10);

    res.json({
      success: true,
      data: popularStores
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching popular stores',
      error: error.message
    });
  }
});

// Get latest stores
router.get('/latest', (req, res) => {
  try {
    const stores = getData.stores();
    
    // Sort by creation date (newest first)
    const latestStores = stores
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 10);

    res.json({
      success: true,
      data: latestStores
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching latest stores',
      error: error.message
    });
  }
});

// Get top offer stores
router.get('/top-offer-near-me', (req, res) => {
  try {
    const stores = getData.stores();
    
    // Filter stores with promotions and sort by discount percentage
    const topOfferStores = stores
      .filter(store => store.promotions && store.promotions.length > 0)
      .sort((a, b) => {
        const aMaxDiscount = Math.max(...(a.promotions?.map(p => p.discountPercentage || 0) || [0]));
        const bMaxDiscount = Math.max(...(b.promotions?.map(p => p.discountPercentage || 0) || [0]));
        return bMaxDiscount - aMaxDiscount;
      })
      .slice(0, 10);

    res.json({
      success: true,
      data: topOfferStores
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching top offer stores',
      error: error.message
    });
  }
});

// Get store by ID (this should be last to avoid conflicts)
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stores = getData.stores();
    const store = stores.find(s => s.id === id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.json({
      success: true,
      data: store
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching store',
      error: error.message
    });
  }
});

// Toggle store favorite status
router.post('/:id/favorite', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const stores = getData.stores();
    const users = getData.users();
    
    const store = stores.find(s => s.id === id);
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    const userIndex = users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const favoriteIndex = users[userIndex].favorites.stores.indexOf(id);
    let isFavorite;

    if (favoriteIndex > -1) {
      // Remove from favorites
      users[userIndex].favorites.stores.splice(favoriteIndex, 1);
      isFavorite = false;
    } else {
      // Add to favorites
      users[userIndex].favorites.stores.push(id);
      isFavorite = true;
    }

    users[userIndex].updatedAt = new Date().toISOString();
    saveData.users(users);

    res.json({
      success: true,
      message: isFavorite ? 'Store added to favorites' : 'Store removed from favorites',
      data: {
        storeId: id,
        isFavorite
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating store favorite status',
      error: error.message
    });
  }
});

// Get user's favorite stores
router.get('/favorites/user', authenticateToken, (req, res) => {
  try {
    const users = getData.users();
    const stores = getData.stores();
    
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const favoriteStores = stores.filter(store => 
      user.favorites.stores.includes(store.id)
    );

    res.json({
      success: true,
      data: favoriteStores,
      count: favoriteStores.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching favorite stores',
      error: error.message
    });
  }
});


module.exports = router;
