import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProductAPI } from "../../../api/product.api";

function StockManagment() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await ProductAPI.getAll();
      setProducts(res);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
       <Link></Link>
        Stock Management
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() =>
                navigate(`/admin/products/${product._id}/edit`)
              }
              className="card bg-base-100 shadow cursor-pointer hover:shadow-lg transition border"
            >
              <figure className="p-4">
                <img
                  src={product.images?.main}
                  alt={product.basicInfo?.name}
                  className="h-40 w-full object-contain"
                />
              </figure>

              <div className="card-body p-4">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {product.basicInfo?.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  SKU: {product.availability?.sku || "N/A"}
                </p>

                <p className="text-xs mt-1">
                  Stock:{" "}
                  <span
                    className={
                      product.availability?.stockCount > 0
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {product.availability?.stockCount ?? "N/A"}
                  </span>
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Price: ₹{product.pricing?.sellingPrice}
                </p>

                <div className="mt-3">
                  <span className="badge badge-outline badge-primary text-xs">
                    Click to Edit
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StockManagment;
