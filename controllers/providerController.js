const User = require('../models/User');

// GET PROVIDER PROFILE
const getProviderProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || user.role !== 'provider') {
      return res.status(404).json({
        message: 'Provider not found'
      });
    }

    res.status(200).json({
      message: 'Profile fetched successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Get provider profile error:', error);
    res.status(500).json({
      message: 'Server error while fetching profile'
    });
  }
};

// UPDATE PROVIDER PROFILE
const updateProviderProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: 'Name is required'
      });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user._id, role: 'provider' },
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'Provider not found'
      });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });

  } catch (error) {
    console.error('Update provider profile error:', error);
    res.status(500).json({
      message: 'Server error while updating profile'
    });
  }
};

module.exports = {
  getProviderProfile,
  updateProviderProfile
};