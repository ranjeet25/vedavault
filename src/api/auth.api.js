import api from "./axiosInstance";

export const AuthAPI = {
  // Customer Registration
  registerCustomer: ({ mobile, password, name, email, address }) =>
    api.post("/auth/register/customer", {
      mobile,
      password,
      name,
      email,
      address,
    }),

  // Distributor Registration
  registerDistributor: ({
    mobile,
    password,
    name,
    aadhaar,
    pan,
    dob,
    bankDetails,
    address,
    referralCode,
  }) =>
    api.post("/auth/register/distributor", {
      mobile,
      password,
      name,
      aadhaar,
      pan,
      dob,
      bankDetails,
      address,
      referralCode,
    }),

  // Login (Customer / Distributor / Admin)
  login: ({ mobile, password }) =>
    api.post("/auth/login", {
      mobile,
      password,
    }),

  // ✅ Get logged-in user (requires backend route)
  getProfile: () =>
    api.get("/auth/me"),
};
