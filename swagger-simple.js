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
    }
  }
};

module.exports = swaggerDefinition;
