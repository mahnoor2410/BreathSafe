import React, { useState } from "react";
import Navbar from '../Layout/Navbar'; // Corrected to match the import

const ContactUs = () => {
  // State to handle form submission message
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from reloading on form submit
    setSubmitted(true); // Set submitted to true when the form is submitted
  };

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/* Contact Us Section */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-lg p-8 bg-white shadow-xl rounded-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center text-green-700">
            Contact Us
          </h2>
          {submitted ? (
            <div className="text-center text-green-600 font-medium mb-4">
              Your message has been submitted!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
