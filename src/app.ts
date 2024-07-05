// import express, { Application, Request, Response } from "express";
import express, { Application } from "express";
import cors from "cors";
import { productRoutes } from "./app/modules/product/route";
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

// app.get("/api/product", (req: Request, res: Response) => {
//   const a = "Hello World!";
//   console.log(req.body);
//   res.send(a);
// });

export default app;
