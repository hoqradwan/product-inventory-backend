import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { productRoutes } from "./app/modules/product/route";
import { ordersRoutes } from "./app/modules/order/route";
const app: Application = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all root routes
app.use("/api/products", productRoutes);
app.use("/api/orders", ordersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome The Application working",
  });
});

// 404 Error Handler
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.message == "Insufficient quantity available in inventory") {
    res.status(500).json({
      success: false,
      message: "Insufficient quantity available in inventory",
    });
  } else {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Order not found",
      });
    } else {
      next();
    }
  }
});
export default app;
