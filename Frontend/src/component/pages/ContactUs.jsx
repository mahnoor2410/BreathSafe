import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaComment, FaPaperPlane } from "react-icons/fa";
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col pt-[70px] md:pt-[60px] sm:pt-[50px]">
        {/* Contact Us Section */}
        <motion.section 
          className="flex-grow flex items-center justify-center px-6 py-12 sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto w-full text-center">
            <motion.h2 
              className="text-4xl font-bold mb-4 text-gray-800 font-roboto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Contact <span className="text-green-600">BreatheSafe</span>
            </motion.h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
            <motion.p 
              className="text-lg text-gray-600 font-medium max-w-xl mx-auto mb-12 font-roboto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We’re here to answer your questions and hear your feedback. Let’s work together to ensure cleaner air for all.
            </motion.p>

            {/* Contact Form */}
            <motion.div 
              className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {submitted ? (
                <motion.div 
                  className="text-center text-green-600 font-medium font-roboto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Your message has been submitted! We’ll get back to you soon.
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 shadow-md font-roboto"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2 font-roboto" htmlFor="name">Name</label>
                    <div className="flex items-center">
                      <FaUser className="absolute left-4 text-gray-500 text-lg" />
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 hover:border-green-400 focus:border-green-500"
                        required
                        aria-label="Your name"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2 font-roboto" htmlFor="email">Email</label>
                    <div className="flex items-center">
                      <FaEnvelope className="absolute left-4 text-gray-500 text-lg" />
                      <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 hover:border-green-400 focus:border-green-500"
                        required
                        aria-label="Your email address"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2 font-roboto" htmlFor="message">Message</label>
                    <div className="flex items-start">
                      <FaComment className="absolute left-4 mt-3 text-gray-500 text-lg" />
                      <textarea
                        id="message"
                        rows="4"
                        placeholder="Type your message..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 hover:border-green-400 focus:border-green-500"
                        required
                        aria-label="Your message"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md font-roboto flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.section>
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;