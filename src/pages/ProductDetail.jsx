import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, Link } from "react";
import {

  Plus,
  Minus,
  ArrowUpRight 

} from "lucide-react";
import { useCart } from "../context/CartContext";
//import api from "../api"; // axios instance
import products from "../data/products";
import hairOilComboProducts from "../data/hairoil-comboproducts";
import hairShampooComboProducts from "../data/hairshampoo-comboproducts";
import aloeVeraFaceComboProducts from "../data/aloveraface-comboproducts";
import radianceFaceComboProducts from "../data/radinaceface-comboproducts";
import Footer from "../components/Reuseable/Footer";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const foundProduct = [
      ...products,
      ...hairOilComboProducts,
      ...hairShampooComboProducts,
      ...aloeVeraFaceComboProducts,
      ...radianceFaceComboProducts,
    ].find(
      (item) => item.slug === slug || item._id === slug
     
    );

    if (foundProduct) {
      setProduct(foundProduct);
      setError("");
    } else {
      setProduct(null);
      setError("Product not found.");
    }

    setLoading(false);
  }, [slug]);

  /* Fetch product from backend 
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
    */

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

  const buildCartItem = () => ({
    productId: product._id,
    name: product.basicInfo.name,
    price: product.pricing.sellingprice,
    image: product.images.main,
    inStock: product.availability.inStock,
    quantity,
  });

  const handleAddToCart = () => {
    addToCart(buildCartItem());
  };

  const handleBuyNow = () => {
    //addToCart(buildCartItem());
    navigate("/cart");
  };

  return (
    <div>
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

          <h1 className="text-1xl md:text-2xl font-semibold">
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
              ₹{product.pricing.sellingprice}
            </span>
            
            <span className="text-xl md:text-xl font-bold line-through text-red-500">
              ₹{product.pricing.mrp}
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
          <span className="text-xs ">
            <span className="text-pink-600 font-bold bg-pink-200 px-2 py-1 rounded-full">Product availabe: Yes</span>
          </span>


          {/* CTA */}
         <div className="flex flex-col sm:flex-row gap-4">
           <button className="btn btn-primary" onClick={handleBuyNow}>
             Buy Now
           </button>
           <button className="btn btn-outline" onClick={handleAddToCart}>
             Add to Cart
           </button>
           {/* <a className="btn btn-warning" href={product.purchaseLinks.flipkart}>Buy on flipkart <ArrowUpRight /></a>
           <a className="btn bg-pink-500" href={product.purchaseLinks.shopsy}>Buy on shopshy <ArrowUpRight /></a>
           <a className="btn btn-disabled" href={product.purchaseLinks.amazon}>Buy on amazon <ArrowUpRight /></a> */}
         </div>

          <div className="border-t pt-4 text-sm text-gray-700">

  {/* BENEFITS */}
  <div className="collapse collapse-arrow bg-base-200 mb-2">
    <input type="checkbox" />
    <div className="collapse-title font-medium">
      🌿 Benefits
    </div>
    <div className="collapse-content">
      <ul className="list-disc pl-5 space-y-1">
        {product.productDetails?.benefits?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  </div>

  {/* INGREDIENTS */}
  <div className="collapse collapse-arrow bg-base-200 mb-2">
    <input type="checkbox" />
    <div className="collapse-title font-medium">
      🧪 Ingredients
    </div>
    <div className="collapse-content">
      <ul className="space-y-2">
        {product.productDetails?.ingredients?.map((item, i) => (
          <li key={i}>
            <span className="font-semibold">{item.name}:</span>{" "}
            {item.benefit}
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* USAGE */}
  <div className="collapse collapse-arrow bg-base-200">
    <input type="checkbox" />
    <div className="collapse-title font-medium">
      🛠️ How to Use
    </div>
    <div className="collapse-content">
      <ol className="list-decimal pl-5 space-y-1">
        {product.productDetails?.usage?.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  </div>

</div>
        </div>
      </div>
    </section>
     <Footer></Footer>
    </div>
  );
}
