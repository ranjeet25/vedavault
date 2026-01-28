import { User, ShieldCheck, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

export default function CustomerProfile() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body text-center text-sm text-error">
          User not found. Please login again.
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    clearCart(); // ✅ properly clears cart
    navigate("/login");
  };

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-full">
            <User className="text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Customer</h2>
            <p className="text-sm text-gray-500">Welcome back 👋</p>
          </div>
        </div>

        <div className="divider my-2"></div>

        {/* Details */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-900 text-xs font-semibold px-2 py-1 rounded-full">
              User ID
            </span>
            <span className="break-all">{user.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-500" />
            <span className="uppercase text-xs font-semibold">
              {user.role}
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="btn btn-outline btn-error btn-sm mt-4 flex items-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
