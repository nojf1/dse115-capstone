# DSE115 Capstone Project

## Project Overview
Website Title: Timeless Hair Salon

# Features
## User Authentication & Management
```
Registration and login system
Profile management
Password reset functionality
Role-based access control
```

## Services
```
Browse available salon services
Service details and pricing
Admin service management
```

## Appointments
```
Schedule appointments
Select preferred stylists
View upcoming appointments
Cancel bookings
```

## Products
```
Browse hair care products
View product details
Add products to cart
Purchase process
```

## Shopping Cart
```
Add/remove items
Update quantities
Calculate totals
Checkout (simulated)
```

## Gallery
```
View salon's hairstyles 
```

# Technologies
## Frontend
React 18 with TypeScript
Vite for fast development experience
React Router for navigation
Bootstrap 5 for responsive styling
Axios for API communication

## Backend
Node.js with Express.js framework
TypeScript for type safety
Sequelize ORM for database operations
JWT for authentication
Nodemailer for email services

## Project Structure
- `/express-backend` - Node.js/Express.js backend API
- `/react-frontend` - React/TypeScript frontend

# Backend Setup
use the terminal to enter these commands in order:
cd express-backend (change directory to backend folder)
npm install (installs packages and dependencies)
npm run dev (runs the development server)
backend will run on http://localhost:5000

# Frontend Setup
use the terminal to enter these commands in order:
cd react-frontend, then cd react-app (change directory to frontend folder, make sure it is in react-app, not react-frontend)
npm install (installs packages and dependencies)
npm run dev  (runs the development server)
frontend will run on http://localhost:5173

# Database Setup
1. Create a MySQL database named timeless_style
2. Configure your database connection in `/express-backend/.env`:
```env
DB_NAME=timeless_style
DB_USER=root
DB_PASS=
DB_HOST=localhost
DB_PORT=3306

EMAIL_USER=your_mail
EMAIL_PASSWORD=your_password
FRONTEND_URL=http://localhost:5173/

JWT_SECRET=your_jwt_key
```

# API Endpoints (currently)
Authentication
```
POST /api/members/register - Register new member
POST /api/members/login - Member login
```

### Members
```
GET /api/members/profile - Get member profile
PUT /api/members/update - Update member profile
DELETE /api/members/:id - Delete member account
```

### Services
```
GET /api/services/all - Get all services
GET /api/services/:id - Get service by ID
POST /api/services/create - Create new service (Admin)
PUT /api/services/:id - Update service (Admin)
DELETE /api/services/:id - Delete service (Admin)
```

### Products
```
GET /api/products/all - Get all products
GET /api/products/:id - Get product by ID
POST /api/products/create - Create new product (Admin)
PUT /api/products/:id - Update product (Admin)
DELETE /api/products/:id - Delete product (Admin)
```

### Appointments
```
GET /api/appointments/all - Get all appointments (Admin)
GET /api/appointments/my-appointments - Get member appointments
POST /api/appointments/create - Create appointment
PUT /api/appointments/:id - Update appointment
DELETE /api/appointments/:id - Delete appointment
```
