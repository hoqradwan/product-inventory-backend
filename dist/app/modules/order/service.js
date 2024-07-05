"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const model_1 = require("../product/model");
const model_2 = require("./model");
const createOrderIntoDB = (createOrder) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const availableProduct = yield model_1.ProductModel.findById({
        _id: createOrder.productId,
    });
    if (!availableProduct) {
        throw new Error("Product Not Found");
    }
    const availableQuantity = (_a = availableProduct === null || availableProduct === void 0 ? void 0 : availableProduct.inventory) === null || _a === void 0 ? void 0 : _a.quantity;
    if (availableQuantity < createOrder.quantity) {
        throw new Error("Insufficient quantity available in inventory");
    }
    const orderCreated = yield model_2.OrderModel.create(createOrder);
    const updatedQuantity = availableQuantity - createOrder.quantity;
    availableProduct.inventory.quantity = updatedQuantity;
    availableProduct.inventory.inStock = updatedQuantity > 0;
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const res = yield model_1.ProductModel.findOneAndUpdate({ _id: createOrder.productId }, availableProduct, { new: true } // Return the updated document
    );
    return orderCreated;
});
const getOrderFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_2.OrderModel.findOne({ email });
    return result;
});
const getOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_2.OrderModel.find();
    return result;
});
exports.orderServices = {
    createOrderIntoDB,
    getOrderFromDB,
    getOrdersFromDB,
};
