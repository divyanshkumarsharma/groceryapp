const express = require('express');
const router = express.Router();
const { getData } = require('../utils/dataLoader');

// Get all brands
router.get('/', (req, res) => {
  try {
    const { category, loved } = req.query;
    let brands = getData.brands();

    // Filter by category
    if (category) {
      brands = brands.filter(b => b.category.toLowerCase() === category.toLowerCase());
    }

    // Filter loved brands
    if (loved === 'true') {
      brands = brands.filter(b => b.isLoved);
    }

    res.json({
      success: true,
      data: brands,
      count: brands.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching brands',
      error: error.message
    });
  }
});

// Get most loved brands
router.get('/loved', (req, res) => {
  try {
    const brands = getData.brands().filter(b => b.isLoved);
    
    res.json({
      success: true,
      data: brands,
      count: brands.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching loved brands',
      error: error.message
    });
  }
});

// Get brand by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const brands = getData.brands();
    const brand = brands.find(b => b.id === id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    res.json({
      success: true,
      data: brand
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching brand',
      error: error.message
    });
  }
});

module.exports = router;
