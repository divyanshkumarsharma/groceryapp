const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/v1/module:
 *   get:
 *     summary: Get available modules
 *     description: Returns available service modules
 *     tags: [Modules]
 *     responses:
 *       200:
 *         description: Modules retrieved successfully
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
 *                         example: "module001"
 *                       name:
 *                         type: string
 *                         example: "Food Delivery"
 *                       type:
 *                         type: string
 *                         example: "food"
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       icon:
 *                         type: string
 *                         example: "food_icon.png"
 *       500:
 *         description: Internal server error
 */
router.get('/', (req, res) => {
  try {
    const modules = [
      {
        id: "module001",
        name: "Food Delivery",
        type: "food",
        isActive: true,
        icon: "food_icon.png"
      },
      {
        id: "module002",
        name: "Grocery Delivery",
        type: "grocery",
        isActive: true,
        icon: "grocery_icon.png"
      },
      {
        id: "module003",
        name: "Pharmacy",
        type: "pharmacy",
        isActive: true,
        icon: "pharmacy_icon.png"
      },
      {
        id: "module004",
        name: "Parcel Delivery",
        type: "parcel",
        isActive: true,
        icon: "parcel_icon.png"
      },
      {
        id: "module005",
        name: "Shop",
        type: "shop",
        isActive: true,
        icon: "shop_icon.png"
      }
    ];

    res.json({
      success: true,
      data: modules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching modules',
      error: error.message
    });
  }
});

module.exports = router;
