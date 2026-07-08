import express from 'express';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';
import Payment from '../models/Payment.js';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/payments
// @desc    Submit a payment request
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { planId, planName, amount, currency, method, senderPhone, transactionId, screenshotUrl } = req.body;

    // Check if transaction ID already exists
    const existingPayment = await Payment.findOne({ transactionId });
    if (existingPayment) {
      return res.status(400).json({ success: false, message: 'Transaction ID already used' });
    }

    const payment = await Payment.create({
      userId: req.user._id,
      planId,
      planName,
      amount,
      currency: currency || 'BDT',
      method,
      senderPhone,
      transactionId,
      screenshotUrl,
      status: 'pending'
    });

    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/payments/my
// @desc    Get current user's payments
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/payments
// @desc    Get all payments (Admin only)
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    // Check if user is admin (you can add an isAdmin field to User model)
    // For now, we'll allow all authenticated users to see payments (restrict in production)
    
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    
    const payments = await Payment.find(query)
      .populate('userId', 'name email avatar currentPlan')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Payment.countDocuments(query);
    
    res.json({
      success: true,
      data: payments,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/payments/:id
// @desc    Get single payment details
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('userId', 'name email avatar currentPlan');
    
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    
    // Check if user owns this payment or is admin
    if (payment.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/payments/:id/approve
// @desc    Approve a payment (Admin only)
// @access  Private/Admin
router.put('/:id/approve', protect, adminOnly, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    
    if (payment.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Payment already processed' });
    }
    
    // Update payment status
    payment.status = 'approved';
    payment.reviewedBy = req.user._id;
    payment.reviewedAt = new Date();
    await payment.save();
    
    // Update user's plan
    await User.findByIdAndUpdate(payment.userId, {
      currentPlan: payment.planId
    });
    
    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/payments/:id/reject
// @desc    Reject a payment (Admin only)
// @access  Private/Admin
router.put('/:id/reject', protect, adminOnly, async (req, res) => {
  try {
    const { reason } = req.body;
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    
    if (payment.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Payment already processed' });
    }
    
    payment.status = 'rejected';
    payment.reviewedBy = req.user._id;
    payment.reviewedAt = new Date();
    payment.rejectionReason = reason || 'Payment rejected';
    await payment.save();
    
    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/payments/stats/summary
// @desc    Get payment statistics (Admin only)
// @access  Private/Admin
router.get('/stats/summary', protect, adminOnly, async (req, res) => {
  try {
    const totalPayments = await Payment.countDocuments();
    const pendingPayments = await Payment.countDocuments({ status: 'pending' });
    const approvedPayments = await Payment.countDocuments({ status: 'approved' });
    const rejectedPayments = await Payment.countDocuments({ status: 'rejected' });
    
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const monthlyRevenue = await Payment.aggregate([
      { $match: { status: 'approved' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 6 }
    ]);
    
    const paymentMethods = await Payment.aggregate([
      { $group: { _id: '$method', count: { $sum: 1 }, total: { $sum: '$amount' } } }
    ]);
    
    res.json({
      success: true,
      data: {
        totalPayments,
        pendingPayments,
        approvedPayments,
        rejectedPayments,
        totalRevenue: totalRevenue[0]?.total || 0,
        monthlyRevenue,
        paymentMethods
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
