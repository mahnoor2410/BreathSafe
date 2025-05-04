import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiArrowLeft } from 'react-icons/fi';

const Header = ({ data, handleFetchAnotherLocation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Air Quality Dashboard</h1>
        {data && (
          <div className="flex items-center mt-2">
            <FiMapPin className="text-indigo-600 mr-2" />
            <span className="text-lg text-gray-600">
              {data.air_pollution_data?.info || 'Unknown Location'}
            </span>
          </div>
        )}
      </div>
      <button
        onClick={handleFetchAnotherLocation}
        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 mt-4 md:mt-0"
      >
        <FiArrowLeft className="inline" />
        Change Location
      </button>
    </motion.div>
  );
};

export default Header;