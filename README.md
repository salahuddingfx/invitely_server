# Invitely - Server

Backend API server for the Invitely invitation management platform. Built with Node.js, Express, and MongoDB.

## Features

- JWT-based authentication and authorization
- User registration, login, and password management
- Invitation CRUD operations with template support
- File uploads via Cloudinary (images, audio, documents)
- Payment processing with Stripe
- Admin dashboard APIs (user management, payments, analytics)
- Email notifications via Nodemailer
- Role-based access control (User, Admin)
- CORS configuration for frontend integration

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens) + bcrypt
- **File Upload:** Multer + Cloudinary
- **Email:** Nodemailer
- **Payment:** Stripe API

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or Atlas)
- Cloudinary account
- Stripe account

### Installation

```bash
git clone https://github.com/salahuddingfx/invitely_server.git
cd invitely_server
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Email
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
FROM_EMAIL=noreply@invitely.com
FROM_NAME=Invitely
```

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

### Seed Database

```bash
npm run seed
```

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration (DB, Cloudinary, env, mail)
│   ├── controllers/     # Route handlers
│   ├── middlewares/      # Auth & upload middlewares
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── app.js           # Express app setup
│   ├── server.js        # Server entry point
│   ├── seed.js          # Database seeder
│   └── reset-user.js    # User reset utility
├── .env.example
└── package.json
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update profile
- `PUT /api/auth/update-password` - Update password

### Invitations
- `POST /api/invitations` - Create invitation
- `GET /api/invitations` - Get all user invitations
- `GET /api/invitations/:id` - Get invitation by ID
- `PUT /api/invitations/:id` - Update invitation
- `DELETE /api/invitations/:id` - Delete invitation
- `GET /api/invitations/public/:slug` - Public invitation view

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/payments` - Get all payments
- `PUT /api/admin/users/:id` - Update user status

### Payments
- `POST /api/payments/create-checkout-session` - Create Stripe session
- `POST /api/payments/webhook` - Stripe webhook

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the **GNU Affero General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

## Security

See [SECURITY.md](SECURITY.md) for reporting vulnerabilities.

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Author

**Salah Uddin Kader** - [GitHub](https://github.com/salahuddingfx)
