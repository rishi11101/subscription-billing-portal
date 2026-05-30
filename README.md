# Subscription Billing Portal

A full-stack SaaS billing portal with Razorpay payment integration, plan-based feature access control, JWT authentication, and transactional email notifications.

🔗 [Live Demo](https://subscription-billing-portal.vercel.app)

## Features
- JWT authentication with protected routes and rate limiting
- Three-tier plan system — Free, Basic, Pro
- Razorpay payment gateway with server-side HMAC-SHA256 signature verification
- Plan-based feature access control with locked/unlocked dashboard sections
- Transactional email confirmation on successful payment via Nodemailer

## Tech Stack
**Frontend:** React.js, Tailwind CSS, Context API  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL (Neon)  
**Payments:** Razorpay  
**Auth:** JWT  
**Email:** Nodemailer  
**Deployment:** Vercel, Render, Neon  

## Database Schema
```
users       — id, name, email, password, plan
plans       — id, name, price
payments    — id, user_id, plan_id, razorpay_order_id, status
```

## API Routes
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/users/me
GET    /api/plans
POST   /api/payments/create-order
POST   /api/payments/verify
```

## Challenges

**Payment response blocked by email timeout**  
After successful payment, the API response was hanging for 2-3 minutes before reaching the frontend. Root cause was `await transporter.sendMail()` — Gmail SMTP connections were timing out on Render's free tier, blocking the entire response. Removed `await` and used `.catch()` for error handling — payment response now returns instantly while email sends in background.


## Setup & Installation

### Backend
```bash
cd server
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `.env` in `/server`:
```
PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your_gmail
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

Create `.env` in `/frontend`:
```
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

## Test Payment
UPI: `success@razorpay` (any 6-digit OTP)

Or card:
```
Card: 5267 3181 8797 5449
CVV: 123
Expiry: 12/26
```