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
  CircleStar 
} from "lucide-react";
import { useCart } from "../context/CartContext";
import api from "../api"; // axios instance

export default function ProductDetail() {
  const { id } = useParams(); // Mongo _id from URL
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Fetch product from backend */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  const images = product.images?.gallery?.length
    ? product.images.gallery
    : [product.images?.main];

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      name: product.basicInfo.name,
      price: product.pricing.sellingPrice,
      image: product.images.main,
      quantity,
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
        <div className="flex flex-col gap-4">

          <h1 className="text-3xl md:text-4xl font-semibold">
            {product.basicInfo.name}
          </h1>

          <p className="text-gray-600 text-sm md:text-base">
            {product.basicInfo.description}
          </p>

          <div className="productCode text-xs font-bold text-gray-700">
            Product Code 
            <span className="ml-2 py-1 px-2 rounded-md text-amber-600 text-xs font-bold bg-amber-100">
                {product?.basicInfo?.productCode}</span>
          </div>

          {/* Ratings */}
          {/* <div className="flex items-center gap-2 text-sm">
            <Star size={16} className="text-amber-500" />
            <span>{product.ratings.average}</span>
            <span className="text-gray-500">
              ({product.ratings.totalReviews} reviews)
            </span>
            <BadgeCheck size={16} className="text-green-600 ml-2" />
          </div> */}

          {/* Pricing */}
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-normal">
              ₹{product.pricing.sellingPrice}
            </span>
            <span className="line-through text-gray-400">
              ₹{product.pricing.mrp}
            </span>
            <span className="text-green-600 text-sm font-medium">
              {product.offers.discountValue}% OFF + 
              <span className="font-bold text-amber-600"> {product?.rewards?.superCoinsEarned} SuperCoin</span> 
            </span>
          </div>

          <span className="text-xs ">
            <span className="text-amber-600 font-medium">{product.offers.offerLabel}</span>
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
            <div className="flex items-center gap-2 ">
              <CircleStar size={18} className="text-amber-600" />
              Earn {product.rewards.superCoinsEarned} SuperCoins
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-600" />
              Authentic Banarasi
            </div>
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-purple-600"/>
              Delivery in {product.delivery.estimatedDeliveryDays} days
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={18} className="text-blue-600"/>
              {product.delivery.returnPolicyDays}-day returns
            </div>
            
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex-1 gap-2 p-2"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>

            <button
              disabled={!product.delivery.codAvailable}
              className="btn btn-outline flex-1 p-2"
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
