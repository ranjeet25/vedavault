import design1 from "../../assets/SVG/design103.svg";

function Intro() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <img src={design1} alt="Shopping" className="w-full h-20" />
      <div className="container mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10  items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src="https://mahavirs.com/cdn/shop/files/768424E9-D5D4-4479-BC8A-DD5AB2536BDC.jpg?v=1735049257&width=3024"
              alt="Shopping"
              className=" shadow-lg max-w-sm w-full h-92 p-2 border-2 border-dashed border-yellow-600 "
            />
          </div>

          {/* Right Content */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Discover the Best Sarees for yourself.
            </h1>
            <p className="text-gray-600 mb-6 ">
              Shop the latest trends with unbeatable prices and fast delivery.
              Quality products curated just for you.
            </p>

            <div className="flex gap-4">
              <button className=" btn bg-amber-500">Shop Now</button>
              <button className=" btn btn-outline">Learn More</button>
            </div>
          </div>
        </div>
      </div>
      <img src={design1} alt="Shopping" className="w-full h-20" />
    </section>
  );
}

export default Intro;
