import express, { Request, Response, NextFunction } from 'express';
import { loginHandler } from './auth';
import { Category, Dish, Vendor } from '../models';
import { ERROR_STATUS, SUCCESS_STATUS } from '../utility/consts';
import { CreateDishInput, EditVendorInput } from '../dto';

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

// DISHES (ADD, GET ALL)
export const addDish = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  const { name, description, categoryId, foodType, readyTime, price } = <
    CreateDishInput
  >req.body;

  if (user) {
    const vendor = await Vendor.findById(user.id);

    if (!!vendor) {
      // const files = req.files as [Express.Multer.File];

      // const images = files.map((file: Express.Multer.File) => file.filename);

      const dish = await Dish.create({
        vendorId: user.id,
        name,
        description,
        categoryId,
        price,
        readyTime,
        foodType,
        // images,
      });

      vendor.dishes.push(dish);
      const updatedVendor = await vendor.save();

      return res.status(200).json({
        status: SUCCESS_STATUS,
        data: updatedVendor,
      });
    }
  }
  return res.json({ message: 'Unable to Update vendor profile' });
};

export const getAllDishes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const dishes = await Dish.find({ vendorId: user.id }).populate(
      'categoryId'
    );

    if (!!dishes) {
      return res.json({
        status: SUCCESS_STATUS,
        data: dishes,
      });
    }
  }
  return res.json({ message: 'Dishes not found!' });
};

// CATEGORIES (ADD, GET ALL)
export const addCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  const { name } = <{ name: string }>req.body;

  if (user) {
    const vendor = await Vendor.findById(user.id);

    if (!!vendor) {
      // const files = req.files as [Express.Multer.File];

      // const images = files.map((file: Express.Multer.File) => file.filename);

      const category = await Category.create({
        vendorId: user.id,
        name,
      });

      return res.status(200).json({
        status: SUCCESS_STATUS,
        data: category,
      });
    }
  }
  return res.json({ message: 'Unable to Update vendor data' });
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const categories = await Category.find({ vendorId: user.id });

    if (!!categories) {
      return res.json({
        status: SUCCESS_STATUS,
        data: categories,
      });
    }
  }
  return res.json({ message: 'Categories not found!' });
};
