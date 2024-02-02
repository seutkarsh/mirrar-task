import express, { Router, Request, Response } from "express";
import { ResponseWrapper } from "./ResponseWrapper";
import { Container } from "typedi";
import {
  IAddProductsData,
  IUpdateProductsData,
  ProductService,
} from "../services/ProductService";
import { IProductSchema } from "../schemas/product";
import {
  addProductValidator,
  getProductValidator,
  updateProductValidator,
} from "./productValidator";

const router: Router = express.Router();

const productService = Container.get(ProductService);
router.get("/", async (req: Request, res: Response) => {
  const response = new ResponseWrapper<IProductSchema[]>();
  try {
    const data: IProductSchema[] = await productService.getAllProducts();
    response.setData(data);
  } catch (e) {
    response.setError(e.message);
  }
  res.json(response);
});

router.get(
  "/product",
  getProductValidator,
  async (req: Request, res: Response) => {
    const response = new ResponseWrapper<IProductSchema>();
    try {
      const userId: string = req.query.productId!.toString();
      const data: IProductSchema = await productService.getProductById(userId);
      response.setData(data);
    } catch (e) {
      response.setError(e.message);
    }
    res.json(response);
  },
);

router.post(
  "/product",
  addProductValidator,
  async (req: Request, res: Response) => {
    const response = new ResponseWrapper();
    try {
      const productDetails: IAddProductsData = req.body;
      const data = await productService.addProduct(productDetails);
      response.setData(data);
    } catch (e) {
      response.setError(e.message);
    }
    res.json(response);
  },
);

router.put(
  "/product",
  updateProductValidator,
  async (req: Request, res: Response) => {
    const response = new ResponseWrapper();
    try {
      const productDetails: IUpdateProductsData = req.body;
      const data = await productService.updateProduct(productDetails);
      response.setData(data);
    } catch (e) {
      response.setError(e.message);
    }
    res.json(response);
  },
);

router.delete(
  "/product",
  getProductValidator,
  async (req: Request, res: Response) => {
    const response = new ResponseWrapper();
    try {
      const userId: string = req.query.productId!.toString();
      const data = await productService.deleteProductById(userId);
      response.setData(data);
    } catch (e) {
      response.setError(e.message);
    }
    res.json(response);
  },
);

export default router;
