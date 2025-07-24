import { useCartStore } from "../../zustand/cartStore";
import type { ShoppingCartCardProps } from "../../types/product.types";



function ShoppingCartCard({ item: { productId, name, price, quantity, image } }: ShoppingCartCardProps) {
  const { removeFromCart, updateQuantity } = useCartStore();

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity)) {
            updateQuantity(productId, newQuantity);
        }
    };
  return (
    <div className="mt-4 border p-4 rounded shadow-md grid grid-cols-9 items-center gap-4">
        <img className="w-24 h-24 object-cover col-span-2" src={image} alt={name} />
        <h2 className="font-semibold col-span-3">{name}</h2>
        <span className="col-span-3 grid grid-cols-5 items-center">
            <span className="col-span-1"> ${Number(price).toFixed(2)}</span>
            <span className="col-span-1">X</span>
            <input onChange={handleQuantityChange} className="col-span-1 text-center border rounded p-1" type="number" defaultValue={quantity} min={1}/>
            <span className="col-span-1 text-center">=</span>
            <span className="col-span-1"> ${Number(price * quantity).toFixed(2)}</span>
        </span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors" onClick={() => handleRemove(productId)}>
          Remove
        </button>
    </div>
  );
}
export default ShoppingCartCard;