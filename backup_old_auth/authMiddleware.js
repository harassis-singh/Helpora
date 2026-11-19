
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify login token
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized. Please login first.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if (!user || !user.isActive) {
      return res.status(401).json({
        message: 'User not found or account is inactive.'
      });
    }

    req.user = {
      id: user._id.toString(),
      role: user.role
    };

    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token.'
    });
  }
};

// Allow only providers
const providerOnly = (req, res, next) => {
  if (req.user && req.user.role === 'provider') {
    return next();
  }

  return res.status(403).json({
    message: 'Access denied. Provider account required.'
  });
};

module.exports = { protect, providerOnly };
