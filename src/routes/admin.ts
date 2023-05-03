import { Request, Response, NextFunction, Router } from 'express';
import { createVendor, getAllVendors, getVendor } from '../controllers';

const router = Router();

router.post('/vendors/create', createVendor);
router.get('/vendors', getAllVendors);
router.get('/vendors/:id', getVendor);

export { router as adminRoutes };
