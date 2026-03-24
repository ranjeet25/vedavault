import AdminViewAllOrders from "../components/dashboard/Admin/AdminViewAllOrders";
import TodaysOrder from "../components/dashboard/Admin/TodaysOrder";
import { SquarePlus } from 'lucide-react';
import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold">Today’s Orders</h3>
          <TodaysOrder />
        </div>

        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold">  Add Product</h3>
          <Link to="/admin/addProducts" className="btn bg-green-400 mt-4"> <SquarePlus /> Add New Product</Link>
        </div>

        <div className="card bg-base-100 shadow p-4 flex flex-row gap-4">
         
          <Link to="/admin/stockmanagment"> <p className="btn">Stock Managment</p></Link>
          
          <p className="btn">Update product</p>
          
        </div>
      </div>

      {/* Orders Table */}
      <AdminViewAllOrders />
    </div>
  );
}

export default Admin;
