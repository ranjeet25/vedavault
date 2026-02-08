import { useEffect, useState } from "react";
import { Package, Eye, CircleStar  } from "lucide-react";
import { OrderAPI } from "../../../api/order.api";
import { useNavigate } from "react-router-dom";

export default function RecentOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await OrderAPI.getMyOrders();
      setOrders(res.orders || []);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Total coins earned across ALL orders
  const totalCoinsEarned = orders.reduce((total, order) => {
    const orderCoins = (order.items || []).reduce(
      (sum, item) =>
        sum + (item.superCoinsEarned || 0) * (item.quantity || 1),
      0
    );
    return total + orderCoins;
  }, 0);

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body text-center">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body text-error text-sm text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-3">
          <Package size={18} />
          Recent Orders
          <span className="ml-auto flex items-center gap-1  text-amber-600 text-sm font-bold">
            <CircleStar  size={16} />
            {totalCoinsEarned}  <p className="text-xs font-light">Daily SuperCoins Earned</p>
          </span>
        </h2>

        {orders.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            You haven’t placed any orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Coins</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  // 🔹 Coins per order
                  const orderCoins = (order.items || []).reduce(
                    (sum, item) =>
                      sum +
                      (item.superCoinsEarned || 0) *
                        (item.quantity || 1),
                    0
                  );

                  return (
                    <tr key={order._id}>
                      <td className="text-xs break-all">
                        {order._id.slice(-6)}
                      </td>
                      <td className="text-xs">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        <span className="badge badge-outline badge-primary text-xs">
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="font-semibold">
                        ₹{order.totalAmount}
                      </td>
                      <td className="text-amber-600 font-medium text-sm">
                        {orderCoins}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            navigate(`/orders/${order._id}`)
                          }
                          className="btn btn-ghost btn-xs"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
