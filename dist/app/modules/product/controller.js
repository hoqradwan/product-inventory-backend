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
exports.productControllers = void 0;
const service_1 = require("./service");
const validation_1 = require("./validation");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const productZodParsed = validation_1.zodValidation.productCreateSchema.parse(productData);
        const result = yield service_1.productServices.createProductIntoDB(productZodParsed);
        res.status(200).json({
            success: true,
            message: "product create successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield service_1.productServices.getProductsFromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: "products retrieve successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield service_1.productServices.getProductFromDB(id);
        res.status(200).json({
            success: true,
            message: "product retrieve successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        let result = yield service_1.productServices.deleteProductFromDB(id);
        result = null;
        res.status(200).json({
            success: true,
            message: "product deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const updateData = req.body;
        // const zodValidatedData =
        //   zodValidation.productUpdateSchema.parse(updateData);
        const zodValidatedData = validation_1.zodValidation.productUpdateSchema.parse(updateData);
        const result = yield service_1.productServices.updateProductFromDB(productId, zodValidatedData);
        res.status(200).json({
            success: true,
            message: "product updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.productControllers = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};
