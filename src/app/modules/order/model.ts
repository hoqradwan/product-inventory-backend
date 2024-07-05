import { model, Schema } from "mongoose";
import { TOrder } from "./interface";

export const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const OrderModel = model<TOrder>("Orders", orderSchema);
