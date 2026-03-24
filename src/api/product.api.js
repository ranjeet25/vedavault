import api from "./axiosInstance";

export const ProductAPI = {
  getAll: () => api.get("/products"),

  getById: (id) => api.get(`/products/${id}`),

  getByCategory: (category) => api.get(`/products?category=${category}`),
  
  update: (id, payload) => api.patch(`/products/${id}`, payload),

  delete: (id) => api.delete(`/products/${id}`),
};
