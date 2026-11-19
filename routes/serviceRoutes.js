
const express = require('express');
const router = express.Router();

const {
  addService,
  getMyServices,
  getAllActiveServices,
  updateService,
  toggleServiceStatus,
  deleteService
} = require('../controllers/serviceController');

const {
  protect,
  authorize
} = require('../middleware/authMiddleware');

// Public route: customers can browse active services
router.get('/', getAllActiveServices);

// Provider-only routes
router.use(protect, authorize('provider'));

router.post('/', addService);
router.get('/my-services', getMyServices);
router.patch('/:id/status', toggleServiceStatus);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;
