import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/Reuseable/Header";
import Footer from "../components/Reuseable/Footer";
import Loader from "../components/Reuseable/Loader"; 
import productsData from "../data/products";
import hairOilComboProducts from "../data/hairoil-comboproducts";
import hairShampooComboProducts from "../data/hairshampoo-comboproducts";
import aloeVeraFaceComboProducts from "../data/aloveraface-comboproducts";
import radianceFaceComboProducts from "../data/radinaceface-comboproducts";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(productsData);
    setLoading(false);
  }, []);
/*
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

  */

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 p-6">
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

      <div className="max-w-7xl mx-auto px-4 pb-6">
        <Header heading="Our Hair Oil Combo Products" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hairOilComboProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-6">
        <Header heading="Our Hair Shampoo Combo Products" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hairShampooComboProducts.map((product) => (
            <ProductCard key={product._id || product.id || product.slug} product={product} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-6">
        <Header heading="Our Aloe Vera Face Wash Combo Products" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {aloeVeraFaceComboProducts.map((product) => (
            <ProductCard key={product._id || product.id || product.slug} product={product} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-6">
        <Header heading="Our Radiance Face Wash Combo Products" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {radianceFaceComboProducts.map((product) => (
            <ProductCard key={product._id || product.id || product.slug} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
