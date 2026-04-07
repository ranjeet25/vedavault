import { useEffect, useState } from "react";

function UpcommingProducts() {

  const products = [
    {
      name: "Apple & Amla Facewash",
      desc: "Gentle cleanse with natural ingredients",
      img: "https://ik.imagekit.io/tempvedavault/vedavault/cosmetic/Apple%20facewash%201.png",
      tag: "Launching Soon",
    },
    {
      name: "Saffron & Neem Facewash",
      desc: "Gentle cleanse with natural ingredients",
      img: "https://ik.imagekit.io/tempvedavault/vedavault/cosmetic/Saffro%20and%20Neem%20facewash%201.png",
      tag: "Coming Soon",
    },
    {
      name: "Aloe Vera & Neem Soap",
      desc: "Gentle cleanse with natural ingredients",
      img: "https://ik.imagekit.io/tempvedavault/vedavault/cosmetic/Aleovera%20and%20neem%20soap%202.png",
      tag: "Coming Soon",
    },
     {
      name: "Mint & Lemon Soap",
      desc: "Refreshing cleanse with natural ingredients",
      img: "https://ik.imagekit.io/tempvedavault/vedavault/cosmetic/mint%20soap%201.png",
      tag: "Coming Soon",
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="upcomming" className="min-h-screen h-screen bg-cover bg-[url('https://ik.imagekit.io/tempvedavault/vedavault/LandingPage/vedavault-landing%20pics-3.svg')] flex flex-col items-center justify-center px-4">

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          Upcoming Products
        </h1>
        <p className="text-gray-500">
          Get ready for our next-generation herbal hair care range
        </p>
      </div>

      {/* Slider */}
      <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">

        {products.map((product, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-700 ${
              index === current
                ? "opacity-100 scale-100 z-20"
                : "opacity-0 scale-90 z-10"
            }`}
          >
            <div className="relative">

              {/* Image */}
              <img
                src={product.img}
                alt={product.name}
                className="w-[280px] md:w-[350px] rounded-lg object-contain mx-auto drop-shadow-xl"
              />

              {/* Glass Card */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[260px] md:w-[320px] backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-4 shadow-lg text-center">

                <span className="badge bg-violet text-xs mb-2">
                  {product.tag}
                </span>

                <h3 className="font-semibold text-base md:text-lg">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-700 mt-1">
                  {product.desc}
                </p>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-16">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-green-700" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>

    </section>
  );
}

export default UpcommingProducts;