import { ProductModel } from "../product/model";
import { TOrder } from "./interface";
import { OrderModel } from "./model";

const createOrderIntoDB = async (createOrder: TOrder) => {
  // get product from db
  const availableProduct = await ProductModel.findById({
    _id: createOrder.productId,
  });

  //if not get product from db
  if (!availableProduct) {
    throw new Error("Product Not Found");
  }

  // inventory available quantity
  const availableQuantity = availableProduct?.inventory?.quantity;

  // throw error if inventory quantity Insufficient
  if (availableQuantity < createOrder.quantity) {
    throw new Error("Insufficient quantity available in inventory");
  }

  // order create
  const orderCreated = await OrderModel.create(createOrder);

  // update inventory product data
  const updatedQuantity = availableQuantity - createOrder.quantity;
  availableProduct.inventory.quantity = updatedQuantity;
  availableProduct.inventory.inStock = updatedQuantity > 0;

  // update inventory in the database
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const res = await ProductModel.findOneAndUpdate(
    { _id: createOrder.productId },
    availableProduct,
    { new: true } // Return the updated document
  );
  return orderCreated;
};

const getOrdersFromDB = async (email?: string) => {
  let query = {};
  if (email) {
    query = { email: email };
  }

  const result = await OrderModel.find(query);
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
};
