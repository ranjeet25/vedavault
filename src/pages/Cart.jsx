import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function Cart({ cart, setCart }) {

  const updateQuantity = (index, change) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += change;

    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1);
    }

    setCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">

      <h2 className="text-3xl font-semibold mb-8">
        Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <ShoppingBag className="mx-auto mb-4" size={48} />
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border-b pb-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 object-cover rounded"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ₹{item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(index, -1)}
                      className="btn btn-xs btn-outline"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="min-w-[20px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(index, 1)}
                      className="btn btn-xs btn-outline"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(index)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border rounded-lg p-6 h-fit bg-base-200">
            <h3 className="text-lg font-semibold mb-4">
              Order Summary
            </h3>

            <div className="flex justify-between mb-2 text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-2 text-sm">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="border-t my-4"></div>

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>

            <button className="btn btn-primary w-full">
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </section>
  );
}
