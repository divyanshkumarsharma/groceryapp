const express = require('express');
const router = express.Router();
const { getData } = require('../utils/dataLoader');

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     description: Returns all service categories (Grocery, Pharmacy, Shop, Food, Parcel)
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
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
 *                         example: "cat001"
 *                       name:
 *                         type: string
 *                         example: "Grocery"
 *                       icon:
 *                         type: string
 *                         example: "grocery_icon.png"
 *                       description:
 *                         type: string
 *                         example: "Fresh groceries and daily essentials"
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
    const categories = [
      {
        id: "cat001",
        name: "Grocery",
        icon: "grocery_icon.png",
        description: "Fresh groceries and daily essentials",
        isActive: true,
        order: 1
      },
      {
        id: "cat002",
        name: "Pharmacy",
        icon: "pharmacy_icon.png",
        description: "Health and wellness products",
        isActive: true,
        order: 2
      },
      {
        id: "cat003",
        name: "Shop",
        icon: "shop_icon.png",
        description: "General merchandise and household items",
        isActive: true,
        order: 3
      },
      {
        id: "cat004",
        name: "Food",
        icon: "food_icon.png",
        description: "Restaurant food and beverages",
        isActive: true,
        order: 4
      },
      {
        id: "cat005",
        name: "Parcel",
        icon: "parcel_icon.png",
        description: "Package delivery and courier services",
        isActive: true,
        order: 5
      }
    ];

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/v1/categories/popular:
 *   get:
 *     summary: Get popular categories
 *     description: Returns most popular categories based on usage
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Popular categories retrieved successfully
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
 *                         example: "cat001"
 *                       name:
 *                         type: string
 *                         example: "Grocery"
 *                       icon:
 *                         type: string
 *                         example: "grocery_icon.png"
 *                       description:
 *                         type: string
 *                         example: "Fresh groceries and daily essentials"
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       order:
 *                         type: integer
 *                         example: 1
 *                       usageCount:
 *                         type: integer
 *                         example: 1250
 *       500:
 *         description: Internal server error
 */
router.get('/popular', (req, res) => {
  try {
    const popularCategories = [
      {
        id: "cat001",
        name: "Grocery",
        icon: "grocery_icon.png",
        description: "Fresh groceries and daily essentials",
        isActive: true,
        order: 1,
        usageCount: 1250
      },
      {
        id: "cat002",
        name: "Pharmacy",
        icon: "pharmacy_icon.png",
        description: "Health and wellness products",
        isActive: true,
        order: 2,
        usageCount: 890
      },
      {
        id: "cat004",
        name: "Food",
        icon: "food_icon.png",
        description: "Restaurant food and beverages",
        isActive: true,
        order: 4,
        usageCount: 750
      },
      {
        id: "cat003",
        name: "Shop",
        icon: "shop_icon.png",
        description: "General merchandise and household items",
        isActive: true,
        order: 3,
        usageCount: 620
      }
    ];

    res.json({
      success: true,
      data: popularCategories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching popular categories',
      error: error.message
    });
  }
});

module.exports = router;
