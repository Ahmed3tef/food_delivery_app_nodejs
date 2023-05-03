import mongoose, { Schema, model } from 'mongoose';
import { createVendorInput } from '../dto';

interface vendorDoc extends createVendorInput {
  salt: string;
  serviceAvailable: boolean;
  coverImages: [string];
  rating: number;
  // foods: any;
  logo: string;
}

const vendorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    foodType: {
      type: [String],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    serviceAvailable: {
      type: Boolean,
      required: true,
      default: false,
    },
    coverImages: {
      type: [String],
    },
    rating: {
      type: Number,
      default: 0,
    },
    // foods: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: 'food',
    // },
    logo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Vendor = model<vendorDoc>('vendor', vendorSchema);
