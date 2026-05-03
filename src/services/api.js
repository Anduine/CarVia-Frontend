import axios from "axios";
import { loadConfig } from "../utils/config";

const baseURL = await loadConfig();

const api = axios.create({
  baseURL: baseURL.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete config.headers["Authorization"];
  }
  return config;
});

export default api;
