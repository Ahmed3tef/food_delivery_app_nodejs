import { Request, Response, NextFunction, Router } from 'express';
import { loginValidation } from '../validation/auth';

const router = Router();

// router.post('/login', loginValidation, login);
export { router as authRoutes };
