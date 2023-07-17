const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /users/profile - Get user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// POST /users/register - Register a new user
router.post('/register', 
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  userController.registerUser
);

// POST /users/login - User login
router.post('/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  userController.loginUser
);

// PUT /users/profile - Update user profile
router.put('/profile', authMiddleware, 
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  ],
  userController.updateUserProfile
);

module.exports = router;
