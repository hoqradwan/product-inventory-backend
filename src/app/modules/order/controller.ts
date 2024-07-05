import { NextFunction, Request, Response } from "express";
import { orderServices } from "./service";
import productValidationZodSchema from "./validation";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData = req.body;
    const orderZodParsed = productValidationZodSchema.parse(orderData);

    const result = await orderServices.createOrderIntoDB(orderZodParsed);
    if (!result) {
      next("saf");
    }
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.query.email as string | undefined;
    if (email) {
      const result = await orderServices.getOrderFromDB(email);

      res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
      });
    } else {
      const result = await orderServices.getOrdersFromDB();

      res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const orderControllers = {
  createOrder,
  getOrders,
};
