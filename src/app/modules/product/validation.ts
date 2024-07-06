import { z } from "zod";

// create schema
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

const productCreateSchema = z.object({
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

// Update schema
const productUpdateSchema = productCreateSchema.optional();

// const inventoryUpdateSchema = z.object({
//   quantity: z
//     .number({
//       invalid_type_error: "description must be a number",
//     })
//     .optional(),

//   inStock: z
//     .boolean({
//       invalid_type_error: "inStock must be a boolean",
//     })
//     .optional(),
// });

// const variantUpdateSchema = z.object({
//   type: z
//     .string({
//       invalid_type_error: "Name must be a string",
//     })
//     .optional(),
//   value: z
//     .string({
//       invalid_type_error: "Name must be a string",
//     })
//     .optional(),
// });

// const productUpdateSchema = z.object({
//   name: z
//     .string({
//       invalid_type_error: "Name must be a string",
//     })
//     .optional(),
//   description: z
//     .string({
//       invalid_type_error: "description must be a string",
//     })
//     .optional(),
//   price: z
//     .number({
//       invalid_type_error: "price must be a number",
//     })
//     .optional(),
//   category: z
//     .string({
//       invalid_type_error: "category must be a string",
//     })
//     .optional(),
//   tags: z
//     .array(z.string())
//     .nonempty({
//       message: "Can't be empty!",
//     })
//     .optional(),
//   variants: z
//     .array(variantUpdateSchema)
//     .nonempty({
//       message: "Can't be empty!",
//     })
//     .optional(),
//   inventory: inventoryUpdateSchema.optional(),
// });

export const zodValidation = {
  productCreateSchema,
  productUpdateSchema,
};
