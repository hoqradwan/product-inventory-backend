import { NextFunction, Request, Response } from "express";
import { productServices } from "./service";
import productValidationZodSchema from "./validation";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;
    const productZodParsed = productValidationZodSchema.parse(productData);

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
    const result = await productServices.getProductsFromDB();

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
    console.log(id, "try");
    const result = await productServices.deleteProductFromDB(id);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
      data: null,
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
    const id = req.params.poductId;
    const updateData = req.body;
    const result = await productServices.updateProductFromDB(id, updateData);

    res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   message: "product updated successfully",
    //   data: result,
    // });
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
