import { getCartDetails } from '@/lib';
import { CartStateItem } from '@/lib/get-cart-details';
import { Api } from '@/services/api-client';
import { create } from 'zustand';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: true,
  error: false,
  totalAmount: 0,
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (values: any) => {},
  removeCartItem: async (id: number) => {},
  updateItemQuantity: async (id: number, quantity: number) => {},
}));
