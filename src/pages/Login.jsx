import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 DEMO credentials
    const DEMO_USER = {
      username: "demo",
      password: "demo123",
    };

    if (
      form.username === DEMO_USER.username &&
      form.password === DEMO_USER.password
    ) {
      // simulate login
      localStorage.setItem(
        "demoUser",
        JSON.stringify({ username: "demo" })
      );

      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-6 rounded w-full max-w-sm shadow"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Demo Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full mb-3"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="btn btn-primary w-full">
          Login
        </button>

        {/* Demo hint */}
        <p className="text-xs text-gray-500 mt-3 text-center">
          Securecredentials: <br />
          <span className="font-mono">demo / demo123</span>
        </p>
      </form>
    </div>
  );
}
