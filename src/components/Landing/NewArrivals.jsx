import Header from "../Reuseable/Header";
import ProductCard from "../ProductCard";
import productsData from "../../data/products";

function NewArrivals() {
  const newArrivals = productsData.slice(0, 4);

  return (
    <section className="py-12 md:py-20 bg-gray-50 from-base-100 via-base-50 to-base-100">
       {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Our Best Selling Products        </h1>
        <span className=" bg-amber-200 text-amber-700 px-6 py-2 font-bold">
         Explore Below
        </span>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 p-6">
      
     

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {newArrivals.length === 0 ? (
            <p className="text-gray-500 text-center">No products found</p>
          ) : (
            newArrivals.map((p) => (
              <ProductCard key={p._id || p.id} product={p} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
