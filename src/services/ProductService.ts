import { Service } from "typedi";
import { IProductSchema, IVariants, Product } from "../schemas/product";
import mongoose, { Model } from "mongoose";

@Service()
export class ProductService {
  private productSchema: Model<mongoose.Document> = Product;
  async getAllProducts(): Promise<IProductSchema[]> {
    const products: IProductSchema[] = await this.productSchema.find({});

    if (products.length === 0) {
      throw new Error(Errors.NO_PRODUCTS_FOUND);
    }
    return products;
  }

  async getProductById(productId: string): Promise<IProductSchema> {
    const product: IProductSchema | null = await this.productSchema.findOne({
      _id: productId,
    });
    if (!product) {
      throw new Error(Errors.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  async addProduct(productDetails: IAddProductsData) {
    const variants = new Map<string, IVariants>();
    productDetails.variants.forEach((variant) => {
      variants.set(variant.sku, {
        name: variant.name,
        additionalCost: variant.additionalCost,
        stockCount: variant.stockCount,
      });
    });
    const productData = {
      name: productDetails.name,
      description: productDetails.description,
      price: productDetails.price,
      variants: variants,
    };

    return await this.productSchema.create(productData);
  }

  async updateProduct(productData: IUpdateProductsData) {
    const product = await this.getProductById(productData.productId);

    if (productData.name) {
      product.name = productData.name;
    }
    if (productData.description) {
      product.description = productData.description;
    }

    if (productData.price !== undefined) {
      product.price = productData.price;
    }

    if (productData.variants) {
      productData.variants.forEach((variantData) => {
        const existingVariant = product.variants.get(variantData.sku);

        if (existingVariant) {
          // Update existing variant
          if (variantData.name) {
            existingVariant.name = variantData.name;
          }
          if (variantData.additionalCost !== undefined) {
            existingVariant.additionalCost = variantData.additionalCost;
          }
          if (variantData.stockCount !== undefined) {
            existingVariant.stockCount = variantData.stockCount;
          }
        } else {
          throw new Error(
            `Variant with SKU '${variantData.sku}' not found. Update Cancelled`,
          );
        }
      });
    }
    product.markModified("variants");
    const updatedProduct = await product.save();
    return updatedProduct;
  }

  async deleteProductById(productId: string) {
    await this.getProductById(productId);
    await this.productSchema.findOneAndDelete({ _id: productId });
    return { message: "Product Deleted Successfully" };
  }
}

enum Errors {
  NO_PRODUCTS_FOUND = "There are no products to display",
  PRODUCT_NOT_FOUND = "Product Not Found for given Product ID",
}

export interface IAddProductsData {
  name: string;
  description: string;
  price: number;
  variants: {
    sku: string;
    name: string;
    additionalCost: number;
    stockCount: number;
  }[];
}

export interface IUpdateProductsData {
  productId: string;
  name?: string;
  description?: string;
  price?: number;
  variants?: {
    sku: string;
    name?: string;
    additionalCost?: number;
    stockCount?: number;
  }[];
}
