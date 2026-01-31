const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update-language', auth, authController.updateLanguage);
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, authController.updateProfile);

module.exports = router;
