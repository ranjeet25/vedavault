import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";

function TodaysOrder() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/admin/orders");
      const today = new Date().toDateString();

      const todaysOrders = res.orders.filter(
        (o) => new Date(o.createdAt).toDateString() === today
      );

      setCount(todaysOrders.length);
    };

    fetchOrders();
  }, []);

  return (
    <div className="text-center">
      <p className="text-4xl font-bold">{count}</p>
      <p className="text-sm opacity-70">Orders Today</p>
    </div>
  );
}

export default TodaysOrder;
