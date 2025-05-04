import React, { useState, useEffect } from 'react';
import Navbar from "../Layout/Navbar";
import { Link } from 'react-router-dom';
import { 
  FaCity, FaSmog, FaHeartbeat, FaTemperatureHigh, FaWind, 
  FaGlobe, FaChartLine, FaLeaf, FaShieldAlt, FaMobileAlt,
  FaCloudSun, FaUserMd, FaMapMarkedAlt
} from "react-icons/fa";
import { MdAir, MdHealthAndSafety, MdOutlineScience, MdPeople } from "react-icons/md";
import { RiLiveLine } from "react-icons/ri";
import Footer from '../Layout/Footer';
import './LandingPage.css';

const cardsData = [
  { icon: <FaCity className="text-3xl" />, label: "Cities Monitored", value: 120, change: "+12 this month" },
  { icon: <FaSmog className="text-3xl" />, label: "AQI Reports", value: "5,400+", change: "Updated hourly" },
  { icon: <FaHeartbeat className="text-3xl" />, label: "Health Alerts", value: 98, change: "Active now" },
  { icon: <FaTemperatureHigh className="text-3xl" />, label: "Temperature", value: "34°C", change: "Feels like 38°C" },
  { icon: <FaWind className="text-3xl" />, label: "Wind Index", value: "15 km/h", change: "NE direction" },
  { icon: <FaGlobe className="text-3xl" />, label: "Regions Covered", value: 25, change: "Expanding weekly" },
];

const features = [
  {
    icon: <RiLiveLine className="text-4xl" />,
    title: "Live Air Quality Maps",
    description: "Interactive maps showing real-time pollution levels across all monitored locations."
  },
  {
    icon: <MdHealthAndSafety className="text-4xl" />,
    title: "Personalized Health Dashboard",
    description: "Custom health recommendations based on your medical profile and local air conditions."
  },
  {
    icon: <FaChartLine className="text-4xl" />,
    title: "Advanced Analytics",
    description: "Detailed historical data and predictive forecasts for informed decision making."
  },
  {
    icon: <FaShieldAlt className="text-4xl" />,
    title: "Emergency Alerts",
    description: "Instant notifications when air quality reaches dangerous levels in your area."
  }
];

const testimonials = [
  {
    quote: "This app helped me manage my asthma much better. The pollution alerts are life-saving!",
    author: "Sarah K., Teacher",
    location: "New Delhi"
  },
  {
    quote: "As a parent, I check air quality every morning before sending my kids to school. Essential tool!",
    author: "Michael T., Engineer",
    location: "Los Angeles"
  },
  {
    quote: "Our city planners use this data to make better environmental decisions. Incredibly accurate.",
    author: "Dr. Elena R., Urban Planner",
    location: "Berlin"
  }
];

const pollutantsData = [
  { name: "PM2.5", description: "Fine particulate matter that can penetrate deeply into the lungs.", icon: <FaSmog className="text-3xl text-green-600" /> },
  { name: "PM10", description: "Larger particulate matter affecting respiratory functions.", icon: <FaCloudSun className="text-3xl text-green-600" /> },
  { name: "NO₂", description: "Nitrogen dioxide primarily from vehicle emissions.", icon: <FaCity className="text-3xl text-green-600" /> },
  { name: "O₃", description: "Ozone formed by chemical reactions in sunlight.", icon: <FaGlobe className="text-3xl text-green-600" /> },
  { name: "CO", description: "Carbon monoxide, a colorless, odorless gas from burning fuels.", icon: <FaWind className="text-3xl text-green-600" /> },
  { name: "SO₂", description: "Sulfur dioxide from fossil fuel combustion and industrial processes.", icon: <FaTemperatureHigh className="text-3xl text-green-600" /> },
];

function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 overflow-hidden">
        <Navbar />

        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 animate-kenburns"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1578927544786-a8a24b38db7f?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              animation: 'kenburns 20s infinite alternate'
            }}
          ></div>
          
          <div className={`relative z-10 text-center px-4 transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block bg-green-600 bg-opacity-90 text-white px-4 py-1 rounded-full mb-4 text-sm font-medium animate-pulse">
              <RiLiveLine className="inline mr-2" /> LIVE DATA UPDATES
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-green-300">Breathe Easy</span> in a Changing World 
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Advanced air quality intelligence protecting millions worldwide. Join the movement for cleaner air.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/Info" 
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center text-sm md:text-base"
              >
                <FaMapMarkedAlt className="mr-2" /> Explore Air Map
              </Link>
              <Link 
                to="/Map" 
                className="px-6 py-3 bg-white bg-opacity-90 hover:bg-opacity-100 text-green-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center text-sm md:text-base"
              >
                <FaMobileAlt className="mr-2" /> Get Started
              </Link>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>

        {/* Pollutants Section */}
        <div className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Know Your Pollutants</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Understanding air pollutants helps you stay informed and protected.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pollutantsData.map((pollutant, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex justify-center mb-4">
                    {pollutant.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{pollutant.name}</h3>
                  <p className="text-gray-600 text-sm">{pollutant.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Complete Air Quality Solution</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We combine cutting-edge technology with health science to deliver unparalleled air quality insights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="flex justify-center mb-4 text-green-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-sm text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4 text-xs font-medium">
                  <MdOutlineScience className="inline mr-1" /> OUR TECHNOLOGY
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Advanced Sensor Network & AI Analytics</h2>
                <p className="text-gray-600 mb-6">
                  Our proprietary system combines thousands of environmental sensors with satellite data and machine learning to deliver the most accurate air quality measurements available.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Hyper-local monitoring down to street level</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Predictive pollution forecasting</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Medical-grade health recommendations</span>
                  </li>
                </ul>
                <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                  Learn More About Our Tech
                </button>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHNtb2d8ZW58MHwwfDB8fHww" 
                    alt="Air quality monitoring technology" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4 text-xs font-medium">
              <MdPeople className="inline mr-1" /> TRUSTED BY MILLIONS
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-12">What Our Users Say</h2>
            
            <div className="relative h-56 mb-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${index === currentTestimonial ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl mx-auto h-full flex flex-col justify-center">
                    <svg className="w-8 h-8 text-green-200 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-gray-800">{testimonial.author}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full ${index === currentTestimonial ? 'bg-green-600' : 'bg-gray-300'}`}
                  aria-label={`View testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Health Professionals Section */}
        <div className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" 
                  alt="Doctor using air quality app" 
                  className="rounded-xl shadow-md w-full h-auto"
                />
              </div>
              <div className="lg:w-1/2">
                <div className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full mb-4 text-xs font-medium">
                  <FaUserMd className="inline mr-1" /> FOR HEALTH PROFESSIONALS
                </div>
                <h2 className="text-3xl font-bold mb-6">Medical-Grade Air Quality Data</h2>
                <p className="mb-6 opacity-90">
                  Our platform is trusted by healthcare providers worldwide to help patients with respiratory conditions manage their health in relation to environmental factors.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <div className="bg-white bg-opacity-10 p-3 rounded-lg">
                    <h3 className="font-bold mb-1">Clinical Integration</h3>
                    <p className="text-xs opacity-90">EHR-compatible API for patient monitoring</p>
                  </div>
                  <div className="bg-white bg-opacity-10 p-3 rounded-lg">
                    <h3 className="font-bold mb-1">Research Partnership</h3>
                    <p className="text-xs opacity-90">Collaborate with our environmental health team</p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  <FaUserMd className="inline mr-2" /> Healthcare Solutions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="py-16 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Air?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of environmentally conscious individuals and organizations making a difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link 
                to="/Info" 
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <RiLiveLine className="mr-2" /> Start Exploring Now
              </Link>
              <Link 
                to="/Map" 
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <FaMobileAlt className="mr-2" /> Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default LandingPage;