import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/Reuseable/Header";
import api from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        //console.log("Products from API:", res);
        setProducts(res.data);
        
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <Header heading="Our Products" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          products.map((p) => (
            <ProductCard key={p._id || p.id} product={p} />
          ))
        )}
      </div>
    </div>
  );
}
