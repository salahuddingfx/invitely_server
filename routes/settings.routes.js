import express from 'express';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';
import Settings from '../models/Settings.js';

const router = express.Router();

// @route   GET /api/settings
// @desc    Get public settings (plans + payment numbers)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.getInstance();
    res.json({
      success: true,
      data: {
        plans: settings.plans,
        paymentNumbers: settings.paymentNumbers
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/settings
// @desc    Update settings (plans + payment numbers)
// @access  Private/Admin
router.put('/', protect, adminOnly, async (req, res) => {
  try {
    const settings = await Settings.getInstance();

    if (req.body.plans) {
      settings.plans = req.body.plans;
    }
    if (req.body.paymentNumbers) {
      settings.paymentNumbers = req.body.paymentNumbers;
    }

    await settings.save();

    res.json({
      success: true,
      data: {
        plans: settings.plans,
        paymentNumbers: settings.paymentNumbers
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/settings/plans
// @desc    Update only plans
// @access  Private/Admin
router.put('/plans', protect, adminOnly, async (req, res) => {
  try {
    const settings = await Settings.getInstance();
    settings.plans = req.body.plans;
    await settings.save();

    res.json({
      success: true,
      data: { plans: settings.plans }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/settings/payment-numbers
// @desc    Update only payment numbers
// @access  Private/Admin
router.put('/payment-numbers', protect, adminOnly, async (req, res) => {
  try {
    const settings = await Settings.getInstance();
    settings.paymentNumbers = req.body.paymentNumbers;
    await settings.save();

    res.json({
      success: true,
      data: { paymentNumbers: settings.paymentNumbers }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
