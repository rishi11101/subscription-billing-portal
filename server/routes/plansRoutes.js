import express from 'express';
import { getPlans } from '../controllers/plansController.js';

export const plansRouter = express.Router();

plansRouter.get('/', getPlans);