
import Intro from "../components/Landing/Intro";
import Hero from "../components/Landing/Hero";
import Collections from "../components/Landing/Collections";
import Footer from "../components/Reuseable/Footer";
import Reviews from "../components/Landing/Reviews";
import NewArrivals from "../components/Landing/NewArrivals";
import AboutProduct from "../components/Landing/AboutProduct";
import BuyFromOtherPlatform from "../components/Landing/BuyFromOtherPlatform";


export default function Home() {
  return (
    <div>
      <Hero></Hero>
    
      <NewArrivals></NewArrivals>
      <Intro></Intro>
      <BuyFromOtherPlatform></BuyFromOtherPlatform>
      
      <Reviews></Reviews>
      <Footer></Footer>
      
    </div>
  );
}
