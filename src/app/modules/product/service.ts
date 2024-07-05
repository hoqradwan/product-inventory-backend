import { TProduct } from "./interface";
import { ProductModel } from "./model";

const createProductIntoDB = async (createProduct: TProduct) => {};
const getProductsFromDB = async () => {};
const getProductFromDB = async (id: string) => {};
const updateProductFromDB = async (
  id: string,
  updateData: Partial<TProduct>
) => {};

const deleteProductFromDB = async (id: string) => {};

export const productServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
