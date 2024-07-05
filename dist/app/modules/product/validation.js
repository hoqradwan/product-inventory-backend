"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number({
        required_error: "price is required",
        invalid_type_error: "description must be a number",
    }),
    inStock: zod_1.z.boolean({
        required_error: "inStock is required",
        invalid_type_error: "inStock must be a boolean",
    }),
});
const variantSchema = zod_1.z.object({
    type: zod_1.z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    value: zod_1.z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
});
const productValidationZodSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    description: zod_1.z.string({
        required_error: "description is required",
        invalid_type_error: "description must be a string",
    }),
    price: zod_1.z.number({
        required_error: "price is required",
        invalid_type_error: "price must be a number",
    }),
    category: zod_1.z.string({
        required_error: "category is required",
        invalid_type_error: "category must be a string",
    }),
    tags: zod_1.z.array(zod_1.z.string()).nonempty({
        message: "Can't be empty!",
    }),
    variants: zod_1.z.array(variantSchema).nonempty({
        message: "Can't be empty!",
    }),
    inventory: inventorySchema,
});
exports.default = productValidationZodSchema;
