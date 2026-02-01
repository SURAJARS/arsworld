import axios from "axios";

/**
 * IMPORTANT:
 * This project uses Vite.
 * So environment variables MUST come from import.meta.env
 * and MUST start with VITE_
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "❌ VITE_API_BASE_URL is not defined. Check your environment variables."
  );
}

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/**
 * Attach JWT token if present (client-side only)
 */
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* =========================
   AUTH API
========================= */
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data) => api.put("/auth/profile", data),
  updateLanguage: (language) =>
    api.put("/auth/update-language", { language }),
};

/* =========================
   PRODUCT API
========================= */
export const productAPI = {
  getAll: (params) => api.get("/products", { params }),
  getAllAdmin: (params) =>
    api.get("/products/admin/all", { params }),
  getById: (id) => api.get(`/products/${id}`),
  getByUseCase: (useCase) =>
    api.get(`/products/use-case/${useCase}`),
  getPopular: () => api.get("/products/popular"),
  compare: (productIds) =>
    api.post("/products/compare", { productIds }),
  create: (data) => api.post("/products", data),
  update: (id, data) =>
    api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

/* =========================
   ORDER API
========================= */
export const orderAPI = {
  // Guest checkout (NO AUTH REQUIRED)
  create: (data) => api.post("/orders/create", data),

  // Razorpay verification
  verify: (data) => api.post("/orders/verify", data),

  // User orders
  getUserOrders: () => api.get("/orders/my-orders"),

  // Admin
  getAllOrders: () => api.get("/orders/all-orders"),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) =>
    api.put(`/orders/${id}/status`, {
      orderStatus: status,
    }),
};

/* =========================
   ENQUIRY API
========================= */
export const enquiryAPI = {
  create: (data) => api.post("/enquiries/create", data),
  getAll: () => api.get("/enquiries"),
  updateStatus: (id, status) =>
    api.put(`/enquiries/${id}/status`, { status }),
  delete: (id) => api.delete(`/enquiries/${id}`),
};

/* =========================
   SETTINGS API
========================= */
export const settingsAPI = {
  get: () => api.get("/settings"),
  update: (data) => api.put("/settings", data),
};

export default api;
