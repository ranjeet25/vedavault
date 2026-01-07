import { Link } from "react-router-dom";
import Header from "../Reuseable/Header";

const newArrivals = [
  {
    id: 1,
    name: "Banarasi Silk Saree",
    price: 8999,
    image:
      "https://ik.imagekit.io/tempvedavault/vedavault/Saree%20Images/Fancy%20Party%20Wear%20Aqua%20Blue%201.jpeg?updatedAt=1767808896236",
  },
  {
    id: 2,
    name: "Kanjivaram Saree",
    price: 12499,
    image:
      "https://ik.imagekit.io/tempvedavault/vedavault/Saree%20Images/Fancy%20Party%20Wear%20Wisteria%20Pink%201.jpeg?updatedAt=1767808896519",
  },
  {
    id: 3,
    name: "Chiffon Designer Saree",
    price: 4999,
    image:
      "https://ik.imagekit.io/tempvedavault/vedavault/Saree%20Images/Orange%20and%20Pink%20Floral%20Print%20%201.jpeg?updatedAt=1767808895868",
  },
  {
    id: 4,
    name: "Cotton Handloom Saree",
    price: 3499,
    image:
      "https://ik.imagekit.io/tempvedavault/vedavault/Saree%20Images/Green%20Floral%20Print%201.jpeg?updatedAt=1767808895795",
  },
];

function NewArrivals() {
  return (
    <section className="py-12 md:py-16 bg-base-100">
      <div className="container mx-auto px-4 md:px-6">

        <Header heading="New Arrivals" />

        {/* View All */}
        <div className="flex justify-end mb-6">
          <Link to="/products" className="underline text-sm">
            View All
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="bg-base-200 rounded shadow hover:shadow-lg transition flex flex-col"
            >
              {/* Image Wrapper */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-3/4 w-full h-64  object-contain rounded-t"
                />

                {/* NEW Tag */}
                <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
                  NEW
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {product.name}
                </h3>

                <p className="font-bold text-primary mt-1">
                  ₹{product.price}
                </p>

                {/* Button */}
                 <Link
                  to={`/products/${product.id}`}
                  className="btn btn-sm btn-outline w-full mt-auto mt-4"
                >
                  View Product
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default NewArrivals;
