import express from "express";
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const enquiryController = require('../controllers/enquiryController');

router.post('/create', enquiryController.createEnquiry);
// TODO: Re-enable adminAuth after proper admin setup
router.get('/', enquiryController.getEnquiries);
router.put('/:id/status', adminAuth, enquiryController.updateEnquiryStatus);
router.delete('/:id', adminAuth, enquiryController.deleteEnquiry);

module.exports = router;

