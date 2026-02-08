import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, CircleUser, Menu, LogOut } from "lucide-react";
import logo from "../assets/SVG/vedavaultlogo.svg";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">

      {/* LEFT : LOGO */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Vedavault"
            className="h-14 w-auto"
          />
        </Link>
      </div>

      {/* CENTER : DESKTOP MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/distributers">For Distributers</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/admin-login">Admin</Link></li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-1">

        {/* MOBILE MENU */}
        <div className="dropdown dropdown-end lg:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
          >
            <Menu />
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/distributers">For Distributers</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/admin-login">Admin</Link></li>

            {user ? (
              <>
                <li><Link to="/customer">My Account</Link></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </div>

        {/* USER ICON / LOGOUT */}
        {user ? (
          <div className="dropdown dropdown-end hidden lg:block">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <CircleUser />
            </label>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
            >
              <li><Link to="/customer">My Profile</Link></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-error flex gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-ghost btn-circle"
          >
            <CircleUser />
          </Link>
        )}

        {/* CART */}
        <Link
          to="/cart"
          className="btn btn-ghost btn-circle relative"
        >
          <ShoppingBag />
          {cartCount > 0 && (
            <span className="badge badge-sm badge-primary absolute -top-1 -right-1">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
