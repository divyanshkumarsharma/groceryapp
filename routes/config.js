const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/v1/config:
 *   get:
 *     summary: Get app configuration
 *     description: Returns app configuration including default location and app details
 *     tags: [Configuration]
 *     responses:
 *       200:
 *         description: Configuration retrieved successfully
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
 *                     defaultLocation:
 *                       type: object
 *                       properties:
 *                         lat:
 *                           type: string
 *                           example: "29.9727388"
 *                         lng:
 *                           type: string
 *                           example: "31.2360419"
 *                         address:
 *                           type: string
 *                           example: "Maadi Star Towers, Kornish Al Nile, Al Isaweyah, Dar El Salam, Giza Governorate 4220202, Egypt"
 *                     appName:
 *                       type: string
 *                       example: "Sindbad"
 *                     version:
 *                       type: string
 *                       example: "2.12"
 *       500:
 *         description: Internal server error
 */
router.get('/', (req, res) => {
  try {
    const config = {
      defaultLocation: {
        lat: "29.9727388",
        lng: "31.2360419",
        address: "Maadi Star Towers, Kornish Al Nile, Al Isaweyah, Dar El Salam, Giza Governorate 4220202, Egypt"
      },
      appName: "Sindbad",
      version: "2.12"
    };

    res.json({
      success: true,
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching configuration',
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/v1/config/get-zone-id:
 *   get:
 *     summary: Get zone information
 *     description: Validates if location is in service area and returns zone details
 *     tags: [Configuration]
 *     parameters:
 *       - in: header
 *         name: latitude
 *         required: true
 *         schema:
 *           type: string
 *         example: "29.9727388"
 *       - in: header
 *         name: longitude
 *         required: true
 *         schema:
 *           type: string
 *         example: "31.2360419"
 *     responses:
 *       200:
 *         description: Zone information retrieved successfully
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
 *                     zoneId:
 *                       type: integer
 *                       example: 1
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     zoneName:
 *                       type: string
 *                       example: "Maadi Zone"
 *       400:
 *         description: Missing location headers
 *       500:
 *         description: Internal server error
 */
router.get('/get-zone-id', (req, res) => {
  try {
    const latitude = req.headers.latitude;
    const longitude = req.headers.longitude;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude headers are required'
      });
    }

    // Mock zone validation logic
    const zoneData = {
      zoneId: 1,
      isActive: true,
      zoneName: "Maadi Zone"
    };

    res.json({
      success: true,
      data: zoneData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching zone information',
      error: error.message
    });
  }
});

module.exports = router;
