const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { getData } = require('../utils/dataLoader');

/**
 * @swagger
 * /api/v1/items/popular:
 *   get:
 *     summary: Get popular items
 *     description: Returns most popular items based on sales and ratings
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Popular items retrieved successfully
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
 *                         example: "item001"
 *                       name:
 *                         type: string
 *                         example: "Fresh Vegetables"
 *                       description:
 *                         type: string
 *                         example: "Organic fresh vegetables"
 *                       price:
 *                         type: number
 *                         example: 5.50
 *                       currency:
 *                         type: string
 *                         example: "KD"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://example.com/vegetables.jpg"
 *                       rating:
 *                         type: number
 *                         example: 4.5
 *                       reviewCount:
 *                         type: integer
 *                         example: 120
 *                       isAvailable:
 *                         type: boolean
 *                         example: true
 *                       category:
 *                         type: string
 *                         example: "Vegetables"
 *       500:
 *         description: Internal server error
 */
router.get('/popular', (req, res) => {
  try {
    const products = getData.products();
    
    // Sort by popularity (rating and sales)
    const popularItems = products
      .filter(p => p.isPopular)
      .sort((a, b) => {
        const aRating = parseFloat(a.rating) || 0;
        const bRating = parseFloat(b.rating) || 0;
        return bRating - aRating;
      })
      .slice(0, 20);

    res.json({
      success: true,
      data: popularItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching popular items',
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/v1/items/latest:
 *   get:
 *     summary: Get latest items
 *     description: Returns newest items added to the platform
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Latest items retrieved successfully
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
 *                         example: "item002"
 *                       name:
 *                         type: string
 *                         example: "New Product"
 *                       description:
 *                         type: string
 *                         example: "Latest addition to our catalog"
 *                       price:
 *                         type: number
 *                         example: 12.99
 *                       currency:
 *                         type: string
 *                         example: "KD"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://example.com/new_product.jpg"
 *                       rating:
 *                         type: number
 *                         example: 4.2
 *                       reviewCount:
 *                         type: integer
 *                         example: 25
 *                       isAvailable:
 *                         type: boolean
 *                         example: true
 *                       category:
 *                         type: string
 *                         example: "Electronics"
 *       500:
 *         description: Internal server error
 */
router.get('/latest', (req, res) => {
  try {
    const products = getData.products();
    
    // Sort by creation date (newest first)
    const latestItems = products
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 20);

    res.json({
      success: true,
      data: latestItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching latest items',
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/v1/items/most-reviewed:
 *   get:
 *     summary: Get most reviewed items
 *     description: Returns items with the highest number of reviews
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Most reviewed items retrieved successfully
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
 *                         example: "item003"
 *                       name:
 *                         type: string
 *                         example: "Best Seller Product"
 *                       description:
 *                         type: string
 *                         example: "Highly reviewed and trusted product"
 *                       price:
 *                         type: number
 *                         example: 8.75
 *                       currency:
 *                         type: string
 *                         example: "KD"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://example.com/best_seller.jpg"
 *                       rating:
 *                         type: number
 *                         example: 4.8
 *                       reviewCount:
 *                         type: integer
 *                         example: 500
 *                       isAvailable:
 *                         type: boolean
 *                         example: true
 *                       category:
 *                         type: string
 *                         example: "Home & Garden"
 *       500:
 *         description: Internal server error
 */
router.get('/most-reviewed', (req, res) => {
  try {
    const products = getData.products();
    
    // Sort by review count
    const mostReviewedItems = products
      .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
      .slice(0, 20);

    res.json({
      success: true,
      data: mostReviewedItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching most reviewed items',
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/v1/items/recommended:
 *   get:
 *     summary: Get recommended items
 *     description: Returns personalized recommended items for the user
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recommended items retrieved successfully
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
 *                         example: "item004"
 *                       name:
 *                         type: string
 *                         example: "Personalized Recommendation"
 *                       description:
 *                         type: string
 *                         example: "Recommended based on your preferences"
 *                       price:
 *                         type: number
 *                         example: 15.99
 *                       currency:
 *                         type: string
 *                         example: "KD"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://example.com/recommended_item.jpg"
 *                       rating:
 *                         type: number
 *                         example: 4.3
 *                       reviewCount:
 *                         type: integer
 *                         example: 85
 *                       isAvailable:
 *                         type: boolean
 *                         example: true
 *                       category:
 *                         type: string
 *                         example: "Personal Care"
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Internal server error
 */
router.get('/recommended', authenticateToken, (req, res) => {
  try {
    const products = getData.products();
    
    // Mock personalized recommendations based on user preferences
    const recommendedItems = products
      .filter(p => p.isRecommended)
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, 20);

    res.json({
      success: true,
      data: recommendedItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recommended items',
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/v1/items/discounted:
 *   get:
 *     summary: Get discounted items
 *     description: Returns items with discounts and special offers
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Discounted items retrieved successfully
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
 *                         example: "item005"
 *                       name:
 *                         type: string
 *                         example: "Sale Item"
 *                       description:
 *                         type: string
 *                         example: "Special discount on this item"
 *                       price:
 *                         type: number
 *                         example: 9.99
 *                       originalPrice:
 *                         type: number
 *                         example: 14.99
 *                       currency:
 *                         type: string
 *                         example: "KD"
 *                       discountPercentage:
 *                         type: number
 *                         example: 33
 *                       imageUrl:
 *                         type: string
 *                         example: "https://example.com/sale_item.jpg"
 *                       rating:
 *                         type: number
 *                         example: 4.1
 *                       reviewCount:
 *                         type: integer
 *                         example: 45
 *                       isAvailable:
 *                         type: boolean
 *                         example: true
 *                       category:
 *                         type: string
 *                         example: "Clothing"
 *       500:
 *         description: Internal server error
 */
router.get('/discounted', (req, res) => {
  try {
    const products = getData.products();
    
    // Filter items with discounts
    const discountedItems = products
      .filter(p => p.discountPercentage && p.discountPercentage > 0)
      .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
      .slice(0, 20);

    res.json({
      success: true,
      data: discountedItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching discounted items',
      error: error.message
    });
  }
});

module.exports = router;
