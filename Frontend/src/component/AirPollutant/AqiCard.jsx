import React from 'react';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { FiSun, FiCalendar, FiClock, FiActivity, FiAlertTriangle, FiHeart } from 'react-icons/fi';
import { WiDaySunny, WiCloudy, WiSmoke } from 'weather-icons-react';

const AqiCard = ({ data, currentAqi, getAqiColor, getAqiStatus, formatDate, formatTime, getDayFromDate, colors }) => {
  const aqiStatus = getAqiStatus(currentAqi);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 opacity-30 animate-smog"></div>
        <WiSmoke className="absolute text-gray-400 opacity-20 animate-float" style={{ fontSize: '150px', top: '10%', left: '10%' }} />
        <WiSmoke className="absolute text-gray-400 opacity-20 animate-float-slow" style={{ fontSize: '200px', bottom: '10%', right: '10%' }} />
      </div>
      <div className="relative p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 mb-6">
              <Doughnut
                data={{
                  labels: ['AQI Level'],
                  datasets: [
                    {
                      data: [currentAqi, 5 - currentAqi],
                      backgroundColor: [getAqiColor(currentAqi), '#F5F6FA'],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  cutout: '80%',
                  rotation: -90,
                  circumference: 180,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                  },
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-16">
                <div className="text-5xl font-bold mb-2" style={{ color: getAqiColor(currentAqi) }}>
                  {currentAqi}
                </div>
                <div className="flex items-center gap-2">
                  {aqiStatus.icon}
                  <span className="text-xl font-semibold text-gray-700">{aqiStatus.label}</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-1000"
                style={{
                  width: `${(currentAqi / 5) * 100}%`,
                  background: `linear-gradient(90deg, ${colors.success}, ${colors.warning}, ${colors.danger}, ${colors.primary})`,
                }}
              ></div>
            </div>
            <div className="flex justify-between w-full mt-2 text-xs text-gray-500">
              <span>Good</span>
              <span>Moderate</span>
              <span>Unhealthy</span>
              <span>Dangerous</span>
              <span>Hazardous</span>
            </div>
          </div>
          <div className="w-full lg:w-1/3 border-l border-r border-gray-200 px-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Current Conditions</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <FiCalendar className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h4 className="text-gray-500 text-sm">Date</h4>
                  <p className="font-medium text-gray-800">
                    {formatDate(data.selected_date || '2025-05-03')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <FiCalendar className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h4 className="text-gray-500 text-sm">Day</h4>
                  <p className="font-medium text-gray-800">
                    {getDayFromDate(data.selected_date || '2025-05-03')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FiClock className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h4 className="text-gray-500 text-sm">Time</h4>
                  <p className="font-medium text-gray-800">
                    {formatTime(data.selected_time || '18:53:29')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <FiActivity className="text-green-600 text-xl" />
                </div>
                <div>
                  <h4 className="text-gray-500 text-sm">Primary Pollutant</h4>
                  <p className="font-medium text-gray-800">
                    PM2.5: {data.air_pollution_data?.pm2_5 || '1.72'} µg/m³
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Health Advice</h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <FiAlertTriangle className="text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Sensitive Groups</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {currentAqi >= 3
                      ? 'Limit outdoor activity. Sensitive groups may experience health effects.'
                      : 'Generally safe for sensitive groups.'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <FiHeart className="text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">General Population</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {currentAqi >= 4
                      ? 'Avoid prolonged outdoor exertion.'
                      : currentAqi >= 2
                      ? 'Consider reducing intense outdoor activities.'
                      : 'Ideal air quality for outdoor activities.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AqiCard;