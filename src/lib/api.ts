import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_CORS_PROXY_DEV;

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
