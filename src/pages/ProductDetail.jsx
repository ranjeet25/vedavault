import { useParams } from "react-router-dom";
import products from "../data/products";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <img src={product.image} className="w-full rounded" />
      <div>
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-gray-600 my-4">{product.description}</p>
        <p className="text-2xl font-bold">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
