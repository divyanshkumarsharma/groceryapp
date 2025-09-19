const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { getData, saveData } = require('../utils/dataLoader');

// Get all stores
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

// Get store by ID
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
