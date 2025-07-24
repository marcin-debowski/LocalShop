import ShoppingCartCard from "../components/shared/ShoppingCartCard";
import { useAuthStore } from "../zustand/authStore";

import { useCartStore } from "../zustand/cartStore";
import { useNavigate } from "react-router-dom";
function ShoppingCart() {

    const cartItems = useCartStore((state) => state.cart);
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            //wybór konta 
            navigate("/choose-account");
            return;
        }
        // Podsumowanie danych
        navigate("/summary");
    };

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
              <button onClick={handleCheckout} className="bg-stone-900 hover:bg-stone-700 text-white px-4 py-2 rounded transition-colors">
                  Checkout
              </button>
          </div>
          
        </>
      )}
    </div>
  );
}
export default ShoppingCart;