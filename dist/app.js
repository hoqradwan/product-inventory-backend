"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Application, Request, Response } from "express";
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = require("./app/modules/product/route");
const route_2 = require("./app/modules/order/route");
const app = (0, express_1.default)();
//parser
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// all root routes
app.use("/api/products", route_1.productRoutes);
app.use("/api/orders", route_2.ordersRoutes);
// 404 Error Handler
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
// Global Error Handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err, req, res, next) => {
    if (err.message == "Insufficient quantity available in inventory") {
        res.status(500).json({
            success: false,
            message: "Insufficient quantity available in inventory",
        });
    }
    else {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Order not found",
            });
        }
        else {
            next();
        }
    }
});
exports.default = app;
