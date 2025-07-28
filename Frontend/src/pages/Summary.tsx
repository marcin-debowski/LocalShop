import { useState } from "react";
import DeliveryAddressForm from "../components/shared/DeliveryAdressForm";
import { useAuthStore } from "../zustand/authStore";
import { useCartStore } from "../zustand/cartStore";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";



function Summary() {
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [tempUser, setTempUser] = useState({ email: "", name: "" });
  const [address, setAddress] = useState({ country: "", city: "", street: "", zip: "" });
  const [orderMessage, setOrderMessage] = useState("");
  const user = useAuthStore((state) => state.user);
  const products = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  // Aktualizuje adres w stanie
  const handleAddressChange = (addr: typeof address) => {
    setAddress(addr);
  };
  // Obsługuje wysyłanie zamówienia
  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const orderData = {
      customer: user ? { name: user.name, email: user.email } : tempUser,
      items: products.map(item => ({ productId: item.productId, name: item.name, price: item.price, quantity: item.quantity })),
      total,
      address,
    };
    try {
        await axios.post("/orders/add", orderData, { withCredentials: true });
        setOrderMessage("Order placed successfully!");
        toast.success("Order placed successfully!");
        clearCart();//czyszcenie koszyka po złożeniu zamówienia
    } catch (err: any) {
      setOrderMessage(err.response?.data?.message ?? "Order failed");
    }
  };

  return (
    <div className="w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Order Summary</h1>
      <form onSubmit={handleOrderSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-100 rounded-lg p-6 flex flex-col gap-4">
            {user ? (
              <>
                <h2 className="text-xl font-semibold mb-2">Your account:</h2>
                <span className="text-gray-700 font-medium mb-4">{user?.name}</span>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2">Personal data:</h2>
                <div className="flex flex-col gap-1 mb-4">
                  <label htmlFor="name" className="font-medium text-gray-700">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    value={tempUser.name}
                    onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1 mb-4">
                  <label htmlFor="email" className="font-medium text-gray-700">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    value={tempUser.email}
                    onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
                  />
                </div>
              </>
            )}
            <h2 className="text-xl font-semibold mb-2">Your items:</h2>
            <ul className="space-y-2 mb-4">
              {products.map((item) => (
                <li key={item.productId} className="flex justify-between items-center text-gray-800">
                  <span>{item.name}</span>
                  <span>${item.price} x {item.quantity} = <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span></span>
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold text-right">Total: <span className="text-green-600">${products.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span></p>
          </div>
          <div className="bg-zinc-100 rounded-lg p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2">Your delivery address:</h2>
            {/* Komponent formularza adresu */}
            <DeliveryAddressForm messageType={messageType} setMessageType={setMessageType} address={address} setAddress={handleAddressChange} />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {(messageType === "success") ? (
            <button type="submit" className="px-8 py-3 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-700 transition-colors shadow">
              Confirm Order
            </button>
          ) : (
            <button type="submit" disabled={true} className="px-8 py-3 bg-stone-600 text-white rounded-lg font-semibold  shadow">
              Confirm Order
            </button>
          )}
        </div>
        {orderMessage && <p className="text-center mt-4 font-bold">{orderMessage}</p>}
      </form>
    </div>
  );
}
export default Summary;
