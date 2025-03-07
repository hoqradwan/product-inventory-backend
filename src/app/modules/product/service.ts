import { TProduct } from "./interface";
import { ProductModel } from "./model";

const createProductIntoDB = async (createProduct: TProduct) => {
  const result = await ProductModel.create(createProduct);
  return result;
};

const getProductsFromDB = async (searchTerm?: string) => {
  let query = {};
  if (searchTerm) {
    query = { name: new RegExp(searchTerm, "i") }; // 'i' makes the search case-insensitive
  }
  const result = await ProductModel.find(query);
  return result;
};
const getProductFromDB = async (id: string) => {
  const result = await ProductModel.findById({ _id: id });
  if (!result) {
    throw new Error("Order not found");
  }
  return result;
};
const updateProductFromDB = async (
  id: string,
  updateData: Partial<TProduct>
) => {
  const result = await ProductModel.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findOneAndDelete({ _id: id });
  return result;
};

export const productServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
