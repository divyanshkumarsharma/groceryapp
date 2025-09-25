const swaggerDefinition = {
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
      url: 'http://125.63.73.60:3002/api',
      description: 'Production server'
    },
    {
      url: 'http://localhost:3000/api',
      description: 'Development server'
    },
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Development server v1 API'
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
  paths: {
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'User Login',
        description: 'Authenticate user with email and password',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'mohammed@example.com' },
                  password: { type: 'string', example: 'password123' }
                },
                required: ['email', 'password']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Invalid credentials'
          }
        }
      }
    },
    '/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'User Registration',
        description: 'Register a new user account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'John Doe' },
                  email: { type: 'string', example: 'john@example.com' },
                  password: { type: 'string', example: 'password123' },
                  phone: { type: 'string', example: '+1234567890' }
                },
                required: ['name', 'email', 'password']
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '409': {
            description: 'User already exists'
          }
        }
      }
    },
    '/auth/me': {
      get: {
        tags: ['Authentication'],
        summary: 'Get Current User',
        description: 'Get current user information',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'User information retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'Get All Products',
        description: 'Retrieve a list of all products with optional filters',
        parameters: [
          {
            name: 'category',
            in: 'query',
            description: 'Filter by category',
            schema: { type: 'string' }
          },
          {
            name: 'brand',
            in: 'query',
            description: 'Filter by brand',
            schema: { type: 'string' }
          },
          {
            name: 'search',
            in: 'query',
            description: 'Search products',
            schema: { type: 'string' }
          },
          {
            name: 'popular',
            in: 'query',
            description: 'Filter popular products',
            schema: { type: 'boolean' }
          },
          {
            name: 'superSaver',
            in: 'query',
            description: 'Filter super saver products',
            schema: { type: 'boolean' }
          }
        ],
        responses: {
          '200': {
            description: 'Products retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/products/popular': {
      get: {
        tags: ['Products'],
        summary: 'Get Popular Products',
        description: 'Retrieve a list of popular products',
        responses: {
          '200': {
            description: 'Popular products retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/products/super-saver': {
      get: {
        tags: ['Products'],
        summary: 'Get Super Saver Products',
        description: 'Retrieve a list of super saver products',
        responses: {
          '200': {
            description: 'Super saver products retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Get Product by ID',
        description: 'Retrieve a specific product by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Product ID',
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Product retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '404': {
            description: 'Product not found'
          }
        }
      }
    },
    '/stores': {
      get: {
        tags: ['Stores'],
        summary: 'Get All Stores',
        description: 'Retrieve a list of all stores with optional filters',
        parameters: [
          {
            name: 'search',
            in: 'query',
            description: 'Search stores',
            schema: { type: 'string' }
          },
          {
            name: 'type',
            in: 'query',
            description: 'Filter by store type',
            schema: { type: 'string' }
          },
          {
            name: 'isOpen',
            in: 'query',
            description: 'Filter by open status',
            schema: { type: 'boolean' }
          }
        ],
        responses: {
          '200': {
            description: 'Stores retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/offers': {
      get: {
        tags: ['Offers'],
        summary: 'Get All Offers',
        description: 'Retrieve a list of all offers with optional filters',
        parameters: [
          {
            name: 'category',
            in: 'query',
            description: 'Filter by category',
            schema: { type: 'string' }
          },
          {
            name: 'active',
            in: 'query',
            description: 'Filter active offers',
            schema: { type: 'boolean' }
          },
          {
            name: 'banner',
            in: 'query',
            description: 'Filter banner offers',
            schema: { type: 'boolean' }
          }
        ],
        responses: {
          '200': {
            description: 'Offers retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/offers/banners': {
      get: {
        tags: ['Offers'],
        summary: 'Get Banner Offers',
        description: 'Retrieve banner offers for display',
        responses: {
          '200': {
            description: 'Banner offers retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/brands/loved': {
      get: {
        tags: ['Brands'],
        summary: 'Get Loved Brands',
        description: 'Retrieve most loved brands',
        responses: {
          '200': {
            description: 'Loved brands retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/cart': {
      get: {
        tags: ['Cart'],
        summary: 'Get User Cart',
        description: 'Retrieve user shopping cart',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Cart retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/cart/add': {
      post: {
        tags: ['Cart'],
        summary: 'Add Product to Cart',
        description: 'Add a product to the shopping cart',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  productId: { type: 'string', example: 'prod001' },
                  quantity: { type: 'number', example: 1 }
                },
                required: ['productId', 'quantity']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Product added to cart successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '404': {
            description: 'Product not found'
          }
        }
      }
    },
    '/orders': {
      get: {
        tags: ['Orders'],
        summary: 'Get User Orders',
        description: 'Retrieve user order history',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Orders retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/user/profile': {
      get: {
        tags: ['User'],
        summary: 'Get User Profile',
        description: 'Retrieve user profile information',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Profile retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/user/address': {
      get: {
        tags: ['User'],
        summary: 'Get User Address',
        description: 'Retrieve user delivery address',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Address retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized'
          }
        }
      },
      put: {
        tags: ['User'],
        summary: 'Update User Address',
        description: 'Update user delivery address',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  label: { type: 'string', example: 'Home' },
                  addressLine1: { type: 'string', example: '123 Main St' },
                  addressLine2: { type: 'string', example: 'Apt 4B' },
                  city: { type: 'string', example: 'New York' },
                  country: { type: 'string', example: 'USA' },
                  coordinates: {
                    type: 'object',
                    properties: {
                      latitude: { type: 'number', example: 40.7128 },
                      longitude: { type: 'number', example: -74.0060 }
                    }
                  }
                },
                required: ['label', 'addressLine1', 'city', 'country']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Address updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized'
          }
        }
      }
    },
    // New v1 API endpoints
    '/v1/config': {
      get: {
        tags: ['Configuration'],
        summary: 'Get App Configuration',
        description: 'Returns app configuration including default location and app details',
        responses: {
          '200': {
            description: 'Configuration retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/config/get-zone-id': {
      get: {
        tags: ['Configuration'],
        summary: 'Get Zone Information',
        description: 'Validates if location is in service area and returns zone details',
        parameters: [
          {
            name: 'latitude',
            in: 'header',
            required: true,
            description: 'Latitude coordinate',
            schema: { type: 'string', example: '29.9727388' }
          },
          {
            name: 'longitude',
            in: 'header',
            required: true,
            description: 'Longitude coordinate',
            schema: { type: 'string', example: '31.2360419' }
          }
        ],
        responses: {
          '200': {
            description: 'Zone information retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/stores/get-stores': {
      get: {
        tags: ['Stores'],
        summary: 'Get Stores with Filtering',
        description: 'Returns stores with optional filtering by search, type, and open status',
        parameters: [
          {
            name: 'search',
            in: 'query',
            description: 'Search term for store name or type',
            schema: { type: 'string' }
          },
          {
            name: 'type',
            in: 'query',
            description: 'Filter by store type',
            schema: { type: 'string' }
          },
          {
            name: 'isOpen',
            in: 'query',
            description: 'Filter by open status (true/false)',
            schema: { type: 'string' }
          },
          {
            name: 'offset',
            in: 'query',
            description: 'Number of records to skip',
            schema: { type: 'integer', default: 0 }
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of records to return',
            schema: { type: 'integer', default: 10 }
          }
        ],
        responses: {
          '200': {
            description: 'Stores retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/stores/popular': {
      get: {
        tags: ['Stores'],
        summary: 'Get Popular Stores',
        description: 'Returns stores sorted by popularity (rating and review count)',
        responses: {
          '200': {
            description: 'Popular stores retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/stores/latest': {
      get: {
        tags: ['Stores'],
        summary: 'Get Latest Stores',
        description: 'Returns newest stores added to the platform',
        responses: {
          '200': {
            description: 'Latest stores retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/stores/top-offer-near-me': {
      get: {
        tags: ['Stores'],
        summary: 'Get Stores with Top Offers',
        description: 'Returns stores with best promotional offers',
        responses: {
          '200': {
            description: 'Top offer stores retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Get All Categories',
        description: 'Returns all service categories (Grocery, Pharmacy, Shop, Food, Parcel)',
        responses: {
          '200': {
            description: 'Categories retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/categories/popular': {
      get: {
        tags: ['Categories'],
        summary: 'Get Popular Categories',
        description: 'Returns most popular categories based on usage',
        responses: {
          '200': {
            description: 'Popular categories retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/banners': {
      get: {
        tags: ['Banners'],
        summary: 'Get Promotional Banners',
        description: 'Returns promotional banners for the home screen',
        responses: {
          '200': {
            description: 'Banners retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/other-banners': {
      get: {
        tags: ['Banners'],
        summary: 'Get Promotional Content Banners',
        description: 'Returns additional promotional content banners',
        responses: {
          '200': {
            description: 'Promotional banners retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/campaigns/basic': {
      get: {
        tags: ['Campaigns'],
        summary: 'Get Basic Campaigns',
        description: 'Returns basic promotional campaigns',
        responses: {
          '200': {
            description: 'Basic campaigns retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/items/popular': {
      get: {
        tags: ['Items'],
        summary: 'Get Popular Items',
        description: 'Returns most popular items based on sales and ratings',
        responses: {
          '200': {
            description: 'Popular items retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/items/latest': {
      get: {
        tags: ['Items'],
        summary: 'Get Latest Items',
        description: 'Returns newest items added to the platform',
        responses: {
          '200': {
            description: 'Latest items retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/items/most-reviewed': {
      get: {
        tags: ['Items'],
        summary: 'Get Most Reviewed Items',
        description: 'Returns items with the highest number of reviews',
        responses: {
          '200': {
            description: 'Most reviewed items retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/items/recommended': {
      get: {
        tags: ['Items'],
        summary: 'Get Recommended Items',
        description: 'Returns personalized recommended items for the user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Recommended items retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Authentication required'
          }
        }
      }
    },
    '/v1/items/discounted': {
      get: {
        tags: ['Items'],
        summary: 'Get Discounted Items',
        description: 'Returns items with discounts and special offers',
        responses: {
          '200': {
            description: 'Discounted items retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/coupon/list': {
      get: {
        tags: ['Coupons'],
        summary: 'Get Available Coupons',
        description: 'Returns available coupons for the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Coupons retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Authentication required'
          }
        }
      }
    },
    '/v1/customer/info': {
      get: {
        tags: ['Customer'],
        summary: 'Get User Information',
        description: 'Returns user profile information including wallet balance',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'User information retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Authentication required'
          },
          '404': {
            description: 'User not found'
          }
        }
      }
    },
    '/v1/customer/notifications': {
      get: {
        tags: ['Customer'],
        summary: 'Get User Notifications',
        description: 'Returns user notifications with proper formatting',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Notifications retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Authentication required'
          },
          '404': {
            description: 'User not found'
          }
        }
      }
    },
    '/v1/customer/address/list': {
      get: {
        tags: ['Customer'],
        summary: 'Get User Address List',
        description: 'Returns list of user saved addresses',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Address list retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Authentication required'
          },
          '404': {
            description: 'User not found'
          }
        }
      }
    },
    '/v1/module': {
      get: {
        tags: ['Modules'],
        summary: 'Get Available Modules',
        description: 'Returns available service modules',
        responses: {
          '200': {
            description: 'Modules retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/v1/flutter-landing-page': {
      get: {
        tags: ['Landing'],
        summary: 'Get Landing Page Data',
        description: 'Returns landing page content and features',
        responses: {
          '200': {
            description: 'Landing page data retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    }
  }
};

module.exports = swaggerDefinition;
