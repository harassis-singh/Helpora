
const express = require('express');
const router = express.Router();

const {
  createServiceRequest,
  getProviderRequests,
  getCustomerRequests,
  updateRequestStatus
} = require('../controllers/requestController');

const { protect, authorize } = require('../middleware/authMiddleware');

// Customer routes
router.post('/', protect, authorize('customer'), createServiceRequest);
router.get('/customer', protect, authorize('customer'), getCustomerRequests);

// Provider routes
router.get('/provider', protect, authorize('provider'), getProviderRequests);
router.patch('/:id/status', protect, authorize('provider'), updateRequestStatus);

module.exports = router;
