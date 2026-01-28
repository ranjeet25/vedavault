import { useState } from "react";
import api from "../api";

function CustomerRegistration() {
  const [form, setForm] = useState({
    mobile: "",
    password: "",
    name: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!/^[6-9]\d{9}$/.test(form.mobile))
      newErrors.mobile = "Enter valid 10-digit mobile number";

    if (!form.name) newErrors.name = "Name is required";

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter valid email";

    if (!form.address) newErrors.address = "Address is required";

    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("/auth/register/customer", form);

      alert("Customer registered successfully!");
      setForm({
        mobile: "",
        password: "",
        name: "",
        email: "",
        address: "",
      });

    } catch (error) {
      setApiError(
        error?.response?.data?.message || "Registration failed"
      );

      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create New Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Mobile */}
            <div>
              <input
                name="mobile"
                placeholder="Mobile Number"
                className="input input-bordered w-full"
                value={form.mobile}
                onChange={handleChange}
              />
              <p className="text-error text-sm">{errors.mobile}</p>
            </div>

            {/* Name */}
            <div>
              <input
                name="name"
                placeholder="Full Name"
                className="input input-bordered w-full"
                value={form.name}
                onChange={handleChange}
              />
              <p className="text-error text-sm">{errors.name}</p>
            </div>

            {/* Email */}
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
                value={form.email}
                onChange={handleChange}
              />
              <p className="text-error text-sm">{errors.email}</p>
            </div>

            {/* Address */}
            <div>
              <textarea
                name="address"
                placeholder="Full Address"
                className="textarea textarea-bordered w-full"
                rows={3}
                value={form.address}
                onChange={handleChange}
              />
              <p className="text-error text-sm">{errors.address}</p>
            </div>

            {/* Password */}
            <div>
              <input
                name="password"
                type="password"
                placeholder="Create Password"
                className="input input-bordered w-full"
                value={form.password}
                onChange={handleChange}
              />
              <p className="text-error text-sm">{errors.password}</p>
              <p className="text-xs opacity-60">
                Minimum 6 characters
              </p>
            </div>

            {/* API Error */}
            {apiError && (
              <p className="text-error text-sm text-center">
                {apiError}
              </p>
            )}

            {/* Submit */}
            <button
              className="btn btn-secondary w-full"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register Customer"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegistration;
