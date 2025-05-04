import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import Header from '../AirPollutant/Header';
import AqiCard from '../AirPollutant/AqiCard';
import Recommendations from '../AirPollutant/Recommendations';
import Tabs from '../AirPollutant/Tabs';
import { FiSun, FiAlertTriangle } from 'react-icons/fi';
import { WiDaySunny, WiCloudy } from 'weather-icons-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const AirPollutantData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeScale, setTimeScale] = useState('daily');
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();
  const navigate = useNavigate();

  const colors = {
    primary: '#6C5CE7',
    secondary: '#00CEFF',
    success: '#00B894',
    warning: '#FDCB6E',
    danger: '#FF7675',
    info: '#0984E3',
    dark: '#2D3436',
    light: '#F5F6FA',
  };

  const fetchData = async (lat, lng, placeInfo) => {
    try {
      setLoading(true);
      setError(null);
      const payload = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        placeInfo,
      };
      const response = await axios.post('/api/air_pollution', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      setData(response.data);
    } catch (err) {
      const errorMessage =
        err.code === 'ECONNREFUSED'
          ? 'Cannot connect to server. Please try again later.'
          : err.response?.status === 404
          ? 'Endpoint not found.'
          : err.response?.data?.error ||
            (err.message.includes('JSON.parse') ? 'Invalid server response' : err.message) ||
            'Failed to fetch air pollution data';
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { latitude, longitude, placeInfo } = location.state || {};
    if (latitude && longitude) {
      fetchData(latitude, longitude, placeInfo || 'Unknown');
    } else {
      setError('No location data provided. Please select a location.');
    }
  }, [location.state]);

  const handleFetchAnotherLocation = () => {
    navigate('/map');
  };

  const getAqiColor = (aqi) => {
    if (aqi <= 1) return colors.success;
    if (aqi <= 2) return colors.warning;
    if (aqi <= 3) return '#FF9F43';
    if (aqi <= 4) return colors.danger;
    return '#6C5CE7';
  };

  const getAqiStatus = (aqi) => {
    if (aqi <= 1) return { label: 'Excellent', icon: <FiSun className="text-yellow-400" /> };
    if (aqi <= 2) return { label: 'Moderate', icon: <WiDaySunny className="text-orange-400" /> };
    if (aqi <= 3) return { label: 'Unhealthy', icon: <WiCloudy className="text-red-400" /> };
    if (aqi <= 4) return { label: 'Dangerous', icon: <FiAlertTriangle className="text-red-600" /> };
    return { label: 'Hazardous', icon: <FiAlertTriangle className="text-purple-600" /> };
  };

  const currentAqi = data?.air_pollution_data?.aqi
    ? Math.min(Math.max(Math.round(data.air_pollution_data.aqi), 1), 5)
    : 1;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').slice(0, 2);
    const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
    const formattedHours = parseInt(hours) % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const getDayFromDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const pm25ChartData = data && data.hourly_pm25 && data.daily_data
    ? {
        labels:
          timeScale === 'hourly'
            ? (data.hourly_pm25.length > 0
                ? data.hourly_pm25.map((item) => item.time || 'Unknown')
                : ['No Data'])
            : (data.daily_data.length > 0
                ? data.daily_data.map((item) => item.date || 'Unknown')
                : ['No Data']),
        datasets: [
          {
            label: 'PM2.5 (µg/m³)',
            data:
              timeScale === 'hourly'
                ? (data.hourly_pm25.length > 0
                    ? data.hourly_pm25.map((item) => Number(item.value) || 0)
                    : [0])
                : (data.daily_data.length > 0
                    ? data.daily_data.map((item) => Number(item.pm2_5) || 0)
                    : [0]),
            borderColor: colors.success,
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, 'rgba(0, 184, 148, 0.7)');
              gradient.addColorStop(1, 'rgba(0, 184, 148, 0.2)');
              return gradient;
            },
            fill: true,
            tension: timeScale === 'hourly' ? 0.4 : 0,
            borderWidth: 3,
            pointBackgroundColor: colors.success,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      }
    : null;

  const pm10ChartData = data && data.hourly_pm10 && data.daily_data
    ? {
        labels:
          timeScale === 'hourly'
            ? (data.hourly_pm10.length > 0
                ? data.hourly_pm10.map((item) => item.time || 'Unknown')
                : ['No Data'])
            : (data.daily_data.length > 0
                ? data.daily_data.map((item) => item.date || 'Unknown')
                : ['No Data']),
        datasets: [
          {
            label: 'PM10 (µg/m³)',
            data:
              timeScale === 'hourly'
                ? (data.hourly_pm10.length > 0
                    ? data.hourly_pm10.map((item) => Number(item.value) || 0)
                    : [0])
                : (data.daily_data.length > 0
                    ? data.daily_data.map((item) => Number(item.pm10) || 0)
                    : [0]),
            borderColor: colors.warning,
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, 'rgba(253, 203, 110, 0.7)');
              gradient.addColorStop(1, 'rgba(253, 203, 110, 0.2)');
              return gradient;
            },
            fill: true,
            tension: timeScale === 'hourly' ? 0.4 : 0,
            borderWidth: 3,
            pointBackgroundColor: colors.warning,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      }
    : null;

  const aqiChartData = data && data.hourly_data && data.daily_data
    ? {
        labels:
          timeScale === 'hourly'
            ? (data.hourly_data.length > 0
                ? data.hourly_data.map((item) => item.time || 'Unknown')
                : ['No Data'])
            : (data.daily_data.length > 0
                ? data.daily_data.map((item) => item.date || 'Unknown')
                : ['No Data']),
        datasets: [
          {
            label: 'AQI',
            data:
              timeScale === 'hourly'
                ? (data.hourly_data.length > 0
                    ? data.hourly_data.map((item) => {
                        const aqiValue = item.value || 0;
                        return Math.min(Math.max(Number(aqiValue), 1), 5);
                      })
                    : [1])
                : (data.daily_data.length > 0
                    ? data.daily_data.map((item) => {
                        const aqiValue = item.aqi || 0;
                        return Math.min(Math.max(Number(aqiValue), 1), 5);
                      })
                    : [1]),
            borderColor: colors.primary,
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, 'rgba(108, 92, 231, 0.7)');
              gradient.addColorStop(1, 'rgba(108, 92, 231, 0.2)');
              return gradient;
            },
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: colors.primary,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      }
    : null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <Header data={data} handleFetchAnotherLocation={handleFetchAnotherLocation} />
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow"
            >
              <p>{error}</p>
            </motion.div>
          )}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
          {data && !loading && (
            <div className="space-y-8">
              <AqiCard
                data={data}
                currentAqi={currentAqi}
                getAqiColor={getAqiColor}
                getAqiStatus={getAqiStatus}
                formatDate={formatDate}
                formatTime={formatTime}
                getDayFromDate={getDayFromDate}
                colors={colors}
              />
              <Recommendations data={data} />
              <Tabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                data={data}
                currentAqi={currentAqi}
                timeScale={timeScale}
                setTimeScale={setTimeScale}
                aqiChartData={aqiChartData}
                pm25ChartData={pm25ChartData}
                pm10ChartData={pm10ChartData}
                colors={colors}
                getAqiStatus={getAqiStatus}
                getAqiColor={getAqiColor}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AirPollutantData;