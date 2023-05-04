import { Request, Response, NextFunction, Router } from 'express';
import { loginValidation } from '../validation/auth';
import { vendorLogin } from '../controllers';

const router = Router();
router.post('/login', loginValidation, vendorLogin);
export { router as vendorRoutes };
