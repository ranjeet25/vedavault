import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import AboutUs from "./pages/AboutUs"

export default function App() {
const [cart, setCart] = useState([])


const addToCart = product => setCart([...cart, product])


return (
<BrowserRouter>
<Navbar cartCount={cart.length} />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/products" element={<Products />} />
<Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
<Route path="/cart" element={<Cart cart={cart} />} />
<Route path="/about-us" element={<AboutUs/>} />
</Routes>
</BrowserRouter>
)
}