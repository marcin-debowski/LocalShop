import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const cart = get().cart;
        const existing = cart.find(p => p.productId === item.productId);
        if (existing) {
          const updated = cart.map(p =>
            p.productId === item.productId
              ? { ...p, quantity: p.quantity + item.quantity }
              : p
          );
          set({ cart: updated });
        } else {
          set({ cart: [...cart, item] });
        }
      },
      removeFromCart: (productId) =>
        set({ cart: get().cart.filter(item => item.productId !== productId) }),
      updateQuantity: (productId, quantity) => {
        set({
          cart: get().cart.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          )
        });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // nazwa w localStorage
    }
  )
);
