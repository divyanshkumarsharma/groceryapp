const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/v1/flutter-landing-page:
 *   get:
 *     summary: Get landing page data
 *     description: Returns landing page content and features
 *     tags: [Landing]
 *     responses:
 *       200:
 *         description: Landing page data retrieved successfully
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
 *                     title:
 *                       type: string
 *                       example: "Welcome to Sindbad"
 *                     subtitle:
 *                       type: string
 *                       example: "Your delivery partner"
 *                     features:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             example: "Fast Delivery"
 *                           description:
 *                             type: string
 *                             example: "Get your orders delivered quickly"
 *                           icon:
 *                             type: string
 *                             example: "delivery_icon.png"
 *                     heroImage:
 *                       type: string
 *                       example: "https://example.com/hero_image.jpg"
 *                     ctaButton:
 *                       type: object
 *                       properties:
 *                         text:
 *                           type: string
 *                           example: "Get Started"
 *                         color:
 *                           type: string
 *                           example: "#4CAF50"
 *       500:
 *         description: Internal server error
 */
router.get('/flutter-landing-page', (req, res) => {
  try {
    const landingData = {
      title: "Welcome to Sindbad",
      subtitle: "Your delivery partner",
      features: [
        {
          title: "Fast Delivery",
          description: "Get your orders delivered quickly",
          icon: "delivery_icon.png"
        },
        {
          title: "Fresh Products",
          description: "Quality guaranteed fresh products",
          icon: "fresh_icon.png"
        },
        {
          title: "24/7 Support",
          description: "Round the clock customer support",
          icon: "support_icon.png"
        },
        {
          title: "Easy Payment",
          description: "Multiple secure payment options",
          icon: "payment_icon.png"
        }
      ],
      heroImage: "https://example.com/hero_image.jpg",
      ctaButton: {
        text: "Get Started",
        color: "#4CAF50"
      }
    };

    res.json({
      success: true,
      data: landingData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching landing page data',
      error: error.message
    });
  }
});

module.exports = router;
