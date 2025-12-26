
import Intro from "../components/Landing/Intro";
import Hero from "../components/Landing/Hero";
import Collections from "../components/Landing/Collections";
import Footer from "../components/Landing/Footer";
import Reviews from "../components/Landing/Reviews";
import NewArrivals from "../components/Landing/NewArrivals";


export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <NewArrivals></NewArrivals>
      <Collections></Collections>
      <Intro></Intro>
      <Reviews></Reviews>
      <Footer></Footer>
      
    </div>
  );
}
