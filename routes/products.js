const express = require('express');
const router = express.Router();
const { getData } = require('../utils/dataLoader');

// Get all products
router.get('/', (req, res) => {
  try {
    const { category, brand, search, popular, superSaver } = req.query;
    let products = getData.products();

    // Filter by category
    if (category) {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by brand
    if (brand) {
      products = products.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }

    // Search by name
    if (search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter popular products
    if (popular === 'true') {
      products = products.filter(p => p.isPopular);
    }

    // Filter super saver products
    if (superSaver === 'true') {
      products = products.filter(p => p.isSuperSaver);
    }

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// Get popular products
router.get('/popular', (req, res) => {
  try {
    const products = getData.products().filter(p => p.isPopular);
    
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching popular products',
      error: error.message
    });
  }
});

// Get super saver products
router.get('/super-saver', (req, res) => {
  try {
    const products = getData.products().filter(p => p.isSuperSaver);
    
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching super saver products',
      error: error.message
    });
  }
});

// Get product by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const products = getData.products();
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

// Search products
router.get('/search/:query', (req, res) => {
  try {
    const { query } = req.params;
    const products = getData.products();
    
    const searchResults = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    res.json({
      success: true,
      data: searchResults,
      count: searchResults.length,
      query
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching products',
      error: error.message
    });
  }
});

module.exports = router;
