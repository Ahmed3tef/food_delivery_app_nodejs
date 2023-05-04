import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import { adminRoutes, vendorRoutes, authRoutes } from '../routes';
import ApiError from '../utility/ApiError';

export const appRoutes = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  app.use(cors());

  app.use(mongoSanitize());

  const imagePath = path.join(__dirname, '../images');

  app.use('/images', express.static(imagePath));

  app.use('/admin', adminRoutes);
  app.use('/vendor', vendorRoutes);
  app.use('/auth', authRoutes);
  //   app.use('/customer', CustomerRoute);
  //   app.use('/delivery', DeliveryRoute);
  //   app.use(ShoppingRoute);

  // route doesn't match
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`));
  });
  return app;
};
