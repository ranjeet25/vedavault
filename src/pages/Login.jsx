import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthAPI } from "../api/auth.api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.mobile || !form.password) {
      setError("Mobile number and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await AuthAPI.login({
        mobile: form.mobile,
        password: form.password,
      });

      // ✅ axios response handling
      const { success, token, user } = res;

      if (!success) {
        throw new Error("Login failed");
      }

      // Save auth data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect (customer dashboard)
      navigate("/customer");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.message || "Invalid mobile or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
      <div className="w-full max-w-md">
        <div className="card shadow-lg bg-base-100">
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Customer Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Mobile Number"
                className="input input-bordered w-full"
                value={form.mobile}
                onChange={(e) =>
                  setForm({ ...form, mobile: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              {error && (
                <div className="alert alert-error text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-sm text-center">
                New user?{" "}
                <Link
                  to="/c-register"
                  className="font-bold link link-primary"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>

        <p className="text-center mt-6 text-sm opacity-60">
          Secure customer login
        </p>
      </div>
    </div>
  );
}
