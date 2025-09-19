# Grocery App Backend API

A comprehensive Node.js backend API for the Grocery App, built with Express.js and featuring JWT authentication, Swagger documentation, and JSON file-based data storage.

## Features

- 🔐 JWT Authentication & Authorization
- 📚 Complete Swagger API Documentation
- 🛒 Shopping Cart Management
- 📦 Order Management
- 🏪 Store Management
- 🛍️ Product Management
- 🎯 Offers & Promotions
- 🏷️ Brand Management
- 👤 User Profile Management
- 📍 Address Management
- 🔔 Notifications System
- 📊 Rate Limiting & Security

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user info

### User Management
- `GET /api/user/profile` - Get user profile
- `GET /api/user/address` - Get user address
- `PUT /api/user/address` - Update user address
- `GET /api/user/favorites` - Get user favorites
- `GET /api/user/notifications` - Get user notifications
- `PUT /api/user/notifications/:id/read` - Mark notification as read

### Products
- `GET /api/products` - Get all products
- `GET /api/products/popular` - Get popular products
- `GET /api/products/super-saver` - Get super saver products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search/:query` - Search products

### Stores
- `GET /api/stores` - Get all stores
- `GET /api/stores/:id` - Get store by ID
- `POST /api/stores/:id/favorite` - Toggle store favorite
- `GET /api/stores/favorites/user` - Get user's favorite stores

### Offers
- `GET /api/offers` - Get all offers
- `GET /api/offers/banners` - Get banner offers
- `GET /api/offers/:id` - Get offer by ID

### Brands
- `GET /api/brands` - Get all brands
- `GET /api/brands/loved` - Get loved brands
- `GET /api/brands/:id` - Get brand by ID

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add product to cart
- `PUT /api/cart/items/:id` - Update cart item quantity
- `DELETE /api/cart/items/:id` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/cancel` - Cancel order

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. The API will be available at `http://localhost:3000`

## API Documentation

Once the server is running, you can access the Swagger UI documentation at:
`http://localhost:3000/api-docs`

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## Data Storage

The application uses JSON files for data storage located in the `data/` directory:

- `users.json` - User accounts and profiles
- `products.json` - Product catalog
- `stores.json` - Store information
- `offers.json` - Promotional offers
- `brands.json` - Brand information
- `cart.json` - Shopping cart data
- `orders.json` - Order history

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes per IP)
- CORS protection
- Helmet.js security headers
- Input validation with express-validator
- Request logging with Morgan

## Demo Credentials

For testing purposes, you can use these demo credentials:

- **Email:** mohammed@example.com
- **Password:** password123

## API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "count": 10
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Development

- **Framework:** Express.js
- **Authentication:** JWT
- **Documentation:** Swagger UI
- **Validation:** express-validator
- **Security:** Helmet, CORS, Rate Limiting
- **Logging:** Morgan
- **Data Storage:** JSON files

## License

MIT License
