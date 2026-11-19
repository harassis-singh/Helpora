const express = require('express');
const router = express.Router();

const {
  getProviderProfile,
  updateProviderProfile
} = require('../controllers/providerController');

const {
  protect,
  authorize
} = require('../middleware/authMiddleware');

// Only logged-in providers can access these routes
router.use(protect, authorize('provider'));

// Get provider profile
router.get('/profile', getProviderProfile);

// Update provider profile
router.put('/profile', updateProviderProfile);

module.exports = router;