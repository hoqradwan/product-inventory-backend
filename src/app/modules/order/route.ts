import express from "express";
import { orderControllers } from "./controller";

const router = express.Router();

router.post("/", orderControllers.createOrder);
router.get("/", orderControllers.getOrders);

export const ordersRoutes = router;
