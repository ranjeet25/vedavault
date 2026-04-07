import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;

  const { basicInfo, pricing, images, slug, availability } = product;

  return (
    <div className="card py-4 bg-base-100 border border-gray-200 rounded-lg shadow hover:shadow-lg transition">
      {/* Image Container */}

     {/* Badge / Offer */}
    {product?.offers?.leadSlogan && (
      <span className="z-10 absolute top-3 left-3 bg-red-400 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
        {product?.offers?.leadSlogan}
      </span>
    )}
      <figure
        className="relative group overflow-hidden 
                   aspect-[3/4] max-h-[50vh] mx-auto"
      >
        {/* Main Image */}
        <img
          src={images?.main}
          alt={basicInfo?.name}
          className="w-full h-full object-cover transition-opacity duration-300
                     group-hover:opacity-0"
        />

        {/* Hover Image */}
        {images?.hover && (
          <img
            src={images.hover}
            alt={basicInfo?.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0
                       transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {/* Out of Stock Badge */}
        {!availability?.inStock && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </figure>

      {/* Content */}
      <div className="card-body p-4">
        <h3 className="card-title text-base md:text-lg font-medium line-clamp-2">
          {basicInfo?.name}
        </h3>

        <span className="w-54  bg-violet-100 px-4 text-violet-800 text-center rounded-2xl font-bold">Sold {product.stockSoldinLast30Days}+ in last 30 days</span> 

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-900 font-semibold">
            ₹{pricing?.mrp1}
          </span>
           <span className="text-gray-900 font-semibold">
            -
          </span>

            <span className="text-gray-900 font-semibold ">
              ₹{pricing?.mrp2}
            </span>
          

        
        </div>

        {/* Offer Badge */}
        {product?.offers?.offerLabel && (
          <span className="mt-1 inline-block text-xs text-green-700 font-medium">
            {product.offers.offerLabel}
          </span>
        )}

        {/* CTA */}
        <Link
          to={`/products/${product.slug || product._id}`}
          className="btn btn-outline btn-sm mt-3"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
