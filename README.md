# Subscription Billing Portal

A full-stack SaaS billing portal with Razorpay payment integration, plan-based feature access control, JWT authentication, and transactional email notifications.

🔗 [Live Demo](https://subscription-billing-portal.vercel.app)

## Features
- JWT authentication with protected routes
- Three-tier plan system — Free, Basic, Pro
- Razorpay payment gateway integration with server-side signature verification
- Plan-based feature access control (locked/unlocked sections)
- Transactional email on successful payment via Nodemailer
- Responsive dashboard with analytics and priority support sections

## Tech Stack
**Frontend:** React.js, Tailwind CSS, Context API  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL (Neon)  
**Payments:** Razorpay  
**Auth:** JWT  
**Email:** Nodemailer

## Deployment
- Frontend deployed on Vercel
- Backend deployed on Render
- PostgreSQL hosted on Neon

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
Use Razorpay test card:
```
Card: 5267 3181 8797 5449
CVV: 123
Expiry: 12/26
OTP: any 6 digits (e.g. `123456`)
```

Or UPI: `success@razorpay`