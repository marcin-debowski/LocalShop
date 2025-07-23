import { Navigate } from "react-router-dom";
import { useAuthStore } from "../zustand/authStore";
import { useState } from "react";
import axios from "../lib/axios";
import type { AddProductResponse } from "../types/product.types";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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

  const user = useAuthStore((state) => state.user);
  //sprawdzenie czy użytkownik jest zalogowany i ma rolę sprzedawcy
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
            className="w-full p-2 border rounded"
            value={form.price}
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
export default AddProduct;
