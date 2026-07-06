import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const setAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOne({ email: 'salauddinkaderappy@gmail.com' });
    
    if (!user) {
      console.log('User not found! Creating new admin user...');
      
      // Create admin user
      const adminUser = await User.create({
        name: 'Salah Uddin Kader',
        email: 'salauddinkaderappy@gmail.com',
        password: 'admin123', // Change this after first login!
        isAdmin: true,
        currentPlan: 'plan-vip'
      });
      
      console.log('Admin user created successfully!');
      console.log('Email: salauddinkaderappy@gmail.com');
      console.log('Password: admin123');
      console.log('isAdmin: true');
    } else {
      user.isAdmin = true;
      await user.save();
      console.log(`User "${user.name}" (${user.email}) is now an ADMIN!`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

setAdmin();
