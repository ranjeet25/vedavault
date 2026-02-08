import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ShieldCheck, Truck, Coins } from "lucide-react";
import Header from "../components/Reuseable/Header";
import Footer from "../components/Reuseable/Footer";
import { OrderAPI } from "../api/order.api";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMode: "UPI",
    transactionId: "",
  });

  useEffect(() => {
    // Prefill from localStorage if available later
    setForm((prev) => ({
      ...prev,
      name: prev.name || "",
      email: prev.email || "",
      phone: prev.phone || "",
    }));
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const codAvailable = cart.every(
    (item) => item.codAvailable !== false
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handlePlaceOrder = async () => {
  // 🔐 Check login
  if (!user || !user.id) {
    alert("You need to register or login first to place an order");
    return;
  }

  if (!cart.length) return alert("Cart is empty");

  if (!form.name || !form.phone || !form.address) {
    return alert("Please fill all required fields");
  }

  if (form.paymentMode === "UPI" && !form.transactionId) {
    return alert("Please enter UPI Transaction ID");
  }

  try {
    const payload = {
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        superCoinsEarned: item.superCoinsEarned || 0,
        estimatedDeliveryDays: item.estimatedDeliveryDays || "3-5",
      })),

      customer: {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
      },

      payment: {
        mode: form.paymentMode,
        transactionId:
          form.paymentMode === "UPI" ? form.transactionId : null,
      },

      totalAmount: subtotal,
    };

    await OrderAPI.placeOrder(payload);

    alert("Order placed successfully 🎉");
    clearCart();
  } catch (err) {
    console.error(err);
    alert(
      err?.response?.data?.message || "Failed to place order"
    );
  }
};


  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <Header heading="Checkout" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* CONTACT */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="font-semibold mb-4">
                 Secondary Contact Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    placeholder="Full Name"
                    className="input input-bordered"
                    value={form.name}
                    onChange={handleChange}
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    className="input input-bordered md:col-span-2"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="font-semibold mb-4">
                  Shipping Address
                </h3>
                <textarea
                  name="address"
                  rows="3"
                  placeholder="Full delivery address"
                  className="textarea textarea-bordered"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* PAYMENT */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body space-y-3">
                <h3 className="font-semibold">
                  Payment Method
                </h3>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="UPI"
                    checked={form.paymentMode === "UPI"}
                    onChange={handleChange}
                  />
                  UPI
                </label>

                {form.paymentMode === "UPI" && (
                  <input
                    name="transactionId"
                    placeholder="UPI Transaction ID"
                    className="input input-bordered"
                    onChange={handleChange}
                  />
                )}

                {codAvailable && (
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="COD"
                      onChange={handleChange}
                    />
                    Cash on Delivery
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="card bg-base-200 shadow-sm sticky top-24 h-fit">
            <div className="card-body">
              <h3 className="font-semibold mb-4">
                Order Summary
              </h3>

              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3 mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1 text-sm">
                    <p className="font-medium">{item.name}</p>
                    <p>Qty: {item.quantity}</p>

                    <div className="flex gap-3 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Truck size={14} />
                        {item.estimatedDeliveryDays} days
                      </span>

                      <span className="flex font-medium items-center gap-1 text-amber-600">
                        <Coins size={14} />
                         Earn {item.superCoinsEarned * item.quantity} Super coins
                      </span>
                    </div>
                  </div>

                  <span className="font-semibold">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}

              <div className="divider" />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="btn btn-primary w-full mt-4 gap-2"
              >
                <ShieldCheck size={18} />
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
