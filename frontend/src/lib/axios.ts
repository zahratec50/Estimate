import axios from "axios";

const api = axios.create({
  baseURL: "/", // یا NEXT_PUBLIC_API_BASE در صورت نیاز
  withCredentials: true, // ارسال کوکی HttpOnly
  headers: { "Content-Type": "application/json" },
});

export default api;
