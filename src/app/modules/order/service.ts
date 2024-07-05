import { ProductModel } from "../product/model";
import { TOrder } from "./interface";
import { OrderModel } from "./model";

const createOrderIntoDB = async (createOrder: TOrder) => {
  try {
    const availableProduct = await ProductModel.findById({
      _id: createOrder.productId,
    });

    if (!availableProduct) {
      throw new Error("Product Not Found");
    }

    const availableQuantity = availableProduct?.inventory?.quantity;

    if (availableQuantity < createOrder.quantity) {
      console.log("paisi");
      throw new Error("Insufficient quantity available in inventory");
    }

    const orderCreated = await OrderModel.create(createOrder);

    const updatedQuantity = availableQuantity - createOrder.quantity;
    if (updatedQuantity <= 0) {
      availableProduct.inventory.quantity = updatedQuantity;
      availableProduct.inventory.inStock = false;

      const res = await ProductModel.findOneAndUpdate(
        { _id: createOrder.productId },
        availableProduct
      );
      console.log(res);
    } else {
      availableProduct.inventory.quantity = updatedQuantity;

      const res = await ProductModel.findOneAndUpdate(
        { _id: createOrder.productId },
        availableProduct
      );
      console.log(res);
    }
    return orderCreated;
  } catch (error) {
    console.log(error, "from service");
  }
};
const getOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};
const getOrderFromDB = async (email: string) => {
  const result = await OrderModel.findOne({ email });
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
  getOrderFromDB,
};
