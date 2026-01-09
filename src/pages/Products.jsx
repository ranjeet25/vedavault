import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/Reuseable/Header";
import api from "../api";
import Footer from "../components/Reuseable/Footer";
import Loader from "../components/Reuseable/Loader"; 

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="p-6">
        <Header heading="Our Products" />

        {/* Loader */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <p className="text-gray-500 text-center">No products found</p>
            ) : (
              products.map((p) => (
                <ProductCard key={p._id || p.id} product={p} />
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
