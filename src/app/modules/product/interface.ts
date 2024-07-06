// export type Variant = {
//   type: string;
//   value: string;
// };
// export type Inventory = {
//   quantity: number;
//   inStock: boolean;
// };
// export type TProduct = {
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   tags: string[];
//   variants: Variant[];
//   inventory: Inventory;
// };

export interface Inventory {
  quantity: number;
  inStock: boolean;
}

export interface Variant {
  type: string;
  value: string;
}

export interface TProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Variant[];
  inventory: Inventory;
}

export interface TProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  tags?: string[];
  variants?: Variant[];
  inventory?: Partial<Inventory>;
}
