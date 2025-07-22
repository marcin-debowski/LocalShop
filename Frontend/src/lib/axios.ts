// src/lib/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // port backendu
  withCredentials: true, // umożliwia wysyłanie ciasteczek
});

export default instance;
