const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = 'admin@helpora.com';
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log('Admin account already exists!');
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin12345', 12);

    await User.create({
      name: 'Helpora Admin',
      email,
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin account created successfully!');
    console.log('Email: admin@helpora.com');
    console.log('Password: Admin12345');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();