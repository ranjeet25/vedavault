import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="card bg-base-100 border border-gray-200 rounded-sm shadow hover:shadow-lg transition">

      {/* Image Container */}
      <figure
        className="relative group overflow-hidden bg-base-200
                   aspect-3/4 max-h-[50vh] mx-auto"
      >

        {/* Main Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-opacity duration-300
                     group-hover:opacity-0"
        />

        {/* Hover Image */}
        <img
          src={product.hoverImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain opacity-0
                     transition-opacity duration-300 group-hover:opacity-100"
        />
      </figure>

      {/* Content */}
      <div className="card-body p-4">
        <h3 className="card-title text-base md:text-lg font-medium">
          {product.name}
        </h3>

        <p className="text-gray-800 font-normal">
          ₹{product.price}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="btn btn-outline btn-sm mt-3"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
