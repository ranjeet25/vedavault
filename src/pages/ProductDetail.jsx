import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Star,
  BadgeCheck,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import products from "../mockAPIs/product.json";

import RaniPink1 from "../assets/products/Rani Pink/Rani Pink 1.jpeg";
import RaniPink2 from "../assets/products/Rani Pink/Rani Pink 2.jpeg";
import RaniPink3 from "../assets/products/Rani Pink/Rani Pink 3.jpeg";

export default function ProductDetail() {
  const  id  = 101;
  const { addToCart } = useCart();

const product = products.find(
  (p) => p.id == id
);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">
        Product not found
      </div>
    );
  }

  /* Keep OLD images */
  const images = [RaniPink1, RaniPink2, RaniPink3];

  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  /* Auto Slider */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* Cart payload → backend ready */
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      sku: product.availability.sku,
      name: product.basicInfo.name,
      price: product.pricing.sellingPrice,
      quantity,
      image: images[0],
      superCoins: product.rewards.superCoinsEarned,
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* IMAGE GALLERY */}
        <div className="flex flex-col gap-4">
          <div
            className="bg-base-200 rounded-lg overflow-hidden
                       flex items-center justify-center
                       aspect-[4/5] sm:aspect-[3/4] lg:aspect-[16/9]"
          >
            <img
              src={images[activeIndex]}
              alt={product.basicInfo.name}
              className="w-full h-full object-contain transition-opacity duration-500"
            />
          </div>

          <div className="flex gap-3 justify-center md:justify-start">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`border rounded-md p-1 ${
                  activeIndex === index
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="h-16 w-16 object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-col gap-6">

          <h1 className="text-3xl md:text-4xl font-semibold">
            {product.basicInfo.name}
          </h1>

          <p className="text-gray-600 text-sm md:text-base">
            {product.basicInfo.description}
          </p>

          {/* Ratings */}
          <div className="flex items-center gap-2 text-sm">
            <Star size={16} className="text-amber-500" />
            <span>{product.ratings.average}</span>
            <span className="text-gray-500">
              ({product.ratings.totalReviews} reviews)
            </span>
            <BadgeCheck size={16} className="text-green-600 ml-2" />
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-normal">
              ₹{product.pricing.sellingPrice}
            </span>
            <span className="line-through text-gray-400">
              ₹{product.pricing.mrp}
            </span>
            <span className="text-green-600 text-sm font-medium">
              {product.offers.discountValue}% OFF
            </span>
          </div>

          <span className="text-xs text-amber-600 font-medium">
            {product.offers.offerLabel}
          </span>

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
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="btn btn-xs btn-outline"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />
              Authentic Banarasi
            </div>
            <div className="flex items-center gap-2">
              <Truck size={18} />
              Delivery in {product.delivery.estimatedDeliveryDays} days
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={18} />
              {product.delivery.returnPolicyDays}-day returns
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} />
              Earn {product.rewards.superCoinsEarned} SuperCoins
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

            <button
              disabled={!product.delivery.codAvailable}
              className="btn btn-outline flex-1"
            >
              Buy Now
            </button>
          </div>

          <div className="border-t pt-4 text-sm text-gray-500">
            Handcrafted in {product.sareeDetails.origin}
          </div>
        </div>
      </div>
    </section>
  );
}
