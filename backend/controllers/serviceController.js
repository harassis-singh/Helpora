
const Service = require('../models/Service');

// Add a new service
const addService = async (req, res) => {
  try {
    const { title, category, description, price, location } = req.body;

    if (!title || !category || !description || price === undefined || !location) {
      return res.status(400).json({
        message: 'Please fill in all required fields'
      });
    }

    const service = await Service.create({
      provider: req.user.id,
      title,
      category,
      description,
      price,
      location
    });

    res.status(201).json({
      message: 'Service added successfully',
      service
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get services belonging to the logged-in provider
const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({
      provider: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: services.length,
      services
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all active services for customers (public)
const getAllActiveServices = async (req, res) => {
  try {
    const services = await Service.find({
      isActive: true
    })
      .populate('provider', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: services.length,
      services
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service
const updateService = async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      {
        _id: req.params.id,
        provider: req.user.id
      },
      req.body,
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
    res.status(500).json({ message: error.message });
  }
};

// Activate or deactivate a service
const toggleServiceStatus = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      provider: req.user.id
    });

    if (!service) {
      return res.status(404).json({
        message: 'Service not found'
      });
    }

    service.isActive = !service.isActive;
    await service.save();

    res.status(200).json({
      message: service.isActive
        ? 'Service activated successfully'
        : 'Service deactivated successfully',
      service
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findOneAndDelete({
      _id: req.params.id,
      provider: req.user.id
    });

    if (!service) {
      return res.status(404).json({
        message: 'Service not found'
      });
    }

    res.status(200).json({
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addService,
  getMyServices,
  getAllActiveServices,
  updateService,
  toggleServiceStatus,
  deleteService
};
