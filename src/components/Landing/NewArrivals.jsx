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
    <section className="py-12 md:py-20 bg-gradient-to-b from-base-100 via-base-50 to-base-100">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Section Header with Traditional Touch */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-amber-600 to-amber-400 rounded"></div>
              <span className="text-amber-600 text-sm font-semibold tracking-widest">✨ NEW COLLECTION</span>
              <div className="h-1 w-12 bg-gradient-to-l from-amber-600 to-amber-400 rounded"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-base-content">
            Trending Sarees
          </h2>
          <p className="text-base-content/70 text-lg mb-6">
            Discover our latest collection of exquisite handcrafted sarees with timeless elegance
          </p>
          
        
        </div>

        {/* View All Button */}
        <div className="flex justify-center mb-10">
          <Link to="/products" className="btn btn-primary btn-outline gap-2">
            View All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Loader */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {newArrivals.map((product) => (
              <Link
                to={`/products/${product._id}`}
                key={product._id}
                className="group h-full"
              >
                <div className="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-200 hover:border-amber-400 h-full flex flex-col">
                  
                  {/* Image Container */}
                  <figure className="relative overflow-hidden bg-base-200 aspect-square">
                    <img
                      src={product.images.main}
                      alt={product.basicInfo.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
                    />

                    {/* NEW Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="badge badge-lg bg-gradient-to-r from-amber-600 to-amber-500 text-white border-0 shadow-lg animate-pulse gap-2">
                        <span className="text-sm">✨ NEW</span>
                      </div>
                    </div>

                    {/* Traditional Corner Decorations */}
                    <div className="absolute top-2 right-2 text-xl opacity-40 group-hover:opacity-70 transition">🌸</div>
                    <div className="absolute bottom-2 left-2 text-xl opacity-40 group-hover:opacity-70 transition">🌸</div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                  </figure>

                  {/* Content */}
                  <div className="card-body p-5 flex flex-col gap-3">
                    
                    {/* Product Name */}
                    <h3 className="card-title text-base font-semibold line-clamp-2 text-base-content group-hover:text-amber-600 transition">
                      {product.basicInfo.name}
                    </h3>

                    {/* Price Section */}
                    <div className="space-y-2 py-2 border-y border-base-200">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-base-content">
                          ₹{product?.pricing?.sellingPrice}
                        </span>
                        {product?.pricing?.mrp > product?.pricing?.sellingPrice && (
                          <span className="text-sm text-base-content/50 line-through">
                            ₹{product?.pricing?.mrp}
                          </span>
                        )}
                      </div>

                      {/* Discount Badge */}
                      {product?.pricing?.mrp > product?.pricing?.sellingPrice && (
                        <div className="inline-block">
                          <span className="badge badge-sm badge-error text-white">
                            {Math.round(
                              ((product?.pricing?.mrp - product?.pricing?.sellingPrice) /
                                product?.pricing?.mrp) *
                              100
                            )}% OFF
                          </span>
                        </div>
                      )}
                    </div>

                    {/* SuperCoin Reward */}
                    <div className="bg-gradient-to-r from-pink-50 to-red-50 p-2 rounded-lg border border-pink-200 flex-grow">
                      <p className="text-xs text-base-content/70">
                        Earn <span className="font-bold text-pink-600">{product?.rewards?.superCoinsEarned} SuperCoins</span>
                      </p>
                    </div>

                    {/* Save Button at End */}
                    <button className="btn btn-sm btn-outline w-full mt-auto group/cart">
                      <span className="group-hover/cart:hidden">View Product</span>
                      <span className="hidden group-hover/cart:inline">Yesss</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-pink-50 rounded-2xl p-8 md:p-12 border-2 border-pink-200">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-base-content">
              Celebrate Tradition with Style
            </h3>
            <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
              Each saree is a masterpiece of craftsmanship, bringing together heritage and contemporary design
            </p>
            <Link to="/products" className="btn bg-pink-500 gap-2">
              Explore Full Collection
              <span>→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default NewArrivals;
