import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sareeCollections = [
  {
    id: 1,
    title: "Banarasi Sarees",
    description:
      "Opulent silk sarees adorned with intricate zari craftsmanship, perfect for weddings and royal celebrations.",
    image:
      "https://stylecaret.com/cdn/shop/files/54459412191_15714eb3e7_b.jpg?v=1745665191",
  },
  {
    id: 2,
    title: "Kanjivaram Sarees",
    description:
      "Timeless South Indian silks known for rich textures, vibrant hues, and heirloom durability.",
    image:
      "https://ilovesarees.com/cdn/shop/files/Magenta-Pink-Premium-Banarasi-Silk-Saree-I-Love-Sarees6.webp?v=1728039574&width=1445",
  },
  {
    id: 3,
    title: "Chiffon Sarees",
    description:
      "Gracefully lightweight sarees with a fluid drape, ideal for elegant evenings and festive charm.",
    image:
      "https://www.ethnicrang.in/wp-content/uploads/2024/04/358-570x713.jpeg",
  },
];

function Collections() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? sareeCollections.length - 1 : prev - 1
    );

  const nextSlide = () =>
    setCurrent((prev) =>
      prev === sareeCollections.length - 1 ? 0 : prev + 1
    );

  const collection = sareeCollections[current];

  return (
    <section className="py-20 bg-[#faf7f2]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <p className="text-amber-600 tracking-widest uppercase text-sm mb-2">
            Timeless Elegance
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Saree Collections
          </h2>
        </div>

        {/* Main Card */}
        <div className="relative rounded-2xl overflow-hidden border border-amber-400 bg-white shadow-xl">

          <div className="grid md:grid-cols-2">

            {/* Image */}
            <div className="relative h-72 md:h-[420px]">
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                {collection.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                {collection.description}
              </p>

              <button className="self-start px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-all duration-300 shadow-md">
                Explore Collection
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-amber-500 hover:text-white p-2 rounded-full shadow transition"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-amber-500 hover:text-white p-2 rounded-full shadow transition"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {sareeCollections.map((_, index) => (
            <span
              key={index}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 bg-amber-500"
                  : "w-3 bg-gray-300"
              }`}
            ></span>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Collections;
