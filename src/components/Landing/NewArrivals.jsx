import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Reuseable/Header";
import api from "../../api";
import Loader from "../Reuseable/Loader"; // 👈 import loader

function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await api.get("/products?limit=4");
        setNewArrivals(res);
      } catch (error) {
        console.error("Failed to load new arrivals", error);
      } finally {
        setLoading(false); // 👈 stop loader
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <section className="py-12 md:py-16 bg-base-100">
      <div className="container mx-auto px-4 md:px-6">

        <Header heading="Trending Sarees" />

        {/* View All */}
        <div className="flex justify-end mb-6">
          <Link to="/products" className="underline text-sm">
            View All
          </Link>
        </div>

        {/* Loader */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <div
                key={product._id}
                className="bg-base-200 rounded shadow hover:shadow-lg transition flex flex-col"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={product.images.main}
                    alt={product.basicInfo.name}
                    className="aspect-3/4 w-full h-64 object-contain rounded-t"
                  />

                  <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
                    NEW
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow ">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {product.basicInfo.name}
                  </h3>

                  {/* Price Section */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-900 font-semibold">
            ₹{product?.pricing?.sellingPrice}
          </span>

          {product?.pricing?.mrp > product?.pricing?.sellingPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product?.pricing?.mrp}
            </span>
          )}

          <span className=" px-2 text-sm text-gray-700 bg-pink-100 ">
              ₹{product?.pricing?.mrp - product?.pricing?.sellingPrice} Off + 
              <span className="font-bold text-pink-600"> {product?.rewards?.superCoinsEarned} SuperCoin</span> 
              
          </span>


        </div>

                  <Link
                    to={`/products/${product._id}`}
                    className="btn btn-sm btn-outline w-full mt-auto mt-4"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default NewArrivals;
