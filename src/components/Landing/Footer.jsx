import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CreditCard,
  ShieldCheck,
  RotateCcw,
  Truck
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-100 text-base-content">
      
      {/* Top Section */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Vedavault</h2>
          <p className="text-sm text-gray-600">
            Vedavault brings you timeless saree collections crafted with
            tradition, elegance, and quality.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a className="btn btn-ghost btn-circle">
              <Facebook />
            </a>
            <a className="btn btn-ghost btn-circle">
              <Instagram />
            </a>
            <a className="btn btn-ghost btn-circle">
              <Twitter />
            </a>
            <a className="btn btn-ghost btn-circle">
              <Youtube />
            </a>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Contact Us</li>
            <li className="hover:underline cursor-pointer">FAQs</li>
            <li className="hover:underline cursor-pointer">Shipping Policy</li>
            <li className="hover:underline cursor-pointer">Return & Refund</li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
            <li className="hover:underline cursor-pointer">Terms & Conditions</li>
            <li className="hover:underline cursor-pointer">Disclaimer</li>
          </ul>
        </div>

        {/* Payments & Delivery */}
        <div>
          <h3 className="font-semibold mb-4">We Accept</h3>
          
          <div className="flex gap-3 mb-4">
            <CreditCard />
            <ShieldCheck />
            <RotateCcw />
            <Truck />
          </div>

          <p className="text-sm text-gray-600">
            Secure payments, easy returns & fast delivery across India.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 py-4 text-center text-sm">
        © {new Date().getFullYear()} Vedavault. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
