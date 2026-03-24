import design1 from "../../assets/SVG/design103.svg";

function Intro() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      

      <div className="container mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src="https://ik.imagekit.io/tempvedavault/vedavault/cosmetic/vedavault-intro-pic1.png"
              alt="Hair Care Product"
              className="shadow-xl max-w-sm w-full h-96 object-cover  rounded-2xl"
            />
          </div>

          {/* Right Content */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-emerald-700">
              Why vedavault?
            </h1>
            <h4 className="text-1xl md:text-2xl font-bold mb-4 leading-tight">
              - For Stronger, Healthier Hair 🌿
            </h4>

            <p className="text-gray-600 mb-6 text-lg">
              Experience the power of herbal ingredients with our premium hair
              oil and shampoo. Reduce hair fall, boost growth, and bring back
              natural shine—without harmful chemicals.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3 mb-6 text-sm">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                🌱 100% Herbal
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                💧 All Hair Types
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                ✨ No Harsh Chemicals
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 my-6">
              <button className="btn bg-green-500 text-white hover:bg-green-600">
                Shop Hair Oil
              </button>
              <button className="btn btn-outline border-green-500 text-green-600 hover:bg-green-50">
                Explore Shampoo
              </button>
            </div>
          </div>
        </div>
      </div>

     

      
    </section>
  );
}

export default Intro;