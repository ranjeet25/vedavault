import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const images = [
  "https://www.manyavar.com/on/demandware.static/-/Library-Sites-ManyavarSharedLibrary/default/dwe6547122/Ace_Your_Saree_Banner_D.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/052/754/819/small/traditional-colorful-indian-dress-sari-photo.jpg",
  "https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FyZWV8ZW58MHx8MHx8fDA%3D",
  
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background Slider */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
        
        <h1 className="font-playfairDisplay text-4xl md:text-7xl text-white font-bold mb-6 animate-fadeUp">
          Welcome to Vedavault
        </h1>

        <p className=" text-white mb-6 font-semibold animate-fadeUp delay-200">
          Where Tradition Meets Timeless Elegance
        </p>

        <Link
          to="/products"
          className="p-6 btn bg-white text-black animate-fadeUp delay-400"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default Hero;
