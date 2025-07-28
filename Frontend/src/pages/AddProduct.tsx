import { Navigate } from "react-router-dom";
import { useAuthStore } from "../zustand/authStore";
import { useState, useEffect } from "react";
import axios from "../lib/axios";
import type { AddProductResponse } from "../types/product.types";

function AddProduct() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: 0.0,
    category: "",
    stock: 0,
  });

  // Obsługuje zmianę danych w formularzu
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // Obsługuje wysyłanie formularza dodania produktu
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post<AddProductResponse>(
        "/products/add",
        form, {withCredentials: true}
      );
      setMessage(res.data.message);
      setMessageType("success");
      setForm({
        name: "",
        imageUrl: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
      });
    } catch (err: any) {
      setMessage(err.response?.data?.message ?? "An unexpected error occurred");
      setMessageType("error");
    }
  };
  // Pobiera użytkownika z store
  const user = useAuthStore((state) => state.user);
  //sparwadznie czy użytkownik jest zalogowany i ma rolę sprzedawcy
  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);
  console.log("User in AddProduct:", user);
  //sprawdzenie czy użytkownik jest zalogowany i ma rolę sprzedawcy
  if (loading) return <div className="flex justify-center items-center h-40 text-lg">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "seller") return <Navigate to="/" />;


  return (
    <div>
      <h1>Add Product</h1>
      <p className="text-gray-600 mb-4">
        Fill in the details below to add a new product.
      </p>
      <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="name">
            Product Name
          </label>
          <input
            onChange={handleChange}
            name="name"
            type="text"
            className="w-full p-2 border rounded"
            value={form.name}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            onChange={handleChange}
            name="imageUrl"
            type="text"
            className="w-full p-2 border rounded"
            value={form.imageUrl}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            onChange={handleChange}
            name="description"
            className="w-full p-2 border rounded"
            value={form.description}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="price">
            Price
          </label>
          <input
            onChange={handleChange}
            name="price"
            type="number"
            step="0.01"
            className="w-full p-2 border rounded"
            value={form.price === 0  ? "" : Number(form.price).toFixed(2)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="category">
            Category
          </label>
          <input
            onChange={handleChange}
            name="category"
            type="text"
            className="w-full p-2 border rounded"
            value={form.category}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="stock">
            Stock
          </label>
          <input
            onChange={handleChange}
            name="stock"
            type="number"
            className="w-full p-2 border rounded"
            value={form.stock}
          />
        </div>
        <p
          className={
            messageType === "success"
              ? "text-green-500"
              : messageType === "error"
              ? "text-red-500"
              : ""
          }
        >
          {message && <>{message}</>}
        </p>
        <button
          type="submit"
          className="bg-stone-900 hover:bg-stone-700 text-white px-4 py-2 rounded transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
export default AddProduct;
