# AssetFlow Backend

AssetFlow Backend is a RESTful API built using Node.js, Express.js, and MongoDB. It powers authentication, asset management, booking workflows, maintenance reporting, role-based access control, and email notifications for the AssetFlow platform.

---

## Live Backend

https://assetflow-backend-4w4l.onrender.com

---

## Demo Video & Deliverables

https://drive.google.com/drive/folders/1aZ8lV-rOkJroQElpt7MDTZ1XRE5YFUHC?usp=sharing

Contents:
- Demo Video
- Design Document
- Deliverables

---

## Features

### Authentication
- User Signup
- OTP Verification
- User Login
- JWT Authentication
- Protected Routes

### Asset Management
- Create Categories
- Manage Assets
- Update Asset Information
- Delete Assets

### Booking System
- Create Booking Requests
- Approve Bookings
- Reject Bookings
- Return Assets
- Booking Tracking

### Maintenance Management
- Report Asset Issues
- Resolve Maintenance Reports
- Track Maintenance Status

### Admin Features
- Recruit New Admins
- Manage Assets
- Manage Categories
- Monitor Bookings
- Monitor Maintenance Requests

### Notifications
- OTP Verification Emails
- Booking Approval Emails
- Booking Rejection Emails
- Maintenance Updates

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Nodemailer
- Brevo SMTP

---

## Project Structure

```txt
backend/
├── config/
│   ├── db.js
│   └── mailer.js
│
├── controllers/
│   ├── authController.js
│   ├── assetController.js
│   ├── bookingController.js
│   ├── categoryController.js
│   ├── maintenanceController.js
│   └── adminController.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── models/
│   ├── userModel.js
│   ├── assetModel.js
│   ├── categoryModel.js
│   ├── bookingModel.js
│   └── maintenanceModel.js
│
├── router/
├── index.js
└── package.json
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

MAIL_FROM=your_email
```

---

## Installation

```bash
git clone <repository-url>

cd backend

npm install
```

---

## Running the Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|----------|----------|
| POST | /api/auth/signup |
| POST | /api/auth/verify-otp |
| POST | /api/auth/login |
| GET | /api/auth/get-user |

### Categories

| Method | Endpoint |
|----------|----------|
| POST | /api/categories |
| GET | /api/categories |
| PUT | /api/categories/:id |
| DELETE | /api/categories/:id |

### Assets

| Method | Endpoint |
|----------|----------|
| POST | /api/assets |
| GET | /api/assets |
| PUT | /api/assets/:id |
| DELETE | /api/assets/:id |

### Bookings

| Method | Endpoint |
|----------|----------|
| POST | /api/bookings |
| GET | /api/bookings |
| PUT | /api/bookings/:id/approve |
| PUT | /api/bookings/:id/reject |
| PUT | /api/bookings/:id/return |

### Maintenance

| Method | Endpoint |
|----------|----------|
| POST | /api/maintenance |
| GET | /api/maintenance |
| PUT | /api/maintenance/:id/resolve |

### Admin

| Method | Endpoint |
|----------|----------|
| GET | /api/admin/users |
| POST | /api/admin/create-admin |

---

## Deployment

- Backend: Render
- Database: MongoDB Atlas

---

## Author

Manas Kawathalkar
