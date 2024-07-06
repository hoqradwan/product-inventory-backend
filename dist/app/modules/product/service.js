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
exports.productServices = void 0;
const model_1 = require("./model");
const createProductIntoDB = (createProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.ProductModel.create(createProduct);
    return result;
});
const getProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (searchTerm) {
        query = { name: new RegExp(searchTerm, "i") }; // 'i' makes the search case-insensitive
    }
    const result = yield model_1.ProductModel.find(query);
    return result;
});
const getProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.ProductModel.findById({ _id: id });
    if (!result) {
        throw new Error("Order not found");
    }
    return result;
});
const updateProductFromDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.ProductModel.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.ProductModel.findOneAndDelete({ _id: id });
    return result;
});
exports.productServices = {
    createProductIntoDB,
    getProductsFromDB,
    getProductFromDB,
    updateProductFromDB,
    deleteProductFromDB,
};
