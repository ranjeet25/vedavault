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
                <h3 className="font-semibold mb-4">
                 Secondary Contact Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <input
                      name="name"
                      placeholder="Full Name"
                      className="input input-bordered"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <input
                      name="email"
                      placeholder="Email"
                      className="input input-bordered"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <input
                      name="phone"
                      placeholder="Phone Number"
                      className="input input-bordered w-full"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
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
                {errors.address && (
                  <p className="text-sm text-red-600">{errors.address}</p>
                )}
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
                  <div className="space-y-2">
                    <input
                      name="transactionId"
                      placeholder="UPI Transaction ID"
                      className="input input-bordered"
                      value={form.transactionId}
                      onChange={handleChange}
                    />
                    {errors.transactionId && (
                      <p className="text-sm text-red-600">
                        {errors.transactionId}
                      </p>
                    )}
                  </div>
                )}

                {codAvailable && (
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="COD"
                      checked={form.paymentMode === "COD"}
                      onChange={handleChange}
                    />
                    Cash on Delivery
                  </label>
                )}

                <div className="rounded-lg border border-base-300 bg-base-100 p-4 mt-3 text-sm">
                  <p className="font-semibold mb-2">Payment Details</p>
                  <p>THE VEDA VAULT</p>
                  <p>Account Number - 143502000001379</p>
                  <p>IFSC CODE : IOBA0001435</p>
                  <p>Branch - KANDIVLI (EAST); MUMBAI</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="card bg-base-200 shadow-sm sticky top-24 h-fit">
            <div className="card-body">
              <h3 className="font-semibold mb-4">
                Order Summary
              </h3>

              {placedOrderId && (
                <div className="rounded-2xl border border-primary bg-primary/10 p-5 mb-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-primary font-semibold">
                    Order Reference
                  </p>
                  <p className="text-2xl font-bold mt-3">{placedOrderId}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Keep this ID safe as a future reference. You can track your order using this ID.
                  </p>
                </div>
              )}

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
