
const Request = require('../models/Request');
const Service = require('../models/Service');

// CREATE SERVICE REQUEST (CUSTOMER)
const createServiceRequest = async (req, res) => {
  try {
    const { serviceId, message, requestedDate } = req.body;

    if (!serviceId || !requestedDate) {
      return res.status(400).json({
        message: 'Service and requested date are required'
      });
    }

    const service = await Service.findById(serviceId);

    if (!service || !service.isActive) {
      return res.status(404).json({
        message: 'Service not found or currently unavailable'
      });
    }

    if (service.provider.toString() === req.user.id) {
      return res.status(400).json({
        message: 'You cannot request your own service'
      });
    }

    const date = new Date(requestedDate);

    if (Number.isNaN(date.getTime()) || date <= new Date()) {
      return res.status(400).json({
        message: 'Please select a valid future date'
      });
    }

    const request = await Request.create({
      customer: req.user.id,
      provider: service.provider,
      service: service._id,
      message: message || '',
      requestedDate: date
    });

    res.status(201).json({
      message: 'Service request submitted successfully',
      request
    });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({
      message: 'Server error while submitting request'
    });
  }
};

// GET ALL REQUESTS FOR LOGGED-IN PROVIDER
const getProviderRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      provider: req.user.id
    })
      .populate('customer', 'name email')
      .populate('service', 'title category price location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Requests fetched successfully',
      requests
    });
  } catch (error) {
    console.error('Get provider requests error:', error);
    res.status(500).json({
      message: 'Server error while fetching requests'
    });
  }
};

// GET ALL REQUESTS FOR LOGGED-IN CUSTOMER
const getCustomerRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      customer: req.user.id
    })
      .populate('provider', 'name email')
      .populate('service', 'title category price location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Customer requests fetched successfully',
      requests
    });
  } catch (error) {
    console.error('Get customer requests error:', error);
    res.status(500).json({
      message: 'Server error while fetching customer requests'
    });
  }
};

// UPDATE REQUEST STATUS
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ['Accepted', 'Rejected', 'Completed'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid request status'
      });
    }

    const request = await Request.findOne({
      _id: req.params.id,
      provider: req.user.id
    });

    if (!request) {
      return res.status(404).json({
        message: 'Request not found'
      });
    }

    if (request.status === 'Rejected' || request.status === 'Completed') {
      return res.status(400).json({
        message: 'This request can no longer be updated'
      });
    }

    if (request.status === 'Accepted' && status !== 'Completed') {
      return res.status(400).json({
        message: 'An accepted request can only be marked as completed'
      });
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      message: `Request ${status.toLowerCase()} successfully`,
      request
    });
  } catch (error) {
    console.error('Update request status error:', error);
    res.status(500).json({
      message: 'Server error while updating request'
    });
  }
};

module.exports = {
  createServiceRequest,
  getProviderRequests,
  getCustomerRequests,
  updateRequestStatus
};
