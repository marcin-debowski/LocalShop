import ShoppingCartCard from "../components/shared/ShoppingCartCard";

import { useCartStore } from "../zustand/cartStore";
import { useEffect } from "react";


function ShoppingCart() {
    const cartItems = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
        {cartItems.map((item) => (
          <ShoppingCartCard key={item.productId} item={item} />
        ))}
          <div className="grid grid-cols-1 grid-cols-9 gap-4 mt-4">
              <h2 className="mt-4 col-start-8">Total: ${total.toFixed(2)}</h2>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                  Checkout
              </button>
          </div>
          
        </>
      )}
    </div>
  );
}
export default ShoppingCart;