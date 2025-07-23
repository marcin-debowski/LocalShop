
function ProductCard({ name, description, price, imageUrl }: { name: string; description: string; price: number; imageUrl: string }) {
   return (
     <div className="grid grid-cols-1 gap-4 rounded-md shadow-md hover:shadow-xl hover:scale-105 transition-transform transition-shadow">
       <img src={imageUrl} alt={name} className="rounded-t-md" />
       <h3>{name}</h3>
       <p>{description}</p>
       <span>${price}</span>
     </div>
   );
 }
export default ProductCard;