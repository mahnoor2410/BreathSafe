import React, { useEffect, useRef } from 'react';
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';
import {
  FaLungs,
  FaHeartbeat,
  FaBrain,
  FaChild,
  FaRunning,
  FaAllergies,
  FaWind,
  FaCloudSunRain,
  FaSmog,
  FaLeaf
} from "react-icons/fa";
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

const PollutantInfo = () => {
  const topRef = useRef(null);
  const location = useLocation();

  // Scroll to top on route change or component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timer = setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'instant' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, // Fixed: Removed stray single quote
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cards = [
    {
      icon: <FaLungs className="text-4xl" />,
      title: "Respiratory Health",
      desc: "Air pollution damages lung tissue and exacerbates conditions like asthma and COPD.",
      color: "from-teal-100 to-teal-50",
      textColor: "text-teal-800"
    },
    {
      icon: <FaHeartbeat className="text-4xl" />,
      title: "Heart Disease",
      desc: "Increases risks of heart attacks, strokes, and high blood pressure.",
      color: "from-rose-100 to-rose-50",
      textColor: "text-rose-800"
    },
    {
      icon: <FaBrain className="text-4xl" />,
      title: "Brain Function",
      desc: "Linked to cognitive decline and increased dementia risk.",
      color: "from-indigo-100 to-indigo-50",
      textColor: "text-indigo-800"
    },
    {
      icon: <FaChild className="text-4xl" />,
      title: "Child Development",
      desc: "Impairs lung growth and may cause developmental delays.",
      color: "from-emerald-100 to-emerald-50",
      textColor: "text-emerald-800"
    },
    {
      icon: <FaRunning className="text-4xl" />,
      title: "Athletic Performance",
      desc: "Reduces stamina and oxygen uptake during exercise.",
      color: "from-amber-100 to-amber-50",
      textColor: "text-amber-800"
    },
    {
      icon: <FaAllergies className="text-4xl" />,
      title: "Allergies",
      desc: "Worsens allergic reactions and weakens immunity.",
      color: "from-lime-100 to-lime-50",
      textColor: "text-lime-800"
    },
  ];

  const pollutants = [
    { name: "PM2.5", level: "High", icon: <FaSmog />, desc: "Microscopic particles penetrate deep into lungs" },
    { name: "Ozone", level: "Moderate", icon: <FaCloudSunRain />, desc: "Ground-level ozone causes respiratory distress" },
    { name: "NO₂", level: "Medium", icon: <FaWind />, desc: "From vehicle emissions, irritates airways" },
    { name: "SO₂", level: "Low", icon: <FaLeaf />, desc: "Industrial byproduct, causes acid rain" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div ref={topRef}></div>
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow relative overflow-hidden pt-16">
        {/* Added pt-16 to offset navbar */}
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlNWU1ZTUiIiBmaWxsLW9wYWNpdHk9IjAuMyI+PHBhdGggZD0iTTM2IDM0YzAtMi0xLjEtMy0zLTNzLTMgMS0zIDMgMS4xIDMgMyAzIDMtMSAzLTN6bTAgMGMwIDIgMS4xIDMgMyAzczMtMSAzLTMtMS4xLTMtMy0zLTMgMS0zIDN6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
                Air Quality & Health Impacts
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Understanding how air pollution affects your body and how to protect yourself
            </p>
          </motion.div>

          {/* Health impact cards */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          >
            {cards.map((card, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.025)"
                }}
                className={`bg-gradient-to-br ${card.color} rounded-xl shadow-sm overflow-hidden ${card.textColor} border border-gray-100 transform transition-all duration-300 hover:shadow-md`}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm mr-4 shadow-sm">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                  </div>
                  <p className="mb-4 opacity-90">{card.desc}</p>
                  {/* Progress bar added */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      className={`h-1.5 rounded-full ${card.textColor.replace('text-', 'bg-')}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pollutant info with animated meter */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-16 border border-gray-100">
            <div className="md:flex">
              <div className="p-8 md:p-10 md:w-1/2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Common Air Pollutants
                </h2>
                <p className="text-gray-600 mb-6">
                  These are the most harmful substances affecting air quality today:
                </p>
                
                <div className="space-y-5">
                  {pollutants.map((pollutant, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex items-start"
                    >
                      <div className={`p-3 rounded-lg ${
                        pollutant.level === "High" ? "bg-red-100 text-red-600" :
                        pollutant.level === "Moderate" ? "bg-orange-100 text-orange-600" :
                        pollutant.level === "Medium" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"
                      } mr-4`}>
                        {pollutant.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-gray-800">{pollutant.name}</h4>
                          <span className="text-xs font-medium text-gray-500">{pollutant.level} risk</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 
                              pollutant.level === "High" ? "90%" :
                              pollutant.level === "Moderate" ? "65%" :
                              pollutant.level === "Medium" ? "45%" : "25%"
                            }}
                            transition={{ duration: 1, delay: i * 0.3 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`h-full ${
                              pollutant.level === "High" ? "bg-red-400" :
                              pollutant.level === "Moderate" ? "bg-orange-400" :
                              pollutant.level === "Medium" ? "bg-yellow-400" : "bg-green-400"
                            } rounded-full`}
                          />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{pollutant.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-1/2 bg-gradient-to-br from-blue-50 to-teal-50 p-8 md:p-10 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-100">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-center w-full max-w-md"
                >
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    {/* Animated globe */}
                    <div className="absolute inset-0 rounded-full bg-blue-200 opacity-20"></div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 rounded-full border border-dashed border-blue-200 opacity-70"
                    ></motion.div>
                    <div className="absolute inset-6 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <FaWind className="text-4xl text-blue-500 opacity-80" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Air Quality</h3>
                  <p className="text-gray-600 mb-6 text-sm">Check current pollution levels in your area</p>
                  <Link to="/Map">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-shadow"
                    >
                      View Live Map
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Protection tips */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl shadow-sm overflow-hidden text-white"
          >
            <div className="md:flex">
              <div className="p-8 md:p-10 md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Protection Strategies</h2>
                <p className="text-blue-100 mb-6 opacity-90">
                  Simple steps to reduce your exposure to air pollution:
                </p>
                <ul className="space-y-3">
                  {[
                    "Check daily AQI forecasts before outdoor activities",
                    "Use high-efficiency air purifiers at home",
                    "Create a clean air room with extra filtration",
                    "Wear N95 masks on high pollution days",
                    "Avoid exercising near high-traffic areas",
                    "Keep windows closed when outdoor air quality is poor"
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3">
                        <div className="w-5 h-5 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </div>
                      </div>
                      <span className="text-blue-50 opacity-90">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-7 md:p-10 md:w-1/2 bg-white bg-opacity-10 backdrop-blur-sm border-t md:border-t-0 md:border-l border-white border-opacity-10">
                <h3 className="text-xl font-bold mb-4">Indoor Air Facts</h3>
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "auto" }}
                  transition={{ delay: 0.3 }}
                  className="bg-white bg-opacity-10 rounded-lg p-5 mb-6 border border-white border-opacity-10"
                >
                  <p className="mb-3 text-blue-100 opacity-90">Indoor air can be 2-5x more polluted than outdoor air due to:</p>
                  <ul className="space-y-2 text-blue-100 opacity-90">
                    <li className="flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-2 opacity-70"></span>
                      Cooking fumes
                    </li>
                    <li className="flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-2 opacity-70"></span>
                      Cleaning chemicals
                    </li>
                    <li className="flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-2 opacity-70"></span>
                      Mold spores
                    </li>
                    <li className="flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-2 opacity-70"></span>
                      Off-gassing from furniture
                    </li>
                  </ul>
                </motion.div>
                <Link to="/Map">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 bg-white text-blue-600 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-shadow"
                  >
                    Get Personalized Recommendations
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PollutantInfo;