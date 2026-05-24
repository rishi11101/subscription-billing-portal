import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import { createOrder, verifyPayment } from '../controllers/paymentsController.js';

export const paymentsRouter = express.Router();

paymentsRouter.post('/create-order', verifyToken , createOrder);

paymentsRouter.post('/verify', verifyToken, verifyPayment);