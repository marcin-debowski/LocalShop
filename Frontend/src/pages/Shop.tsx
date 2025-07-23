import ProductCard from "../components/shared/ProductCard"
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import type { Product } from "../types/product.types";

function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products/all");
        setProducts(res.data as Product[]); // Backend zwraca tablicę produktów
      } catch (err) {
        console.error("Błąd przy pobieraniu produktów:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>ShopPage</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto p-4 my-4">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </>
  );
}
export default Shop;

