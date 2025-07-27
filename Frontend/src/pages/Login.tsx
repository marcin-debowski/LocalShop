import { useState } from "react";
import axios from "../lib/axios";
import type { LoginResponse } from "../types/auth.types";
import { useAuthStore } from "../zustand/authStore";
import { useNavigate } from "react-router-dom";

function Login({ path }: { path: string }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const fetchUser = useAuthStore((state) => state.fetchUser);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post<LoginResponse>("/auth/login", form);
      await fetchUser();
      navigate(path);
    } catch (err: any) {
      console.error("Error logging in:", err);
      setMessage(err.response?.data?.message ?? "An unexpected error occurred");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="h-full grid grid-flow-col grid-rows-7 gap-3 min-w-md bg-zinc-100 rounded-md justify-items-center pt-5 pb-5"
      >
        <h1 className="">Log in</h1>

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
        <p className={message ? "text-red-500" : ""}>
          {message && <>{message}</>}
        </p>
        <button className="w-1/2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">
          Log in
        </button>
      </form>
    </>
  );
}
export default Login;
