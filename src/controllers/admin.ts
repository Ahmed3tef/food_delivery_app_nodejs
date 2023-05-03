import { Request, Response, NextFunction } from 'express';

export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).send({
    message: 'all is good',
  });
};

export const getAllVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
