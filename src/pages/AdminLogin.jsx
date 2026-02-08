import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials
    if (
      username === "mahesh123" &&
      password === "admin@vedavault123#"
    ) {
      setError("");
      navigate("/admin"); // ✅ redirect
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-center mb-4">
            Admin Login
          </h2>

          {error && (
            <p className="text-error text-sm text-center mb-2">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Admin Username"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Admin Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-accent w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
