import api from "./axiosInstance";

export const OrderAPI = {
  placeOrder: (orderPayload) =>
    api.post("/orders", orderPayload),

  getMyOrders: () =>
    api.get("/orders/my"),

  getOrderById: (orderId) =>
    api.get(`/orders/${orderId}`)
};
