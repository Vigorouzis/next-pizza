import { Cart, CartItem, Ingredient, Product, ProductItem } from '@prisma/client';

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingeredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}
