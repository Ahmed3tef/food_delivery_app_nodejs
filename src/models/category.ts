import { Schema, Document, model } from 'mongoose';

export interface categoryDoc extends Document {
  name: string;
  vendorId: string;
}

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    vendorId: { type: String, required: true, ref: 'vendor' },
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
export const Category = model<categoryDoc>('category', categorySchema);
