import api from "./axiosInstance";

export const CartAPI = {
  getCart: () => api.get("/cart"),

  addToCart: (product) =>
    api.post("/cart", product),

  updateQuantity: (productId, quantity) =>
    api.put(`/cart/${productId}`, { quantity }),

  removeItem: (productId) =>
    api.delete(`/cart/${productId}`),
};
