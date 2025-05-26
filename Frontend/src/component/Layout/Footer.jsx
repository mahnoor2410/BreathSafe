import React, { useState } from "react";
import { FaBus, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#2d4a2d] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="flex flex-col items-center lg:items-start">
            <Link 
              to="/" 
              className="group flex flex-col items-center lg:items-start mb-4"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105 shadow-lg">
                <img 
                  src="images/logo.png" 
                  alt="Breathe Safe Logo" 
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-3xl font-bold underline decoration-emerald-300 decoration-2 underline-offset-8 transition-colors duration-300 group-hover:text-emerald-300">
                Breathe Safe
              </span>
            </Link>
            <p className="text-sm text-center lg:text-left text-gray-300 mb-4">
              Empowering you with clean air intelligence since 2023
            </p>
            
            {/* Newsletter Subscription */}
            <div className="w-full mt-4">
              <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="px-3 py-2 text-sm text-gray-800 rounded-l focus:outline-none w-full"
                  required
                />
                <button 
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-r text-sm font-medium transition-colors"
                >
                  {isSubscribed ? '✓' : 'Go'}
                </button>
              </form>
              {isSubscribed && (
                <p className="text-xs text-emerald-300 mt-1">Thank you for subscribing!</p>
              )}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-emerald-600 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Air Quality Map", path: "/map" },
                { name: "About Us", path: "/aboutus" },
                { name: "Contact", path: "/contactus" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-emerald-300 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-emerald-600 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiPhoneCall className="text-emerald-300 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <a 
                    href="tel:+923204343973" 
                    className="text-gray-300 hover:text-emerald-300 transition-colors text-sm"
                  >
                    +92-320-4343973
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <IoMdMail className="text-emerald-300 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <a 
                    href="mailto:info@breathesafe.com" 
                    className="text-gray-300 hover:text-emerald-300 transition-colors text-sm"
                  >
                    info@BreatheSafe.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <HiLocationMarker className="text-emerald-300 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Visit Us</p>
                  <span className="text-gray-300 text-sm">
                    123 Breathe Safe St, Clean Air City
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-emerald-600 inline-block">
              Follow Us
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              Stay connected for air quality updates and tips
            </p>
            <div className="flex space-x-4 mb-6">
              {[
                { icon: <FaFacebookF />, color: "hover:text-blue-500" },
                { icon: <FaTwitter />, color: "hover:text-blue-400" },
                { icon: <FaInstagram />, color: "hover:text-pink-600" },
                { icon: <FaLinkedin />, color: "hover:text-blue-600" },
                { icon: <FaYoutube />, color: "hover:text-red-600" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Download Our App</h4>
              <div className="flex space-x-3">
                <button className="bg-black hover:bg-gray-800 text-white px-3 py-2 rounded flex items-center text-xs transition-colors">
                  <span className="mr-1">App Store</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm1 3v4h4v2h-4v4h-2v-4H7v-2h4V7h2z"/>
                  </svg>
                </button>
                <button className="bg-black hover:bg-gray-800 text-white px-3 py-2 rounded flex items-center text-xs transition-colors">
                  <span className="mr-1">Play Store</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h18v18H3V3zm4 4v10h10V7H7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Breathe Safe. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-emerald-300 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-300 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-300 text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;