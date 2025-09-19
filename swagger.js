const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Grocery App API',
      version: '1.0.0',
      description: 'A comprehensive API for grocery delivery application',
      contact: {
        name: 'Grocery App Team',
        email: 'support@groceryapp.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            address: { $ref: '#/components/schemas/Address' },
            favorites: { $ref: '#/components/schemas/Favorites' },
            notifications: { type: 'array', items: { $ref: '#/components/schemas/Notification' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Address: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            label: { type: 'string' },
            addressLine1: { type: 'string' },
            addressLine2: { type: 'string' },
            city: { type: 'string' },
            country: { type: 'string' },
            coordinates: {
              type: 'object',
              properties: {
                latitude: { type: 'number' },
                longitude: { type: 'number' }
              }
            }
          }
        },
        Favorites: {
          type: 'object',
          properties: {
            stores: { type: 'array', items: { type: 'string' } },
            products: { type: 'array', items: { type: 'string' } }
          }
        },
        Notification: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            message: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' },
            read: { type: 'boolean' },
            type: { type: 'string' }
          }
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            brand: { type: 'string' },
            category: { type: 'string' },
            subcategory: { type: 'string' },
            imageUrl: { type: 'string' },
            currentPrice: { type: 'number' },
            originalPrice: { type: 'number' },
            discountPercentage: { type: 'number' },
            currency: { type: 'string' },
            unit: { type: 'string' },
            isSuperSaver: { type: 'boolean' },
            isPopular: { type: 'boolean' },
            rating: { type: 'number' },
            reviewCount: { type: 'number' },
            description: { type: 'string' },
            inStock: { type: 'boolean' },
            stockQuantity: { type: 'number' },
            tags: { type: 'array', items: { type: 'string' } }
          }
        },
        Store: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            type: { type: 'string' },
            logoUrl: { type: 'string' },
            rating: { type: 'number' },
            reviewCount: { type: 'string' },
            distanceKm: { type: 'number' },
            deliveryTimeMins: { type: 'string' },
            deliveryFeeKd: { type: 'number' },
            isFavorite: { type: 'boolean' },
            promotions: { type: 'array', items: { $ref: '#/components/schemas/Promotion' } },
            address: { type: 'string' },
            phone: { type: 'string' },
            isOpen: { type: 'boolean' },
            operatingHours: { type: 'string' }
          }
        },
        Promotion: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            description: { type: 'string' },
            minSpendKd: { type: 'number' },
            discountPercentage: { type: 'number' },
            appliesTo: { type: 'string' }
          }
        },
        Offer: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            imageUrl: { type: 'string' },
            discountType: { type: 'string' },
            discountValue: { type: 'number' },
            currency: { type: 'string' },
            validFrom: { type: 'string', format: 'date-time' },
            validTo: { type: 'string', format: 'date-time' },
            isActive: { type: 'boolean' },
            isBanner: { type: 'boolean' },
            order: { type: 'number' }
          }
        },
        Brand: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            logoUrl: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            isLoved: { type: 'boolean' },
            productCount: { type: 'number' },
            rating: { type: 'number' },
            actionLink: { type: 'string' }
          }
        },
        CartItem: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            productId: { type: 'string' },
            productName: { type: 'string' },
            productImage: { type: 'string' },
            quantity: { type: 'number' },
            unitPrice: { type: 'number' },
            totalPrice: { type: 'number' },
            currency: { type: 'string' },
            addedAt: { type: 'string', format: 'date-time' }
          }
        },
        Cart: {
          type: 'object',
          properties: {
            items: { type: 'array', items: { $ref: '#/components/schemas/CartItem' } },
            subtotal: { type: 'number' },
            deliveryFee: { type: 'number' },
            total: { type: 'number' },
            currency: { type: 'string' },
            lastUpdated: { type: 'string', format: 'date-time' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            orderNumber: { type: 'string' },
            status: { type: 'string' },
            orderDate: { type: 'string', format: 'date-time' },
            deliveryDate: { type: 'string', format: 'date-time' },
            items: { type: 'array', items: { $ref: '#/components/schemas/CartItem' } },
            subtotal: { type: 'number' },
            deliveryFee: { type: 'number' },
            total: { type: 'number' },
            currency: { type: 'string' },
            deliveryAddress: { $ref: '#/components/schemas/Address' },
            paymentMethod: { type: 'string' },
            paymentStatus: { type: 'string' },
            trackingNumber: { type: 'string' },
            estimatedDelivery: { type: 'string', format: 'date-time' },
            actualDelivery: { type: 'string', format: 'date-time' }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'object' },
            count: { type: 'number' },
            error: { type: 'string' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJSDoc(options);

module.exports = specs;
