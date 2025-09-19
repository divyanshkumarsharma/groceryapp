const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

const validateProductAddToCart = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  handleValidationErrors
];

const validateAddressUpdate = [
  body('label').notEmpty().withMessage('Address label is required'),
  body('addressLine1').notEmpty().withMessage('Address line 1 is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('country').notEmpty().withMessage('Country is required'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateProductAddToCart,
  validateAddressUpdate
};
