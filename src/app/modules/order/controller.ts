import { Request, Response } from "express";
import { orderServices } from "./service";
import productValidationZodSchema from "./validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const orderZodParsed = productValidationZodSchema.parse(orderData);

    const result = await orderServices.createOrderIntoDB(orderZodParsed);

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order not created!",
      error: error,
    });
  }
};

export const orderControllers = {
  createOrder,
  getOrders,
};
