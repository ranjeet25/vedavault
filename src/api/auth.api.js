import api from "./axiosInstance";

export const AuthAPI = {
  // Register
  register: ({ username, password, name }) =>
    api.post("/auth/register", {
      username,
      password,
      name,
    }),

  // Login
  login: ({ username, password }) =>
    api.post("/auth/login", {
      username,
      password,
    }),

  // Logged-in user
  getProfile: () =>
    api.get("/auth/me"),

  // Logout
  logout: () =>
    api.post("/auth/logout"),
};
