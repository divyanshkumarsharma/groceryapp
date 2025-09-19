const express = require('express');
const router = express.Router();
const { getData } = require('../utils/dataLoader');

// Get all offers
router.get('/', (req, res) => {
  try {
    const { category, active, banner } = req.query;
    let offers = getData.offers();

    // Filter by category
    if (category) {
      offers = offers.filter(o => o.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by active status
    if (active === 'true') {
      offers = offers.filter(o => o.isActive);
    }

    // Filter banner offers
    if (banner === 'true') {
      offers = offers.filter(o => o.isBanner);
    }

    // Sort by order
    offers.sort((a, b) => (a.order || 0) - (b.order || 0));

    res.json({
      success: true,
      data: offers,
      count: offers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching offers',
      error: error.message
    });
  }
});

// Get banner offers
router.get('/banners', (req, res) => {
  try {
    const offers = getData.offers().filter(o => o.isBanner);
    
    // Sort by order
    offers.sort((a, b) => (a.order || 0) - (b.order || 0));

    res.json({
      success: true,
      data: offers,
      count: offers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching banner offers',
      error: error.message
    });
  }
});

// Get offers for specific category
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const offers = getData.offers().filter(o => 
      o.category.toLowerCase() === category.toLowerCase() && o.isActive
    );

    res.json({
      success: true,
      data: offers,
      count: offers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching category offers',
      error: error.message
    });
  }
});

// Get offer by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const offers = getData.offers();
    const offer = offers.find(o => o.id === id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }

    res.json({
      success: true,
      data: offer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching offer',
      error: error.message
    });
  }
});

module.exports = router;
