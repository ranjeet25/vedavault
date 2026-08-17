import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ShieldCheck, Truck, Coins } from "lucide-react";
import Header from "../components/Reuseable/Header";
import Footer from "../components/Reuseable/Footer";
import { OrderAPI } from "../api/order.api";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const formatOrderId = () => `VEDA${Math.floor(100000 + Math.random() * 900000)}`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    referralCode: "",
    paymentMode: "UPI",
    transactionId: "",
  });
  const [errors, setErrors] = useState({});
  const [placedOrderId, setPlacedOrderId] = useState("");

  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem("checkoutForm")) || {};
    setForm((prev) => ({
      ...prev,
      ...savedForm,
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem("checkoutForm", JSON.stringify(form));
  }, [form]);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const codAvailable = cart.every(
    (item) => item.codAvailable !== false
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!form.address.trim()) newErrors.address = "Delivery address is required";

    if (form.paymentMode === "UPI") {
      if (!form.transactionId.trim()) {
        newErrors.transactionId = "UPI transaction ID is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!cart.length) {
      return alert("Cart is empty");
    }

    if (!validateForm()) {
      return;
    }

    const orderId = formatOrderId();
    const payload = {
      orderId,
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
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

    try {
      //await OrderAPI.placeOrder(payload);

      const formBoldPayload = new FormData();
      formBoldPayload.append("orderId", orderId);
      formBoldPayload.append("email", form.email);
      formBoldPayload.append("phone", form.phone);
      formBoldPayload.append("address", form.address);
      formBoldPayload.append("referralCode", form.referralCode || "N/A");
      formBoldPayload.append("paymentMode", form.paymentMode);
      formBoldPayload.append(
        "transactionId",
        form.paymentMode === "UPI" ? form.transactionId : "N/A"
      );
      formBoldPayload.append("totalAmount", subtotal);

      formBoldPayload.append(
        "products",
        JSON.stringify(
          cart.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          }))
        )
      );

      await fetch("https://formbold.com/s/oeYVR", {
        method: "POST",
        body: formBoldPayload,
      });

      setPlacedOrderId(orderId);
      setForm((prev) => ({
        ...prev,
        transactionId: "",
      }));
      localStorage.setItem(
        "checkoutForm",
        JSON.stringify({ ...form, transactionId: "" })
      );
      alert(`Order placed successfully 🎉\nYour order ID is ${orderId}. Please keep this for future reference.`);
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
                <h3 className="font-semibold mb-6">
                 Secondary Contact Information
                </h3>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      name="name"
                      placeholder="Enter your full name"
                      className="input input-bordered w-full"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      name="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      name="phone"
                      placeholder="Enter your 10-digit phone number"
                      className="input input-bordered w-full"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Referral Code <span className="text-gray-400">(Optional)</span></label>
                    <input
                      name="referralCode"
                      placeholder="Enter referral code if available"
                      className="input input-bordered w-full"
                      value={form.referralCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="font-semibold mb-6">
                  Shipping Address
                </h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Delivery Address</label>
                  <textarea
                    name="address"
                    rows="4"
                    placeholder="Enter your complete delivery address"
                    className="textarea textarea-bordered w-full resize-none"
                    value={form.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-600">{errors.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body space-y-4">
                <h3 className="font-semibold mb-2">
                  Payment Method
                </h3>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="UPI"
                    checked={form.paymentMode === "UPI"}
                    onChange={handleChange}
                  />
                  <span className="font-medium">UPI</span>
                </label>

                {form.paymentMode === "UPI" && (
                  <div className="space-y-2 pl-8">
                    <label className="text-sm font-medium text-gray-700">UPI Transaction ID</label>
                    <input
                      name="transactionId"
                      placeholder="Enter UPI transaction ID"
                      className="input input-bordered w-full"
                      value={form.transactionId}
                      onChange={handleChange}
                    />
                    {errors.transactionId && (
                      <p className="text-xs text-red-600">
                        {errors.transactionId}
                      </p>
                    )}
                  </div>
                )}

                {codAvailable && (
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="COD"
                      checked={form.paymentMode === "COD"}
                      onChange={handleChange}
                    />
                    <span className="font-medium">Cash on Delivery</span>
                  </label>
                )}

                <div className="rounded-lg border border-base-300 bg-blue-50 p-5 mt-6">
                  <p className="font-semibold mb-3 text-gray-800">Bank Account Details</p>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-gray-700">Bank Name:</span> <span className="text-gray-600">THE VEDA VAULT</span></p>
                    <p><span className="font-medium text-gray-700">Account Number:</span> <span className="text-gray-600">143502000001379</span></p>
                    <p><span className="font-medium text-gray-700">IFSC CODE:</span> <span className="text-gray-600">IOBA0001435</span></p>
                    <p><span className="font-medium text-gray-700">Branch:</span> <span className="text-gray-600">KANDIVLI (EAST); MUMBAI</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="card bg-base-200 shadow-sm sticky top-24 h-fit">
            <div className="card-body">
              <h3 className="font-semibold mb-6 text-lg">
                Order Summary
              </h3>

              {placedOrderId && (
                <div className="rounded-2xl border border-primary bg-primary/10 p-5 mb-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-primary font-semibold">
                    Order Reference
                  </p>
                  <p className="text-3xl font-bold mt-3">{placedOrderId}</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Keep this ID safe as a future reference.
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 pb-4 border-b border-base-300"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />

                    <div className="flex-1 text-sm">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-600 mt-1">Qty: {item.quantity}</p>

                      <div className="flex gap-3 text-xs text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <Truck size={14} />
                          {item.estimatedDeliveryDays} days
                        </span>
                      </div>
                    </div>

                    <span className="font-semibold text-gray-800 whitespace-nowrap">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="divider my-4" />

              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="btn btn-primary w-full gap-2 text-base font-semibold"
              >
                <ShieldCheck size={20} />
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
