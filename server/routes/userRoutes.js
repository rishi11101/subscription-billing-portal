import express from 'express';
import { verifyToken } from '../middlewares/auth.js'
import { getUserProfile } from '../controllers/userController.js';

export const userRouter = express.Router();

userRouter.get('/me', verifyToken , getUserProfile);