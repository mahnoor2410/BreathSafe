import React from "react";
import { motion } from "framer-motion";
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';

const Aboutus = () => {
  return (
    <>
      <Navbar/>
      <div className="w-full min-h-screen bg-white text-gray-800 overflow-hidden">
        {/* Hero Section with Parallax Effect */}
        <div className="relative w-full h-screen overflow-hidden">
          {/* Background Image with Parallax Effect */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <img
              src="/images/Airpollutant.jpg"
              alt="Air Quality Monitoring"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-green-800/40"></div>
          </motion.div>
          
          {/* Hero Content */}
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-green-300">Breathe</span><span className="text-white">Safe</span>
            </motion.h1>
            
            <motion.p 
              className="mt-4 text-xl md:text-3xl text-white max-w-3xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Every breath matters. Monitor air quality in real time with{" "}
              <span className="font-semibold text-green-200">BreatheSmart</span>.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12"
            >
              <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Learn How It Works
              </button>
            </motion.div>
          </div>
          
          {/* Scrolling Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>

        {/* About Us Section */}
        <section className="px-6 py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                About <span className="text-green-500">BreatheSafe</span>
              </h2>
              <div className="w-24 h-1 bg-green-500 mx-auto"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Air pollution monitoring" 
                  className="rounded-xl shadow-2xl w-full h-auto"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Story</h3>
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  <strong className="text-green-600">BreatheSafe</strong> is more than just a project—it's a
                  mission-driven initiative born out of the urgent need for cleaner
                  air and healthier lives. In a world where pollution silently impacts
                  millions every day, we've harnessed the power of technology to bring
                  the invisible into view.
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  Our platform translates complex environmental data into clear,
                  user-friendly insights that empower individuals, communities,
                  and organizations to make informed decisions about their environment.
                </p>
              </motion.div>
            </div>
            
            {/* Mission and Vision Cards */}
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-lg leading-relaxed text-gray-600">
                  To create a world where everyone has access to real-time air
                  quality information—because every breath counts. We envision
                  cities where clean air is a right, not a privilege.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-lg leading-relaxed text-gray-600">
                  To monitor, analyze, and deliver accurate air pollution data
                  instantly, helping users take control of their environment and
                  their health through actionable insights and recommendations.
                </p>
              </motion.div>
            </div>
            
 
              </div>

        </section>
      </div>
      <Footer/>
    </>
  );
};

export default Aboutus;