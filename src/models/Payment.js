import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    planId: {
      type: String,
      required: true,
      enum: ['plan-free', 'plan-premium', 'plan-vip']
    },
    planName: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'BDT'
    },
    method: {
      type: String,
      required: true,
      enum: ['bkash', 'nagad']
    },
    senderPhone: {
      type: String,
      required: true
    },
    transactionId: {
      type: String,
      required: true,
      unique: true
    },
    screenshotUrl: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: {
      type: Date
    },
    rejectionReason: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

paymentSchema.index({ userId: 1 });
paymentSchema.index({ status: 1 });
// transactionId already indexed via unique: true in schema

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
