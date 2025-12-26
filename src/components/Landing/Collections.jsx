import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sareeCollections = [
  {
    id: 1,
    title: "Banarasi Sarees",
    description:
      "Rich silk sarees with intricate zari work, perfect for weddings and grand occasions.",
    image:
      "https://stylecaret.com/cdn/shop/files/54459412191_15714eb3e7_b.jpg?v=1745665191",
  },
  {
    id: 2,
    title: "Kanjivaram Sarees",
    description:
      "Traditional South Indian silk sarees known for durability and vibrant colors.",
    image:
      "https://ilovesarees.com/cdn/shop/files/Magenta-Pink-Premium-Banarasi-Silk-Saree-I-Love-Sarees6.webp?v=1728039574&width=1445",
  },
  {
    id: 3,
    title: "Chiffon Sarees",
    description:
      "Lightweight and elegant sarees, ideal for parties and daily elegance.",
    image:
      "https://www.ethnicrang.in/wp-content/uploads/2024/04/358-570x713.jpeg",
  },
];

function Collections() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? sareeCollections.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === sareeCollections.length - 1 ? 0 : prev + 1
    );
  };

  const collection = sareeCollections[current];

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-6">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Saree Collections
        </h2>

        {/* Card */}
        <div className="relative bg-base-100 border-2 border-amber-500 p-2 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">

            {/* Image */}
            <div className="h-72 md:h-96">
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                {collection.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {collection.description}
              </p>
              <button className="btn bg-amber-500">
                Explore Collection
              </button>
            </div>
          </div>

          {/* Swipe Buttons */}
          <button
            onClick={prevSlide}
            className="btn btn-circle absolute left-4 top-1/2 -translate-y-1/2"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            className="btn btn-circle absolute right-4 top-1/2 -translate-y-1/2"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {sareeCollections.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-amber-500" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Collections;
