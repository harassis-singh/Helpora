
const express = require('express');
const router = express.Router();

const {
  getAdminDashboard,
  getAllProviders,
  toggleProviderStatus,
  getAllUsers,
  toggleUserStatus,
  getAllServices,
  toggleServiceStatus,
  updateService,
  deleteService
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect, authorize('admin'));

router.get('/dashboard', getAdminDashboard);

router.get('/providers', getAllProviders);
router.patch('/providers/:id/status', toggleProviderStatus);

router.get('/users', getAllUsers);
router.patch('/users/:id/status', toggleUserStatus);

router.get('/services', getAllServices);
router.patch('/services/:id/status', toggleServiceStatus);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

module.exports = router;
