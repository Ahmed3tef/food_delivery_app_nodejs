import { Request, Response, NextFunction } from 'express';
import { createVendorInput } from '../dto';
import { Vendor } from '../models';

export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    ownerName,
    foodType,
    password,
    email,
    address,
    phone,
    pincode,
    logo,
  } = <createVendorInput>req.body;

  const exitingVendor = await Vendor.findOne({ email });
  if (!!exitingVendor) {
  }
  const vendor = await Vendor.create({
    name,
    ownerName,
    foodType,
    password,
    email,
    address,
    phone,
    pincode,
    salt: '1st',
    logo,
  });
  res.status(200).send({
    message: 'all is good',
    data: vendor,
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
