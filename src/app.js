import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { rateLimit } from 'express-rate-limit';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import invitationRoutes from './routes/invitation.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// Global Security Middlewares
app.use(helmet());
app.use(mongoSanitize());

// Rate Limiter for sensitive Auth routes (Login / Register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 login/register requests per 15 mins
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Middleware stack
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    let statusColor = '\x1b[32m'; // Green (2xx)
    if (res.statusCode >= 300 && res.statusCode < 400) {
      statusColor = '\x1b[36m'; // Cyan (3xx)
    } else if (res.statusCode >= 400 && res.statusCode < 500) {
      statusColor = '\x1b[33m'; // Yellow (4xx)
    } else if (res.statusCode >= 500) {
      statusColor = '\x1b[31m'; // Red (5xx)
    }
    const resetColor = '\x1b[0m';
    const methodColor = '\x1b[35m'; // Magenta
    const pathColor = '\x1b[34m'; // Blue
    
    console.log(
      `[${new Date().toLocaleTimeString()}] ${methodColor}${req.method.padEnd(6)}${resetColor} ${pathColor}${req.originalUrl}${resetColor} ${statusColor}${res.statusCode}${resetColor} (${duration}ms)`
    );
  });
  next();
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/upload', uploadRoutes); // Fallback for singular endpoint
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
