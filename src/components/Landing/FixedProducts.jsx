function FixedProducts() {

  const products = [
    {
      _id: "1",
      basicInfo: {
        name: "The Veda Vault Black Seed Onion Natural Hair Oil",
      },
      pricing: {
        mrp: 325,
        sellingPrice: 199,
        maxPrice: 299,
      },
      rating: 4.5,
      purchases: 124,
      images: {
        main: "https://ik.imagekit.io/tempvedavault/vedavault/cosmetic/1.png?updatedAt=1774168428903",
      },
      links: {
        flipkart: "https://www.flipkart.com/veda-vault-black-seed-onion-natural-hair-oil-growth-strong-roots/p/itm2e2ba0145fe8c",
        shopsy: "https://www.shopsy.in/thevedavault-black-seed-onion-natural-hair-oil-growth-strong-roots/p/itm6f1fae6e2880c",
      },
    },
    {
      _id: "2",
      basicInfo: {
        name: "Aloe Amla Reetha Shikakai Shampoo 300 ml",
      },
      pricing: {
        mrp: 399,
        sellingPrice: 299,
        maxPrice: 399,
      },
      rating: 4.2,
      purchases: 112,
      images: {
        main: "https://ik.imagekit.io/tempvedavault/vedavault/cosmetic/s1.png",
      },
      links: {
        flipkart: "https://www.flipkart.com/veda-vault-aloe-vera-amla-reetha-shikakai-natural-shampoo-anti-dandruff-deep-clean/p/itm2dc51afa5e297",
        shopsy: "https://www.shopsy.in/thevedavault-black-seed-onion-oil-200-ml-aloe-vera-amla-reetha-shikakai-shampoo-300-hair/p/itm9432f00ad70f1",
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {products.map((product) => (
        <div key={product._id} className="group h-full">
          <div className="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 border border-base-200 hover:border-amber-400 h-full flex flex-col">

            {/* Image */}
            <figure className="relative overflow-hidden bg-base-200 aspect-square">
              <img
                src={product.images.main}
                alt={product.basicInfo.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
              />
            </figure>

            {/* Content */}
            <div className="card-body p-5 flex flex-col gap-3">

              {/* Name */}
              <h3 className="card-title text-base font-semibold line-clamp-2 group-hover:text-amber-600">
                {product.basicInfo.name}
              </h3>

              {/* ⭐ Rating */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-500">
                  {"★".repeat(Math.floor(product.rating))}
                </span>
                <span className="text-gray-600">{product.rating}</span>
              </div>

              {/* 🛒 Purchases */}
              <div className="text-xs text-gray-500">
                {product.purchases}+ bought
              </div>

              {/* 💰 Price Range */}
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">
                  ₹{product.pricing.sellingPrice}
                  {product.pricing.maxPrice && (
                    <> - ₹{product.pricing.maxPrice}</>
                  )}
                </span>

                <span className="line-through text-gray-400 text-sm">
                  ₹{product.pricing.mrp}
                </span>
              </div>

              {/* Buy Buttons */}
              <div className="flex gap-2 mt-2">
                <a
                  href={product.links.flipkart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm flex-1 bg-blue-500 text-white hover:bg-blue-600 border-none"
                >
                  Flipkart
                </a>

                <a
                  href={product.links.shopsy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm flex-1 bg-pink-500 text-white hover:bg-pink-600 border-none"
                >
                  Shopsy
                </a>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FixedProducts;