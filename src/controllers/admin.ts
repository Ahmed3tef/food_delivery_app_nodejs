import { Request, Response, NextFunction } from 'express';
import { createVendorInput } from '../dto';
import { Vendor } from '../models';
import { genSalt } from 'bcrypt';
import { GeneratePassword, GenerateSalt } from '../utility/PasswordUnility';
import { ERROR_STATUS, SUCCESS_STATUS } from '../utility/consts';

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
    return res.json({
      status: ERROR_STATUS,
      message: 'Email already exists.',
    });
  }

  // hashing password
  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  // create vendor
  const vendor = await Vendor.create({
    name,
    ownerName,
    phone,
    email,
    password: userPassword,
    salt: salt,
    address,
    pincode,
    foodType,
    logo,
  });

  res.status(200).json({
    status: SUCCESS_STATUS,
    data: vendor,
  });
};

export const getAllVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await Vendor.find();

  if (!!vendors) {
    return res.json({
      status: SUCCESS_STATUS,
      data: vendors,
    });
  }

  return res.json({ message: 'Vendors data not available' });
};

export const getVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const vendor = await Vendor.findById(id);

  if (!!vendor) {
    return res.json({
      status: SUCCESS_STATUS,
      data: vendor,
    });
  }

  return res.json({ message: 'Vendor data not available' });
};
