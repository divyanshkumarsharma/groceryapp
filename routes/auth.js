const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');
const { getData, saveData } = require('../utils/dataLoader');

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const users = getData.users();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // For demo purposes, we'll use a simple password check
    // In production, you should hash passwords and compare with bcrypt
    if (password !== 'password123') {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
});

// Register
router.post('/register', (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    const users = getData.users();
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const newUser = {
      id: `user${Date.now()}`,
      name,
      email,
      phone: phone || '',
      address: {
        id: `addr${Date.now()}`,
        label: 'Home',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        coordinates: {
          latitude: 0,
          longitude: 0
        }
      },
      favorites: {
        stores: [],
        products: []
      },
      notifications: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    saveData.users(users);

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          address: newUser.address
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during registration',
      error: error.message
    });
  }
});

// Get current user info
router.get('/me', (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const jwt = require('jsonwebtoken');
    const config = require('../config');
    
    jwt.verify(token, config.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid or expired token'
        });
      }

      const users = getData.users();
      const userData = users.find(u => u.id === user.id);
      
      if (!userData) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          address: userData.address
        }
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user info',
      error: error.message
    });
  }
});

module.exports = router;
