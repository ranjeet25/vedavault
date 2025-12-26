import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card bg-base-100 border border-gray-300 rounded-sm shadow hover:shadow-lg transition">
      <figure className="relative group overflow-hidden h-[50vh]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <img
          src={product.hoverImage}
          alt={product.name}
          className="absolute top-0 left-0 w-full  object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

      </figure>

      <div className="card-body p-4">
        <h3 className="card-title text-lg">{product.name}</h3>
        <p className="text-blue-600 font-bold">${product.price}</p>

        <Link
          to={`/products/${product.id}`}
          className="btn btn-outline btn-sm mt-2"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
