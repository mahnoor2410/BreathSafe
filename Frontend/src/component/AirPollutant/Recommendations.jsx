import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiWind, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { WiSmoke } from 'weather-icons-react';

const Recommendations = ({ data }) => {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    hover: { scale: 1.03, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', transition: { type: 'spring', stiffness: 300 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 rounded-3xl shadow-2xl border border-gray-200 p-8 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <WiSmoke
        className="absolute text-indigo-200 opacity-20 animate-float"
        style={{ fontSize: '120px', top: '10%', left: '5%' }}
        aria-hidden="true"
      />
      <WiSmoke
        className="absolute text-purple-200 opacity-20 animate-float-slow"
        style={{ fontSize: '140px', bottom: '15%', right: '5%' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 opacity-10 animate-pulse" />

      {/* Main Content */}
      <div className="relative">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <FiInfo className="text-indigo-600" size={28} />
          Air Quality Guidance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recommendations Card */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col"
            role="region"
            aria-label="Air quality recommendations"
          >
            <div className="flex items-center gap-3 mb-4">
              <FiAlertTriangle className="text-indigo-600" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Recommendations</h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed flex-1">
              {data.recommendations || 'No recommendations available at this time. Stay tuned for updates.'}
            </p>
            <div className="mt-4 flex items-center gap-2 text-indigo-600">
              <FiCheckCircle size={18} />
              <span className="text-sm font-medium">Follow these to stay safe</span>
            </div>
          </motion.div>

          {/* Suggestions Card */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col"
            role="region"
            aria-label="Air quality suggestions"
          >
            <div className="flex items-center gap-3 mb-4">
              <FiWind className="text-purple-600" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Suggestions</h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed flex-1">
              {data.suggestions || 'No suggestions available at this time. Check back later.'}
            </p>
            <div className="mt-4 flex items-center gap-2 text-purple-600">
              <FiCheckCircle size={18} />
              <span className="text-sm font-medium">Try these for better air quality</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Recommendations;