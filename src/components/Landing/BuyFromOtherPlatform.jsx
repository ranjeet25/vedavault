function BuyFromOtherPlatform() {
  return (
    <section className="min-h-screen bg-base-100 bg-pink-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full text-center">

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Shop Our Products Anywhere 🛍️
        </h1>

        <p className="text-gray-500 mb-10 max-w-2xl mx-auto text-lg">
          You can now find our herbal hair care products on multiple trusted
          platforms. Compare prices, explore offers, and shop from your
          favorite marketplace.
        </p>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Amazon */}
          <div className="card bg-base-200 shadow-lg p-6 hover:shadow-xl transition">
<div className="h-8 mb-6 bg-[url('https://cdn.freebiesupply.com/images/large/2x/amazon-logo-black-transparent.png')] bg-contain bg-no-repeat bg-center "></div>            
            <p className="text-gray-500 text-sm mb-4">
              Fast delivery, great deals & trusted service.
            </p>
            <button className="btn bg-pink-200 btn-sm rounded-full">
              Shop on Amazon
            </button>
          </div>

          {/* Flipkart */}
          <div className="card bg-base-200 shadow-lg p-6 hover:shadow-xl transition">
            <div className="h-8 mb-6 bg-[url('https://cdn.freebiesupply.com/logos/large/2x/flipkart-logo-png-transparent.png')] bg-contain bg-no-repeat bg-center "></div>            

            <p className="text-gray-500 text-sm mb-4">
              Exclusive offers and easy returns available.
            </p>
            <button className="btn bg-pink-200 btn-sm rounded-full">
              Shop on Flipkart
            </button>
          </div>

          {/* Shopsy */}
          <div className="card bg-base-200 shadow-lg p-6 hover:shadow-xl transition">
           <div className="h-8 mb-6 bg-[url('https://bl-i.thgim.com/public/incoming/8hm8vq/article64798961.ece/alternates/FREE_1200/flipkart-shopsyjpg')] bg-contain bg-no-repeat bg-center "></div>            

            <p className="text-gray-500 text-sm mb-4">
              Budget-friendly pricing with amazing deals.
            </p>
            <button className="btn bg-pink-200 btn-sm rounded-full">
              Shop on Shopsy
            </button>
          </div>

        </div>

        {/* Bottom CTA */}
        {/* <div className="mt-10">
          <button className="btn btn-outline btn-wide rounded-full">
            View All Products
          </button>
        </div> */}

      </div>
    </section>
  );
}

export default BuyFromOtherPlatform;