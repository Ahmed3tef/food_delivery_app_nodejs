import { Request, Response, NextFunction, Router } from 'express';
import { loginValidation } from '../validation/auth';
import {
  addCategory,
  addDish,
  getAllCategories,
  getAllDishes,
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
  vendorLogin,
} from '../controllers';
import { Authenticate } from '../middleware/CommonAuth';

const router = Router();
router.post('/login', loginValidation, vendorLogin);

// private routes
router.use(Authenticate);
router.get('/profile', getVendorProfile);
router.patch('/profile', updateVendorProfile);
router.patch('/service', updateVendorService);
// router.patch('/coverimage', images, UpdateVendorCoverImage);

router.post(
  '/dishes',
  // images,
  addDish
);
router.get('/dishes', getAllDishes);

router.post('/categories', addCategory);
router.get('/categories', getAllCategories);

export { router as vendorRoutes };
