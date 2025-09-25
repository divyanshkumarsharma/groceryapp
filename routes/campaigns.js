const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/v1/campaigns/basic:
 *   get:
 *     summary: Get basic campaigns
 *     description: Returns basic promotional campaigns
 *     tags: [Campaigns]
 *     responses:
 *       200:
 *         description: Basic campaigns retrieved successfully
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
 *                         example: "campaign001"
 *                       title:
 *                         type: string
 *                         example: "Flash Sale"
 *                       description:
 *                         type: string
 *                         example: "Limited time offers"
 *                       discountPercentage:
 *                         type: number
 *                         example: 20
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
 *       500:
 *         description: Internal server error
 */
router.get('/basic', (req, res) => {
  try {
    const campaigns = [
      {
        id: "campaign001",
        title: "Flash Sale",
        description: "Limited time offers",
        discountPercentage: 20,
        validFrom: "2024-01-01T00:00:00Z",
        validTo: "2024-12-31T23:59:59Z",
        isActive: true
      },
      {
        id: "campaign002",
        title: "New User Welcome",
        description: "Special discount for new customers",
        discountPercentage: 15,
        validFrom: "2024-01-01T00:00:00Z",
        validTo: "2024-12-31T23:59:59Z",
        isActive: true
      },
      {
        id: "campaign003",
        title: "Weekend Special",
        description: "Extra savings on weekends",
        discountPercentage: 25,
        validFrom: "2024-01-01T00:00:00Z",
        validTo: "2024-12-31T23:59:59Z",
        isActive: true
      }
    ];

    res.json({
      success: true,
      data: campaigns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching basic campaigns',
      error: error.message
    });
  }
});

module.exports = router;
