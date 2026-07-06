import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';

const generateToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          currentPlan: user.currentPlan,
          isAdmin: user.isAdmin,
          joinedDate: user.joinedDate,
          token: generateToken(user._id)
        }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          currentPlan: user.currentPlan,
          isAdmin: user.isAdmin,
          joinedDate: user.joinedDate,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          currentPlan: user.currentPlan,
          isAdmin: user.isAdmin,
          joinedDate: user.joinedDate
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.avatar) {
        user.avatar = req.body.avatar;
      }
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.json({
        success: true,
        data: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: updatedUser.avatar,
          currentPlan: updatedUser.currentPlan,
          isAdmin: updatedUser.isAdmin,
          joinedDate: updatedUser.joinedDate,
          token: generateToken(updatedUser._id)
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserPlan = async (req, res) => {
  const { planId } = req.body;
  if (!['plan-free', 'plan-premium', 'plan-vip'].includes(planId)) {
    return res.status(400).json({ success: false, message: 'Invalid plan selected' });
  }

  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.currentPlan = planId;
      const updatedUser = await user.save();
      res.json({
        success: true,
        data: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: updatedUser.avatar,
          currentPlan: updatedUser.currentPlan,
          isAdmin: updatedUser.isAdmin,
          joinedDate: updatedUser.joinedDate
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User with this email not found' });
    }
    // Simple mock success response
    res.json({ success: true, message: `Instructions sent to ${email}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
