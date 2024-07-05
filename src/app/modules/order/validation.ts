import { z } from "zod";

const productValidationZodSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }),
  productId: z.string({
    required_error: "productId is required",
    invalid_type_error: "productId must be a string",
  }),
  price: z.number({
    required_error: "price is required",
    invalid_type_error: "price must be a number",
  }),
  quantity: z.number({
    required_error: "quantity is required",
    invalid_type_error: "quantity must be a number",
  }),
});

export default productValidationZodSchema;
