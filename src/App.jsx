import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import Distributers from "./pages/Distributers";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import DistributorRegistration from "./pages/DistributorRegistration";
import CustomerRegistration from "./pages/CustomerRegistration";
import OrderStatus from "./components/dashboard/Admin/OrderStatus";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AddNewProducts from "./components/dashboard/Admin/AddNewProducts";
import StockManagment from "./components/dashboard/Admin/StockManagment";
import EditProduct from "./components/dashboard/Admin/EditProduct";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/distributers" element={<Distributers />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/d-register" element={<DistributorRegistration />} />
        <Route path="/c-register" element={<CustomerRegistration />} />
        <Route path="/admin" element={<Admin></Admin>} />
        <Route path="/admin-login" element={<AdminLogin></AdminLogin>} />
        <Route path="/admin/orders/:id" element={<OrderStatus />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/admin/addProducts" element={<AddNewProducts />} />
        <Route path="/admin/stockmanagment" element={<StockManagment />} />
        <Route path="/admin/products/:id/edit" element={<EditProduct />} />
      </Routes>
    </>
  );
}
