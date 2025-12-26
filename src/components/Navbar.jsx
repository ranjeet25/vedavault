import { Link } from "react-router-dom";
import { ShoppingBag, CircleUser, Menu } from "lucide-react";
import logo from "../assets/SVG/vedavaultlogo.svg";

export default function Navbar({ cartCount }) {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">
      
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link to="/">
          <img src={logo} alt="logo" className="h-16 w-auto" />
        </Link>
      </div>

      {/* Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/supercoin">For Distributers</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
        </ul>
      </div>

      {/* Right: Mobile Menu + Icons */}
      <div className="navbar-end gap-2">

        {/* Mobile Hamburger (Links Only) */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <Menu />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/supercoin">For Distributers</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
          </ul>
        </div>

        {/* Login */}
        <Link to="/login" className="btn btn-ghost btn-circle">
          <CircleUser />
        </Link>

        {/* Cart */}
        <Link to="/cart" className="btn btn-ghost btn-circle relative">
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
