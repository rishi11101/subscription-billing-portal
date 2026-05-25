import express from 'express';
import { createUser, loginUser } from '../controllers/authController.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

export const authRouter = express.Router();

authRouter.post('/register', authLimiter, createUser);

authRouter.post('/login', authLimiter, loginUser);