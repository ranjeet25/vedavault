import { Link } from "react-router-dom";
import Header from "../Reuseable/Header";

const newArrivals = [
  {
    id: 1,
    name: "Banarasi Silk Saree",
    price: 8999,
    image:
      "https://www.karagiri.com/cdn/shop/products/banarasi-saree-ruby-red-printed-banarasi-saree-silk-saree-online-24056756732097.jpg?v=1648604615",
  },
  {
    id: 2,
    name: "Kanjivaram Saree",
    price: 12499,
    image:
      "https://medias.utsavfashion.com/media/catalog/product/cache/1/image/500x/040ec09b1e35df139433887a97daa66f/b/a/banarasi-saree-in-pink-v1-spf12270.jpg",
  },
  {
    id: 3,
    name: "Chiffon Designer Saree",
    price: 4999,
    image:
      "https://mysilklove.com/cdn/shop/files/1_cce9be99-1c54-4e65-babf-0041fbabec83.jpg?v=1734687781&width=2048",
  },
  {
    id: 4,
    name: "Cotton Handloom Saree",
    price: 3499,
    image:
      "https://www.sareespalace.com/image/cache/data-2024/green-weaving-banarasi-silk-designer-saree-306174-1000x1375.jpg",
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
                  className="h-44 sm:h-48 md:h-52 w-full object-cover rounded-t"
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
                <div className="mt-auto pt-4">
                  <button className="btn btn-sm btn-outline w-full">
                    View Product
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default NewArrivals;
