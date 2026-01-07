import { createContext, useContext, useEffect, useState } from "react";
import { AuthAPI } from "../api/auth.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    AuthAPI.getProfile()
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async ({ username, password }) => {
    const { data } = await AuthAPI.login({ username, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const register = async ({ username, password, name }) => {
    const { data } = await AuthAPI.register({ username, password, name });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = async () => {
    await AuthAPI.logout();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
