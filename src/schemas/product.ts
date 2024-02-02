import * as mongoose from "mongoose";
import { Document } from "mongodb";

export interface IProductSchema extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  variants: Map<string, IVariants>;
}
export interface IVariants {
  name: string;
  additionalCost: number;
  stockCount: number;
}
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  variants: {
    type: Map<string, IVariants>,
  },
});
export const Product = mongoose.model<mongoose.Document>(
  "Product",
  productSchema,
  "products",
);
