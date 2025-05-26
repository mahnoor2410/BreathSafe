import React from "react";
import { motion } from "framer-motion";
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';

const Aboutus = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-white text-gray-800 pt-[70px] md:pt-[60px] sm:pt-[50px]">
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
                  src="images\Airpollutant.jpg" 
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
        <Footer />
      </div>
    </>
  );
};

export default Aboutus;