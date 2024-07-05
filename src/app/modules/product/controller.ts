import { Request, Response } from "express";
import { productServices } from "./service";
import productValidationZodSchema from "./validation";

const createProduct = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: "product not created!",
      error: error,
    });
  }
};
const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getProductsFromDB();

    res.status(200).json({
      success: true,
      message: "products retrieve successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "product not found!",
      error: error,
    });
  }
};
const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productServices.getProductFromDB(id);

    res.status(200).json({
      success: true,
      message: "product retrieve successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "product not found!",
      error: error,
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    console.log(id, "try");
    const result = await productServices.deleteProductFromDB(id);

    res.status(200).json({
      success: true,
      message: "product deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "product not deleted!",
      error: error,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const updateData = req.body;
    const result = await productServices.updateProductFromDB(id, updateData);

    res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "product not updated!",
      error: error,
    });
  }
};

export const productControllers = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
