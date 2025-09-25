const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/v1/banners:
 *   get:
 *     summary: Get promotional banners
 *     description: Returns promotional banners for the home screen
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: Banners retrieved successfully
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
 *                         example: "banner001"
 *                       title:
 *                         type: string
 *                         example: "A World of Flavors at Your Fingertips"
 *                       description:
 *                         type: string
 *                         example: "Indulge in the flavors you love with just a few taps!"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://example.com/banner1.jpg"
 *                       buttonText:
 *                         type: string
 *                         example: "10% Off on First Order"
 *                       buttonColor:
 *                         type: string
 *                         example: "#4CAF50"
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       order:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Internal server error
 */
router.get('/', (req, res) => {
  try {
    const banners = [
      {
        id: "banner001",
        title: "A World of Flavors at Your Fingertips",
        description: "Indulge in the flavors you love with just a few taps!",
        imageUrl: "https://example.com/banner1.jpg",
        buttonText: "10% Off on First Order",
        buttonColor: "#4CAF50",
        isActive: true,
        order: 1
      },
      {
        id: "banner002",
        title: "Fresh Groceries Delivered",
        description: "Get your daily essentials delivered to your doorstep",
        imageUrl: "https://example.com/banner2.jpg",
        buttonText: "Shop Now",
        buttonColor: "#2196F3",
        isActive: true,
        order: 2
      },
      {
        id: "banner003",
        title: "Pharmacy at Your Service",
        description: "Health and wellness products delivered safely",
        imageUrl: "https://example.com/banner3.jpg",
        buttonText: "Order Medicine",
        buttonColor: "#FF9800",
        isActive: true,
        order: 3
      }
    ];

    res.json({
      success: true,
      data: banners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching banners',
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/v1/other-banners:
 *   get:
 *     summary: Get promotional content banners
 *     description: Returns additional promotional content banners
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: Promotional banners retrieved successfully
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
 *                         example: "promo_banner001"
 *                       title:
 *                         type: string
 *                         example: "Special Weekend Offer"
 *                       description:
 *                         type: string
 *                         example: "Get 20% off on all orders this weekend"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://example.com/promo_banner1.jpg"
 *                       buttonText:
 *                         type: string
 *                         example: "Claim Offer"
 *                       buttonColor:
 *                         type: string
 *                         example: "#E91E63"
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       order:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Internal server error
 */
router.get('/other-banners', (req, res) => {
  try {
    const promotionalBanners = [
      {
        id: "promo_banner001",
        title: "Special Weekend Offer",
        description: "Get 20% off on all orders this weekend",
        imageUrl: "https://example.com/promo_banner1.jpg",
        buttonText: "Claim Offer",
        buttonColor: "#E91E63",
        isActive: true,
        order: 1
      },
      {
        id: "promo_banner002",
        title: "New User Bonus",
        description: "Welcome bonus for new customers",
        imageUrl: "https://example.com/promo_banner2.jpg",
        buttonText: "Sign Up Now",
        buttonColor: "#9C27B0",
        isActive: true,
        order: 2
      }
    ];

    res.json({
      success: true,
      data: promotionalBanners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching promotional banners',
      error: error.message
    });
  }
});

module.exports = router;
