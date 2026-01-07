import api from "./axiosInstance";

export const ProductAPI = {
  getAll: () => api.get("/products"),

  getById: (id) => api.get(`/products/${id}`),

  getByCategory: (category) =>
    api.get(`/products?category=${category}`),
};
