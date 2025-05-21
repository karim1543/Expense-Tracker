const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { registerUser, loginUser } = require('../controllers/authController');
const User = require('../models/User');

router.post('/register', [
     body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
], registerUser);
router.post('/login', loginUser);

module.exports = router;