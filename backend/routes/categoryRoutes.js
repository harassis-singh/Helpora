
const express = require('express');
const router = express.Router();

const {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const {
  protect,
  authorize
} = require('../middleware/authMiddleware');

// Only admins can manage categories
router.use(protect, authorize('admin'));

router.post('/', addCategory);
router.get('/', getAllCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
