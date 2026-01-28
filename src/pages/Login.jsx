import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthAPI } from "../api/auth.api";

export default function Login() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("customer"); // UI only
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
      console.log(form);
      // login API calling
      const res = await AuthAPI.login({
      mobile: form.mobile,
      password: form.password,
    });

      if (!res.success) {
        throw new Error("Login failed");
      }

      // Save auth data
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // Role-based redirect (backend-driven)
      if (res.user.role === "DISTRIBUTOR") {
        navigate("/admin");
      } else {
        navigate("/customer");
      }
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data?.message || "Invalid mobile or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CUSTOMER LOGIN */}
          <div
            className={`card shadow-lg transition-all cursor-pointer ${
              userType === "customer"
                ? "ring-2 ring-primary"
                : "opacity-75 hover:opacity-100"
            }`}
            onClick={() => {
              setUserType("customer");
              setError("");
            }}
          >
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title">Customer Login</h2>
                <input
                  type="radio"
                  checked={userType === "customer"}
                  onChange={() => setUserType("customer")}
                  className="radio radio-primary"
                />
              </div>

              {userType === "customer" ? (
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
                    Not existing user?{" "}
                    <Link
                      to="/c-register"
                      className="font-bold link link-primary"
                    >
                      Register
                    </Link>
                  </p>
                </form>
              ) : (
                <p className="text-sm text-center opacity-60 py-8">
                  Click to switch to Customer Login
                </p>
              )}
            </div>
          </div>

          {/* DISTRIBUTOR LOGIN */}
          <div
            className={`card shadow-lg transition-all cursor-pointer ${
              userType === "distributer"
                ? "ring-2 ring-secondary"
                : "opacity-75 hover:opacity-100"
            }`}
            onClick={() => {
              setUserType("distributer");
              setError("");
            }}
          >
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title">Distributor Login</h2>
                <input
                  type="radio"
                  checked={userType === "distributer"}
                  onChange={() => setUserType("distributer")}
                  className="radio radio-secondary"
                />
              </div>

              {userType === "distributer" ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Registered Mobile Number"
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
                    className="btn btn-secondary w-full"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>

                  <p className="text-sm text-center">
                    Not registered?{" "}
                    <Link
                      to="/d-register"
                      className="font-bold link link-secondary"
                    >
                      Request Distributor ID
                    </Link>
                  </p>
                </form>
              ) : (
                <p className="text-sm text-center opacity-60 py-8">
                  Click to switch to Distributor Login
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm opacity-60">
          Select your login type to continue
        </p>
      </div>
    </div>
  );
}
