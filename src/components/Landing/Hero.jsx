import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const desktopImages = [
  "https://ik.imagekit.io/tempvedavault/vedavault/cosmetic/vedavault-hero-pic-1.png",
  "https://ik.imagekit.io/tempvedavault/vedavault/cosmetic/vedavault-hero-pic-2.png"
];

const mobileImages = [
  "https://ik.imagekit.io/tempvedavault/vedavault/cosmetic/vedavault-landing-mobile-1.png",
  "https://ik.imagekit.io/tempvedavault/vedavault/cosmetic/vedavault-landing-mobile-2.png"
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeImages = isMobile ? mobileImages : desktopImages;

  // Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeImages.length]);

  return (
    <div className="relative h-[50vh] md:min-h-screen overflow-hidden">

      {/* Background Slider */}
      {activeImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 h-[50vh] md:min-h-screen flex flex-col items-center justify-center text-center px-4">
        
        <h1 className="font-playfairDisplay text-2xl md:text-7xl text-white font-bold mb-4 md:mb-6 animate-fadeUp">
          Welcome to Vedavault
        </h1>

        <p className="text-white text-sm md:text-base mb-4 md:mb-6 font-semibold animate-fadeUp delay-200">
          Nourish Your Roots. Transform Your Hair.
        </p>

        <Link
          to="/products"
          className="btn bg-white text-black px-6 py-3 animate-fadeUp delay-400"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default Hero;