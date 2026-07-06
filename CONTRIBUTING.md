# Contributing to Invitely Server

Thank you for your interest in contributing to Invitely Server! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Branch Naming](#branch-naming)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [API Guidelines](#api-guidelines)
- [License](#license)

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/invitely_server.git
   ```
3. Set up the upstream remote:
   ```bash
   git remote add upstream https://github.com/salahuddingfx/invitely_server.git
   ```

## How to Contribute

### Reporting Bugs

- Check existing issues to avoid duplicates
- Create a new issue with a clear title and description
- Include steps to reproduce the bug
- Provide error logs if applicable
- Mention your environment (OS, Node version, MongoDB version)

### Suggesting Features

- Open an issue with the `enhancement` label
- Describe the feature and its use case
- Explain why it would be valuable

### Submitting Code

- Pick an issue or create one first
- Comment on the issue to claim it
- Follow the development setup below
- Create a pull request when ready

## Development Setup

```bash
# Clone your fork
git clone https://github.com/<your-username>/invitely_server.git
cd invitely_server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env
# Edit .env with your credentials

# Start MongoDB (if local)
mongod

# Seed the database
npm run seed

# Start development server
npm run dev
```

### Required Environment Variables

Make sure you have the following set up:

- MongoDB connection string
- JWT secret
- Cloudinary credentials
- Stripe API keys
- SMTP credentials for email

## Branch Naming

Use descriptive branch names:

- `feature/payment-integration` - New features
- `bugfix/auth-token-refresh` - Bug fixes
- `docs/api-documentation` - Documentation updates
- `refactor/controller-logic` - Code refactoring
- `test/auth-middleware` - Adding tests

## Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(payment): add Stripe webhook handler
fix(auth): resolve JWT expiration edge case
docs(readme): update environment variables guide
```

## Pull Request Process

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test thoroughly

3. **Commit your changes** with a clear message

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub:
   - Use a descriptive title
   - Reference the related issue (e.g., `Closes #42`)
   - Describe what changes were made and why
   - Include API documentation if adding new endpoints

6. **Wait for review** - Address any feedback

## Coding Standards

### JavaScript/Node.js

- Use ES modules (import/export)
- Use async/await for asynchronous operations
- Handle errors with proper try-catch blocks
- Use meaningful variable and function names
- Follow existing code structure

### Express

- Use route controllers for business logic
- Use middleware for cross-cutting concerns
- Return consistent JSON response format
- Use proper HTTP status codes
- Validate request bodies

### MongoDB/Mongoose

- Define clear schemas with validation
- Use indexes for query performance
- Avoid N+1 query problems
- Use projections to limit returned fields

### General

- Write clean, readable code
- Add comments for complex logic
- Follow existing naming conventions
- Keep functions small and focused
- Avoid code duplication

## API Guidelines

### Response Format

Use consistent response format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed"
}
```

Error format:

```json
{
  "success": false,
  "error": "Error message"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Authentication

- All protected routes require `Authorization: Bearer <token>` header
- Admin routes require admin role
- Public routes should be explicitly marked

## Questions?

If you have questions, feel free to open an issue or reach out to **Salah Uddin Kader**.

Thank you for contributing to Invitely Server!
