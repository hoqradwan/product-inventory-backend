"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post("/", controller_1.productControllers.createProduct);
router.get("/", controller_1.productControllers.getProducts);
router.get("/:productId", controller_1.productControllers.getProduct);
router.put("/:productId", controller_1.productControllers.updateProduct);
router.delete("/:productId", controller_1.productControllers.deleteProduct);
exports.productRoutes = router;
