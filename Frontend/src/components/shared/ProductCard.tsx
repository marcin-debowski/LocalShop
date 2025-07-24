import toast from "react-hot-toast";
import { useCartStore } from "../../zustand/cartStore";



function ProductCard({ name, description, price, imageUrl, _id }: { name: string; description: string; price: number; imageUrl: string; _id: string }) {
   const { addToCart } = useCartStore();

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
     <div className="grid grid-cols-1 gap-4 rounded-md shadow-md hover:shadow-xl hover:scale-105 transition-transform transition-shadow">
       <img src={imageUrl} alt={name} className="rounded-t-md w-full h-96 object-cover" />
       <h3>{name}</h3>
       <p>{description}</p>
       <span>${price}</span>
       <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
         Add to Cart
       </button>
     </div>
   );
 }
export default ProductCard;