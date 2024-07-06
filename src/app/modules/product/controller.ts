import { NextFunction, Request, Response } from "express";
import { productServices } from "./service";
import { zodValidation } from "./validation";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;
    const productZodParsed =
      zodValidation.productCreateSchema.parse(productData);

    const result = await productServices.createProductIntoDB(productZodParsed);

    res.status(200).json({
      success: true,
      message: "product create successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await productServices.getProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: "products retrieve successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.productId;
    const result = await productServices.getProductFromDB(id);

    res.status(200).json({
      success: true,
      message: "product retrieve successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.productId;
    let result = await productServices.deleteProductFromDB(id);
    result = null;
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    const updateData = req.body;
    const zodValidatedData =
      zodValidation.productUpdateSchema.parse(updateData);

    const result = await productServices.updateProductFromDB(
      productId,
      zodValidatedData
    );

    res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const productControllers = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
