import { Document, Schema, SchemaTypes, model } from 'mongoose';
import { createVendorInput } from '../dto';

interface vendorDoc extends Document {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  logo: string;
  salt: string;
  serviceAvailable: boolean;
  coverImages: [string];
  rating: number;
  deliveryTime: number;
  dishes: any;
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
    deliveryTime: {
      // in mins
      type: Number,
      default: 10,
    },
    dishes: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'dish',
      },
    ],
    logo: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

export const Vendor = model<vendorDoc>('vendor', vendorSchema);
