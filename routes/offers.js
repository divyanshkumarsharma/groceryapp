const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
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

/**
 * @swagger
 * /api/v1/coupon/list:
 *   get:
 *     summary: Get available coupons
 *     description: Returns available coupons for the authenticated user
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Coupons retrieved successfully
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
 *                         example: "coupon001"
 *                       code:
 *                         type: string
 *                         example: "WELCOME10"
 *                       title:
 *                         type: string
 *                         example: "Welcome Discount"
 *                       description:
 *                         type: string
 *                         example: "10% off on first order"
 *                       discountType:
 *                         type: string
 *                         example: "percentage"
 *                       discountValue:
 *                         type: number
 *                         example: 10
 *                       minOrderAmount:
 *                         type: number
 *                         example: 20
 *                       maxDiscount:
 *                         type: number
 *                         example: 50
 *                       validFrom:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T00:00:00Z"
 *                       validTo:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-31T23:59:59Z"
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Internal server error
 */
router.get('/coupon/list', authenticateToken, (req, res) => {
  try {
    const coupons = [
      {
        id: "coupon001",
        code: "WELCOME10",
        title: "Welcome Discount",
        description: "10% off on first order",
        discountType: "percentage",
        discountValue: 10,
        minOrderAmount: 20,
        maxDiscount: 50,
        validFrom: "2024-01-01T00:00:00Z",
        validTo: "2024-12-31T23:59:59Z",
        isActive: true
      },
      {
        id: "coupon002",
        code: "SAVE20",
        title: "Save More",
        description: "20% off on orders above 50 KD",
        discountType: "percentage",
        discountValue: 20,
        minOrderAmount: 50,
        maxDiscount: 100,
        validFrom: "2024-01-01T00:00:00Z",
        validTo: "2024-12-31T23:59:59Z",
        isActive: true
      },
      {
        id: "coupon003",
        code: "FREESHIP",
        title: "Free Shipping",
        description: "Free delivery on your order",
        discountType: "fixed",
        discountValue: 5,
        minOrderAmount: 30,
        maxDiscount: 5,
        validFrom: "2024-01-01T00:00:00Z",
        validTo: "2024-12-31T23:59:59Z",
        isActive: true
      }
    ];

    res.json({
      success: true,
      data: coupons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching coupons',
      error: error.message
    });
  }
});

module.exports = router;
