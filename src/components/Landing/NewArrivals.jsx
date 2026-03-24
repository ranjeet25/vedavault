import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Reuseable/Header";
import api from "../../api";
import Loader from "../Reuseable/Loader"; // 👈 import loader
import FixedProducts from "./FixedProducts";

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
              <div className="h-1 w-60 bg-gradient-to-r from-red-600 to-pink-400 rounded"></div>
      
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-base-content">
            Our Best Product
          </h2>
          <p className="text-base-content/70 text-lg mb-6">
            Discover the power of nature with our herbal hair care range designed to reduce hair fall, boost growth, and restore shine - naturally.
          </p>
          
        
        </div>

        {/* View All Button */}
        {/* <div className="flex justify-center mb-10">
          <Link to="/products" className="btn btn-primary btn-outline gap-2">
            View All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div> */}

       <FixedProducts></FixedProducts>
       

      </div>
    </section>
  );
}

export default NewArrivals;
