import { TProduct } from "./interface";
import { ProductModel } from "./model";

const createProductIntoDB = async (createProduct: TProduct) => {
  const result = await ProductModel.create(createProduct);
  return result;
};
const getProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};
const getProductFromDB = async (id: string) => {
  const result = await ProductModel.findById({ _id: id });
  return result;
};
const updateProductFromDB = async (
  id: string,
  updateData: Partial<TProduct>
) => {
  const result = await ProductModel.findOneAndUpdate({ _id: id }, updateData);
  return result;
};

const deleteProductFromDB = async (id: string) => {};

export const productServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
