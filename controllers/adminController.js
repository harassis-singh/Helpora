
const User = require('../models/User');
const Service = require('../models/Service');

// ADMIN DASHBOARD
const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProviders = await User.countDocuments({ role: 'provider' });
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalServices = await Service.countDocuments();

    res.status(200).json({
      message: 'Admin dashboard data fetched successfully',
      statistics: {
        totalUsers,
        totalProviders,
        totalCustomers,
        totalServices
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      message: 'Server error while fetching dashboard data'
    });
  }
};

// GET ALL PROVIDERS
const getAllProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: 'provider' })
      .select('name email isActive createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Providers fetched successfully',
      providers
    });
  } catch (error) {
    console.error('Get providers error:', error);
    res.status(500).json({
      message: 'Server error while fetching providers'
    });
  }
};

// ACTIVATE / DEACTIVATE PROVIDER
const toggleProviderStatus = async (req, res) => {
  try {
    const provider = await User.findOne({
      _id: req.params.id,
      role: 'provider'
    });

    if (!provider) {
      return res.status(404).json({
        message: 'Provider not found'
      });
    }

    provider.isActive = !provider.isActive;
    await provider.save();

    res.status(200).json({
      message: `Provider ${provider.isActive ? 'activated' : 'deactivated'} successfully`,
      provider: {
        id: provider._id,
        name: provider.name,
        email: provider.email,
        isActive: provider.isActive
      }
    });
  } catch (error) {
    console.error('Toggle provider status error:', error);
    res.status(500).json({
      message: 'Server error while updating provider status'
    });
  }
};

// GET ALL USERS (CUSTOMERS AND PROVIDERS)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ['customer', 'provider'] }
    })
      .select('name email role isActive createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Users fetched successfully',
      users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      message: 'Server error while fetching users'
    });
  }
};

// ACTIVATE / DEACTIVATE USER
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      role: { $in: ['customer', 'provider'] }
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({
      message: 'Server error while updating user status'
    });
  }
};

// GET ALL SERVICES
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate('provider', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Services fetched successfully',
      services
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      message: 'Server error while fetching services'
    });
  }
};


 // ACTIVATE / DEACTIVATE SERVICE
const toggleServiceStatus = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: 'Service not found'
      });
    }

    service.isActive = !service.isActive;
    await service.save();

    res.status(200).json({
      message: `Service ${service.isActive ? 'activated' : 'deactivated'} successfully`,
      service
    });
  } catch (error) {
    console.error('Toggle service status error:', error);
    res.status(500).json({
      message: 'Server error while updating service status'
    });
  }
};

// UPDATE SERVICE
const updateService = async (req, res) => {
  try {
    const { title, category, price, location, description } = req.body;

    if (!title || !category || price === undefined || !location) {
      return res.status(400).json({
        message: 'Title, category, price and location are required'
      });
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        category: category.trim(),
        price,
        location: location.trim(),
        description: description || ''
      },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        message: 'Service not found'
      });
    }

    res.status(200).json({
      message: 'Service updated successfully',
      service
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      message: 'Server error while updating service'
    });
  }
};


// DELETE SERVICE
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: 'Service not found'
      });
    }

    res.status(200).json({
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      message: 'Server error while deleting service'
    });
  }
};

module.exports = {
  getAdminDashboard,
  getAllProviders,
  toggleProviderStatus,
  getAllUsers,
  toggleUserStatus,
  getAllServices,
  toggleServiceStatus,
  updateService,
  deleteService
};