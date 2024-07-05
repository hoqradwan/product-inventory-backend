import { z } from "zod";

const inventorySchema = z.object({
  quantity: z.number({
    required_error: "price is required",
    invalid_type_error: "description must be a number",
  }),

  inStock: z.boolean({
    required_error: "inStock is required",
    invalid_type_error: "inStock must be a boolean",
  }),
});
const variantSchema = z.object({
  type: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  value: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
});

const productValidationZodSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  description: z.string({
    required_error: "description is required",
    invalid_type_error: "description must be a string",
  }),
  price: z.number({
    required_error: "price is required",
    invalid_type_error: "price must be a number",
  }),
  category: z.string({
    required_error: "category is required",
    invalid_type_error: "category must be a string",
  }),
  tags: z.array(z.string()).nonempty({
    message: "Can't be empty!",
  }),
  variants: z.array(variantSchema).nonempty({
    message: "Can't be empty!",
  }),
  inventory: inventorySchema,
});

export default productValidationZodSchema;
