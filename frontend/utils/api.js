import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data) => api.put("/auth/profile", data),
  updateLanguage: (language) =>
    api.put("/auth/update-language", { language }),
};

export const productAPI = {
  getAll: (params) => api.get("/products", { params }),
  getAllAdmin: (params) => api.get("/products/admin/all", { params }),
  getById: (id) => api.get(`/products/${id}`),
  getByUseCase: (useCase) =>
    api.get(`/products/use-case/${useCase}`),
  getPopular: () => api.get("/products/popular"),
  compare: (productIds) =>
    api.post("/products/compare", { productIds }),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

export const orderAPI = {
  create: (data) => api.post("/orders/create", data),
  verify: (data) => api.post("/orders/verify", data),
  getUserOrders: () => api.get("/orders/my-orders"),
  getAllOrders: () => api.get("/orders/all-orders"),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) =>
    api.put(`/orders/${id}/status`, { orderStatus: status }),
};

export const enquiryAPI = {
  create: (data) => api.post("/enquiries/create", data),
  getAll: () => api.get("/enquiries"),
  updateStatus: (id, status) =>
    api.put(`/enquiries/${id}/status`, { status }),
  delete: (id) => api.delete(`/enquiries/${id}`),
};

export const settingsAPI = {
  get: () => api.get("/settings"),
  update: (data) => api.put("/settings", data),
};

export default api;
