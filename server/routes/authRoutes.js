import express from 'express';
import { createUser, loginUser } from '../controllers/authController.js';

export const authRouter = express.Router();

authRouter.post('/register', createUser);

authRouter.post('/login', loginUser);