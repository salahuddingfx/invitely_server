import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const resetUser = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/invitely');
    console.log(`Database connected: ${conn.connection.host}`);

    const email = 'salauddinkaderappy@gmail.com';
    const password = 'Salah5537';
    const name = 'Salah Uddin Kader';

    let user = await User.findOne({ email });
    if (user) {
      console.log(`User ${email} already exists. Updating password...`);
      user.password = password;
      await user.save();
      console.log('Password updated successfully!');
    } else {
      console.log(`User ${email} does not exist. Creating new user...`);
      user = await User.create({
        name,
        email,
        password,
        currentPlan: 'plan-premium'
      });
      console.log('User created successfully!');
    }

    console.log('Database user configuration finished!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

resetUser();
