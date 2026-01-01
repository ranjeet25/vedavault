import { useState } from "react";
import { useCart } from "../context/CartContext";
import { ShieldCheck } from "lucide-react";
import Header from "../components/Reuseable/Header";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMode: "UPI",
    transactionId: "",
  });

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

  const handlePlaceOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    if (form.paymentMode === "UPI" && !form.transactionId) {
      alert("Please enter UPI Transaction ID");
      return;
    }

    alert("Order placed successfully 🎉");
    clearCart();
  };

  return (
    <section className="max-w-6xl mx-auto px-4 pb-4">
        <Header heading="Checkout"></Header>
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT: FORM */}
        <div className="lg:col-span-2 space-y-6">

          {/* Contact */}
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Full Name"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
              <input
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone Number"
                className="input input-bordered w-full md:col-span-2"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address */}
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              Shipping Address
            </h3>
            <textarea
              name="address"
              rows="4"
              placeholder="Full delivery address"
              className="textarea textarea-bordered w-full"
              onChange={handleChange}
            />
          </div>

          {/* Payment */}
          <div className="border rounded-lg p-6 space-y-4">
            <h3 className="font-semibold">
              Payment Method
            </h3>

            {/* UPI */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMode"
                value="UPI"
                checked={form.paymentMode === "UPI"}
                onChange={handleChange}
              />
              UPI Payment
            </label>

            {form.paymentMode === "UPI" && (
              <div className="bg-base-200 p-4 rounded-md space-y-2 text-sm">
                <p>
                  <strong>UPI ID:</strong>{" "}
                  vedavault@upi
                </p>
                <input
                  name="transactionId"
                  placeholder="Enter Transaction ID"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />
              </div>
            )}

            {/* COD */}
            {codAvailable ? (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMode"
                  value="COD"
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>
            ) : (
              <p className="text-sm text-gray-500">
                Cash on Delivery not available for one or more items
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="border rounded-lg p-6 h-fit bg-base-200">
          <h3 className="text-lg font-semibold mb-4">
            Order Summary
          </h3>

          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-sm mb-2"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <div className="border-t my-4"></div>

          <div className="flex justify-between font-semibold mb-6">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="btn btn-primary w-full gap-2"
          >
            <ShieldCheck size={18} />
            Confirm Order
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Your payment details are securely verified
          </p>
        </div>
      </div>
    </section>
  );
}
