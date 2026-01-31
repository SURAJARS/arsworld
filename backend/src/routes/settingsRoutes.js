const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const settingsController = require('../controllers/settingsController');

router.get('/', settingsController.getSettings);
// TODO: Re-enable adminAuth after proper admin setup
router.put('/', settingsController.updateSettings);

module.exports = router;
