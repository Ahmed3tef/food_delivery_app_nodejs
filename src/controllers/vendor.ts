import express, { Request, Response, NextFunction } from 'express';
import { loginHandler } from './auth';
import { Vendor } from '../models';
import { ERROR_STATUS, SUCCESS_STATUS } from '../utility/consts';
import { EditVendorInput } from '../dto';

export const vendorLogin = loginHandler(Vendor);

export const getVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const existingVendor = await Vendor.findById(user.id);
    return res.status(200).json({
      status: SUCCESS_STATUS,
      data: existingVendor,
    });
  }

  return res.status(404).json({
    status: ERROR_STATUS,
    message: 'vendor Information Not Found',
  });
};

export const updateVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  const { foodType, name, address, phone } = <EditVendorInput>req.body;

  if (user) {
    const existingVendor = await Vendor.findById(user.id);

    if (!!existingVendor) {
      existingVendor.name = name;
      existingVendor.address = address;
      existingVendor.phone = phone;
      existingVendor.foodType = foodType;

      const updatedVendor = await existingVendor.save();

      return res.status(200).json({
        status: SUCCESS_STATUS,
        data: updatedVendor,
      });
    }
  }

  return res.json({
    status: ERROR_STATUS,
    message: 'Unable to Update vendor profile ',
  });
};

export const updateVendorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  const { lat, lng } = req.body;

  if (user) {
    const existingVendor = await Vendor.findById(user.id);

    if (!!existingVendor) {
      existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
      // if (lat && lng) {
      //   existingVendor.lat = lat;
      //   existingVendor.lng = lng;
      // }
      const updatedVendor = await existingVendor.save();

      return res.status(200).json({
        status: SUCCESS_STATUS,
        data: updatedVendor,
      });
    }
  }
  return res.json({
    status: ERROR_STATUS,
    message: 'Unable to Update vendor profile',
  });
};
