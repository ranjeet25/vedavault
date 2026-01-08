import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;

  const {
    basicInfo,
    pricing,
    images,
    slug,
    availability,
  } = product;

  return (
    <div className="card bg-base-100 border border-gray-200 rounded-sm shadow hover:shadow-lg transition">

      {/* Image Container */}
      <figure
        className="relative group overflow-hidden bg-base-200
                   aspect-[3/4] max-h-[50vh] mx-auto"
      >
        {/* Main Image */}
        <img
          src={images?.main}
          alt={basicInfo?.name}
          className="w-full h-full object-contain transition-opacity duration-300
                     group-hover:opacity-0"
        />

        {/* Hover Image */}
        {images?.hover && (
          <img
            src={images.hover}
            alt={basicInfo?.name}
            className="absolute inset-0 w-full h-full object-contain opacity-0
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

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-900 font-semibold">
            ₹{pricing?.sellingPrice}
          </span>

          {pricing?.mrp > pricing?.sellingPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{pricing?.mrp}
            </span>
          )}

          <span className=" px-2 text-sm text-gray-700 border-2 border-amber-200  rounded-lg ">
              ₹{pricing?.mrp - pricing?.sellingPrice} Off + 
              <span className="font-bold text-amber-600"> {product?.rewards?.superCoinsEarned} SuperCoin</span> 
              
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
          to={`/products/${product._id}`}
          className="btn btn-outline btn-sm mt-3"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
