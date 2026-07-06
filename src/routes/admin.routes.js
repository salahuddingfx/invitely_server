import express from 'express';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';
import User from '../models/User.js';
import Invitation from '../models/Invitation.js';
import Payment from '../models/Payment.js';

const router = express.Router();

// Apply adminOnly to all routes in this file
router.use(protect, adminOnly);

// @route   GET /api/admin/stats
// @desc    Get dashboard stats
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalInvitations = await Invitation.countDocuments();
    const publishedInvitations = await Invitation.countDocuments({ status: 'published' });
    
    // RSVP stats
    const allInvitations = await Invitation.find();
    const totalRSVPs = allInvitations.reduce((sum, inv) => sum + inv.rsvps.length, 0);
    const attendingRSVPs = allInvitations.reduce(
      (sum, inv) => sum + inv.rsvps.filter((r) => r.status === 'attending').length,
      0
    );
    
    // Payment stats
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
    
    // Plan distribution
    const planDistribution = await User.aggregate([
      { $group: { _id: '$currentPlan', count: { $sum: 1 } } }
    ]);
    
    // Recent activity
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name email avatar currentPlan createdAt');
    const recentPayments = await Payment.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      success: true,
      data: {
        totalUsers,
        totalInvitations,
        publishedInvitations,
        totalRSVPs,
        attendingRSVPs,
        pendingPayments,
        approvedPayments,
        rejectedPayments,
        totalRevenue: totalRevenue[0]?.total || 0,
        monthlyRevenue,
        paymentMethods,
        planDistribution,
        recentUsers,
        recentPayments
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with pagination
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const { search, plan, status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (plan && plan !== 'all') {
      query.currentPlan = plan;
    }
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await User.countDocuments(query);
    
    // Get invitation count for each user
    const usersWithCounts = await Promise.all(
      users.map(async (user) => {
        const invitationCount = await Invitation.countDocuments({ ownerId: user._id });
        return {
          ...user.toObject(),
          invitationCount
        };
      })
    );
    
    res.json({
      success: true,
      data: usersWithCounts,
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

// @route   PUT /api/admin/users/:id/plan
// @desc    Update user plan
// @access  Private/Admin
router.put('/users/:id/plan', async (req, res) => {
  try {
    const { plan } = req.body;
    
    if (!['plan-free', 'plan-premium', 'plan-vip'].includes(plan)) {
      return res.status(400).json({ success: false, message: 'Invalid plan' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { currentPlan: plan },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Delete user's invitations
    await Invitation.deleteMany({ ownerId: req.params.id });
    
    // Delete user
    await User.findByIdAndDelete(req.params.id);
    
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
