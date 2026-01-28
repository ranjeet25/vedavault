import Header from "../components/Reuseable/Header";
import Footer from "../components/Reuseable/Footer";

function AboutUs() {
  const stats = [
    { number: "10K+", label: "Happy Customers", icon: "👥" },
    { number: "500+", label: "Products", icon: "📦" },
    { number: "50+", label: "Distributors", icon: "🚚" },
    { number: "5+", label: "Years Experience", icon: "⭐" },
  ];

  const values = [
    {
      title: "Quality First",
      description: "We believe in providing premium quality products that our customers can trust.",
      icon: "✨",
    },
    {
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We work tirelessly to exceed expectations.",
      icon: "❤️",
    },
    {
      title: "Innovation",
      description: "Constantly evolving and innovating to bring you the latest and greatest products.",
      icon: "🚀",
    },
    {
      title: "Sustainability",
      description: "Committed to sustainable practices that benefit our planet and future generations.",
      icon: "🌱",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "👨‍💼",
      bio: "With 15+ years in retail, Rajesh founded The Veda Vault to revolutionize online shopping.",
    },
    {
      name: "Priya Singh",
      role: "Head of Operations",
      image: "👩‍💼",
      bio: "Priya ensures seamless operations and delivery excellence across all channels.",
    },
    {
      name: "Amit Patel",
      role: "Product Manager",
      image: "👨‍💼",
      bio: "Amit curates our product collection with an eye for quality and customer preference.",
    },
    {
      name: "Neha Sharma",
      role: "Customer Experience Lead",
      image: "👩‍💼",
      bio: "Neha leads our customer service team to ensure every interaction is delightful.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* <Header heading="About Us" /> */}

      {/* Hero Section */}
      <section className="h-screen py-12 md:py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-base-content">
                Welcome to The Veda Vault
              </h1>
              <p className="text-lg text-base-content/80 mb-4">
                Your one-stop destination for premium quality products and exceptional shopping experience.
              </p>
              <p className="text-base text-base-content/70 mb-6">
                Since 2019, we've been committed to bringing you the finest products with unparalleled customer service. Our journey is built on trust, quality, and a passion for excellence.
              </p>
              <button className="btn btn-primary">
                Shop Now
              </button>
            </div>
            <div className="text-center">
              <div className="text-8xl">🏪</div>
              <p className="text-lg text-base-content/60 mt-4">
                Building trust, one customer at a time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <p className="text-base-content/70">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-20 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Our Mission</h2>
                <p className="text-base-content/80 mb-3">
                  To revolutionize the retail experience by providing high-quality products with exceptional service, making premium shopping accessible to everyone.
                </p>
                <p className="text-base-content/70">
                  We believe that every customer deserves the best, and we're committed to delivering excellence at every touchpoint of their journey.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Our Vision</h2>
                <p className="text-base-content/80 mb-3">
                  To become India's most trusted online marketplace, known for quality products, fair pricing, and unmatched customer service.
                </p>
                <p className="text-base-content/70">
                  We aspire to create a community of satisfied customers who return to us time and again for their shopping needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="text-4xl mb-3">{value.icon}</div>
                  <h3 className="card-title text-xl">{value.title}</h3>
                  <p className="text-base-content/70">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="card-title text-lg">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-base-content/70 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose The Veda Vault?
          </h2>
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">✅</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Verified Quality</h3>
                    <p className="opacity-90">
                      All products are thoroughly verified and tested before reaching you.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🚀</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
                    <p className="opacity-90">
                      Quick and reliable delivery across India within 5-7 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">💰</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Best Prices</h3>
                    <p className="opacity-90">
                      Competitive pricing without compromising on quality or service.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🤝</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                    <p className="opacity-90">
                      Dedicated customer support team available round the clock to assist you.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🔒</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Secure Shopping</h3>
                    <p className="opacity-90">
                      Your data is protected with industry-leading security measures.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">↩️</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
                    <p className="opacity-90">
                      Hassle-free returns within 30 days of purchase, no questions asked.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-20 px-4 bg-base-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have Questions?
          </h2>
          <p className="text-lg text-base-content/70 mb-8">
            We'd love to hear from you. Get in touch with our team for any inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:info@thevedavault.com" className="btn btn-primary">
              📧 Email Us
            </a>
            <a href="tel:+919876543210" className="btn btn-outline btn-primary">
              📞 Call Us
            </a>
          </div>
          <p className="text-sm text-base-content/60 mt-6">
            📍 123 Retail Street, Mumbai, Maharashtra 400001, India
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutUs;