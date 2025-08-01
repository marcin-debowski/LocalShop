import { useState } from "react";
import axios from "../lib/axios";
import type { RegisterResponse } from "../types/auth.types";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  // Obsługuje zmianę danych w formularzu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // Obsługuje wysyłanie formularza rejestracji
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post<RegisterResponse>("/auth/register", form);
      setMessage(res.data.message);
      setMessageType("success");
      setForm({ name: "", email: "", password: "" });
    } catch (err: any) {
      setMessage(err.response?.data?.message ?? "An unexpected error occurred");
      setMessageType("error");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-flow-col grid-rows-11 min-w-md bg-zinc-100 rounded-md justify-items-center pt-5 pb-5  mt-30 "
      >
        <h1 className="">Register</h1>
        <label htmlFor="email" className="w-3/4 text-left content-center">
          Email
        </label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="w-3/4 border-stone-400 border-2 rounded-sm focus:border-stone-900"
          value={form.email}
        />

        <label htmlFor="name" className="w-3/4 text-left content-center">
          Name
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="w-3/4 border-stone-400 border-2 rounded-sm focus:border-stone-900"
          value={form.name}
        />

        <label htmlFor="password" className="w-3/4 text-left content-center">
          Password
        </label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="w-3/4   border-stone-400 border-2 rounded-sm focus:border-stone-900"
          value={form.password}
        />

        <label
          htmlFor="passwordAgain"
          className="w-3/4 text-left content-center"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="passwordAgain"
          id="passwordAgain"
          placeholder="Confirm Password"
          className="w-3/4   border-stone-400 border-2 rounded-sm focus:border-stone-900"
          
        />
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

        <button className="w-1/2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">
          Sign up
        </button>
      </form>
    </>
  );
}
export default Register;
