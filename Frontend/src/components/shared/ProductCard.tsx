import toast from "react-hot-toast";
import { useCartStore } from "../../zustand/cartStore";



function ProductCard({ name, description, price, imageUrl, _id }: { name: string; description: string; price: number; imageUrl: string; _id: string }) {
   const { addToCart } = useCartStore();
  // Obsługuje dodanie produktu do koszyka
   const handleAddToCart = () => {
       const item = {
           productId: _id,
           name,
           price,
           quantity: 1,
           image: imageUrl
       };
       toast.success(`${name} added to cart!`);
       addToCart(item);
   };

   return (
     <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 gap-4 hover:shadow-xl hover:scale-[1.02] transition-transform transition-shadow border border-gray-200">
       <img src={imageUrl} alt={name} className="rounded-md w-full h-64 object-cover border border-gray-300" />
       <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
       <p className="text-gray-600 mb-2 line-clamp-3">{description}</p>
       <span className="text-lg font-bold text-green-700 mb-2">${price.toFixed(2)}</span>
       <button
         onClick={handleAddToCart}
         className="w-full px-4 py-2 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-700 transition-colors shadow"
       >
         Add to Cart
       </button>
     </div>
   );
 }
export default ProductCard;