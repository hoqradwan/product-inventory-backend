import { ProductModel } from "../product/model";
import { TOrder } from "./interface";
import { OrderModel } from "./model";

const createOrderIntoDB = async (createOrder: TOrder) => {
  const availableProduct = await ProductModel.findById({
    _id: createOrder.productId,
  });

  if (!availableProduct) {
    throw new Error("Product Not Found");
  }

  const availableQuantity = availableProduct?.inventory?.quantity;

  if (availableQuantity < createOrder.quantity) {
    throw new Error("Insufficient quantity available in inventory");
  }

  const orderCreated = await OrderModel.create(createOrder);

  const updatedQuantity = availableQuantity - createOrder.quantity;
  availableProduct.inventory.quantity = updatedQuantity;
  availableProduct.inventory.inStock = updatedQuantity > 0;

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const res = await ProductModel.findOneAndUpdate(
    { _id: createOrder.productId },
    availableProduct,
    { new: true } // Return the updated document
  );
  return orderCreated;
};

const getOrderFromDB = async (email: string) => {
  const result = await OrderModel.findOne({ email });
  return result;
};
const getOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getOrderFromDB,
  getOrdersFromDB,
};
