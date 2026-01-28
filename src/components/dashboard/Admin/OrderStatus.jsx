import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axiosInstance";

function OrderStatus() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await api.get(`/admin/orders/${id}`);
      setOrder(res.order);
      setStatus(res.order.orderStatus);
    };
    fetchOrder();
  }, [id]);

  const updateStatus = async () => {
    await api.patch(`/admin/orders/${id}/status`, { orderStatus: status });
    alert("Order status updated");
  };

  if (!order) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h2 className="text-2xl font-bold mb-6">Order Details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">

          {/* PRODUCTS */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Products</h3>

              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.productId}>
                        <td>{item.name}</td>
                        <td>₹{item.price}</td>
                        <td>{item.quantity}</td>
                        <td className="font-semibold">
                          ₹{item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-right font-bold mt-4">
                Grand Total: ₹{order.totalAmount}
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Payment Details</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <p><strong>Mode:</strong> {order.payment.mode}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="badge badge-success">
                    {order.payment.status}
                  </span>
                </p>
                <p className="sm:col-span-2">
                  <strong>Transaction ID:</strong>{" "}
                  {order.payment.transactionId}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">

          {/* CUSTOMER */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Customer Details</h3>

              <p><strong>Name:</strong> {order.customer.name}</p>
              <p><strong>Email:</strong> {order.customer.email}</p>
              <p><strong>Phone:</strong> {order.customer.phone}</p>
              <p className="text-sm opacity-70 mt-2">
                {order.customer.address}
              </p>
            </div>
          </div>

          {/* ORDER META */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Order Info</h3>

              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>User Role:</strong> {order.user.role}</p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* STATUS UPDATE */}
          <div className="card bg-base-100 shadow border border-primary">
            <div className="card-body">
              <h3 className="card-title">Update Order Status</h3>

              <select
                className="select select-bordered w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>PLACED</option>
                <option>SHIPPED</option>
                <option>DELIVERED</option>
                <option>CANCELLED</option>
              </select>

              <button
                className="btn btn-primary mt-4 w-full"
                onClick={updateStatus}
              >
                Update Status
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
