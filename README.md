# 01-node-express-auth-api

Production-ready RESTful authentication service built with Node.js, Express, JSON Web Tokens (JWT), and bcrypt password hashing.

## Features
- User registration with salt-hashed passwords
- JWT-based authentication and secure session issuance
- Route protection middleware for private resources
- In-memory mock user persistence layer

## Requirements
- Node.js 18+
- npm 9+

## Environment Setup
Create a `.env` file based on `.env.example`:
```bash
PORT=5000
JWT_SECRET=super_secret_jwt_key_here
JWT_EXPIRES_IN=24h
```

## Running the Application
```bash
npm install
npm run start
```
