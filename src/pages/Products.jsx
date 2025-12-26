import products from "../data/products";
import ProductCard from "../components/ProductCard";
import Header from "../components/Reuseable/Header";

export default function Products() {
  return (
    <div className="p-6">
      
      <Header heading="Our Products"></Header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
