import express from 'express';
import cors from 'cors';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import invitationRoutes from './routes/invitation.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// Middleware stack
app.use(cors());
app.use(express.json());

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({ success: true, message: 'Invitely Server API is active' });
});

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`Unhandled error: ${err.stack}`);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

export default app;
