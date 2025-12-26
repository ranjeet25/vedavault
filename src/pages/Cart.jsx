export default function Cart({ cart }) {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map((item, index) => (
        <div key={index} className="flex justify-between border-b py-3">
          <span>{item.name}</span>
          <span>${item.price}</span>
        </div>
      ))}
    </div>
  );
}
