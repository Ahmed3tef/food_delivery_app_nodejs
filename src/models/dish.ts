import { Schema, Document, model } from 'mongoose';

export interface dishDoc extends Document {
  name: string;
  vendorId: string;
  categoryId: string;
  description: string;
  foodType: string;
  readyTime: number;
  price: number;
  rating: number;
  images: [string];
}

const dishSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: String, required: true, ref: 'category' },
    vendorId: { type: String, required: true, ref: 'vendor' },
    foodType: { type: String, required: true },
    readyTime: { type: Number },
    price: { type: Number },
    rating: { type: Number, default: 0 },
    images: { type: [String] },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

export const Dish = model<dishDoc>('dish', dishSchema);
