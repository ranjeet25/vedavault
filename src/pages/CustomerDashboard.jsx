import CustomerProfile from "../components/dashboard/Customer/CustomerProfile";
import RecentOrders from "../components/dashboard/Customer/RecentOrders";

function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6">
          My Dashboard
        </h1>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <CustomerProfile />
          </div>

          {/* Right Section (future-ready) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="font-semibold text-lg">
                  
                  Recent Orders
                  <RecentOrders></RecentOrders>
                </h2>
                <p className="text-sm text-gray-500">
                  Your recent purchases will appear here
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="font-semibold text-lg">
                  Account Activity
                </h2>
                <p className="text-sm text-gray-500">
                  Track your orders, payments & updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
