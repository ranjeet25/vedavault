import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RaniPink1 from "../assets/products/Rani Pink/Rani Pink 1.jpeg";
import RaniPink2 from "../assets/products/Rani Pink/Rani Pink 2.jpeg";
import RaniPink3 from "../assets/products/Rani Pink/Rani Pink 3.jpeg";

import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";
import products from "../data/products";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const images = product.images || [
    RaniPink1,
    RaniPink2,
    RaniPink3,
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  /* Auto slider */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* IMAGE GALLERY */}
        <div className="flex flex-col gap-4">

          {/* Main Image */}
          <div className="bg-base-200 rounded-lg overflow-hidden flex items-center justify-center
                          aspect-[4/5] md:aspect-[3/4] lg:aspect-[16/9]">
            <img
              src={images[activeIndex]}
              alt={product.name}
              className="w-full h-full object-contain transition-opacity duration-500"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 justify-center md:justify-start">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`border rounded-md p-1 transition
                  ${
                    activeIndex === index
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="h-16 w-16 object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-col gap-6">

          <h1 className="text-3xl md:text-4xl font-semibold">
            {product.name}
          </h1>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {product.description}
          </p>

          {/* Price (normal weight) */}
          <p className="text-2xl md:text-3xl font-normal text-gray-800">
            ₹{product.price}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="btn btn-xs btn-outline"
              >
                <Minus size={14} />
              </button>

              <span className="min-w-[20px] text-center">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="btn btn-xs btn-outline"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />
              <span>Authentic Weave</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={18} />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={18} />
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} />
              <span>Premium Quality</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex-1 gap-2"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>

            <button className="btn btn-outline flex-1">
              Buy Now
            </button>
          </div>

          {/* Footer note */}
          <div className="border-t pt-4 text-sm text-gray-500">
            Crafted with care • Inspired by Indian heritage
          </div>

        </div>
      </div>
    </section>
  );
}
