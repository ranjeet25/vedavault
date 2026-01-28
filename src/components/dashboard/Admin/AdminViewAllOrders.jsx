import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axiosInstance";

function AdminViewAllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/admin/orders");
      console.log(res);
      setOrders(res.orders || []);
    };
    fetchOrders();
  }, []);

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title mb-4">All Orders</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                  <th>name</th>
                <th>Customer Id</th>
                <th>Customer Type</th>
              
                <th>Order Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  
                  <td>{index + 1}</td>
                   <td>{order.customer?.name}</td>
                  <td>{order.user?._id}</td>
                  <td>{order.user?.role}</td>
                 
                  <td>₹{order.totalAmount}</td>
                  <td>{order.payment?.mode}</td>
                  <td>
                    <span className="badge badge-warning">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="btn btn-xs btn-outline"
                    >
                      View / Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!orders.length && (
            <p className="text-center opacity-60 py-6">
              No orders found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminViewAllOrders;
