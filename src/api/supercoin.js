import api from "./axiosInstance";

export const SuperCoinAPI = {
  getWallet: () =>
    api.get("/supercoins/wallet"),

  getHistory: () =>
    api.get("/supercoins/history"),

  validateUsage: (coins) =>
    api.post("/supercoins/validate", { coins })
};
