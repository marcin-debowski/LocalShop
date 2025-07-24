import DeliveryAddressForm from "../components/shared/DeliveryAdressForm";
import {useAuthStore} from "../zustand/authStore";
import {useCartStore} from "../zustand/cartStore";


function Summary() {
  const user = useAuthStore((state) => state.user);
  const products = useCartStore((state) => state.cart);
  return (
    <div className="w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Order Summary</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-100 rounded-lg p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2">Your account:</h2>
          <span className="text-gray-700 font-medium mb-4">{user?.name}</span>
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
          <DeliveryAddressForm />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button type="submit" className="px-8 py-3 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-700 transition-colors shadow">Confirm Order</button>
      </div>
    </div>
  );
}
export default Summary;
