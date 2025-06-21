import React from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { FiEye, FiHeart, FiWind, FiActivity } from 'react-icons/fi';
import Charts from './Charts';

const Tabs = ({ activeTab, setActiveTab, data, currentAqi, timeScale, setTimeScale, aqiChartData, pm25ChartData, pm10ChartData, colors, getAqiStatus, getAqiColor }) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'pollutants', label: 'Pollutants' },
    { id: 'forecast', label: 'Forecast' },
    { id: 'health', label: 'Health Tips' },
  ];

  return (
    <>
      <div className="flex overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium rounded-t-lg whitespace-nowrap mr-2 transition-all ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-xl overflow-hidden p-6">
        {activeTab === 'overview' && (
          <Charts
            data={data}
            timeScale={timeScale}
            setTimeScale={setTimeScale}
            aqiChartData={aqiChartData}
            pm25ChartData={pm25ChartData}
            pm10ChartData={pm10ChartData}
            colors={colors}
            getAqiStatus={getAqiStatus}
          />
        )}
        {activeTab === 'pollutants' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Detailed Pollutant Analysis</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h4 className="font-medium text-gray-800 mb-4">Particulate Matter</h4>
                <div className="h-64">
                  <Bar
                    data={{
                      labels: ['PM2.5', 'PM10'],
                      datasets: [
                        {
                          data: [data.air_pollution_data?.pm2_5 || 0, data.air_pollution_data?.pm10 || 0],
                          backgroundColor: (context) => {
                            const ctx = context.chart.ctx;
                            const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
                            gradient1.addColorStop(0, 'rgba(0, 184, 148, 0.9)');
                            gradient1.addColorStop(1, 'rgba(0, 184, 148, 0.4)');
                            const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
                            gradient2.addColorStop(0, 'rgba(253, 203, 110, 0.9)');
                            gradient2.addColorStop(1, 'rgba(253, 203, 110, 0.4)');
                            return [gradient1, gradient2];
                          },
                          borderRadius: 6,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.label}: ${context.raw} µg/m³`,
                          },
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Concentration (µg/m³)',
                          },
                        },
                      },
                      animation: {
                        duration: 1500,
                        easing: 'easeInOutQuart',
                      },
                    }}
                  />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                <h4 className="font-medium text-gray-800 mb-4">Gaseous Pollutants</h4>
                <div className="h-64">
                  <Bar
                    data={{
                      labels: ['CO', 'NO2', 'O3', 'SO2'],
                      datasets: [
                        {
                          data: [
                            data.air_pollution_data?.co || 0,
                            data.air_pollution_data?.no2 || 0,
                            data.air_pollution_data?.o3 || 0,
                            data.air_pollution_data?.so2 || 0,
                          ],
                          backgroundColor: (context) => {
                            const ctx = context.chart.ctx;
                            const gradients = [
                              ctx.createLinearGradient(0, 0, 0, 400),
                              ctx.createLinearGradient(0, 0, 0, 400),
                              ctx.createLinearGradient(0, 0, 0, 400),
                              ctx.createLinearGradient(0, 0, 0, 400),
                            ];
                            gradients[0].addColorStop(0, 'rgba(255, 118, 117, 0.9)');
                            gradients[0].addColorStop(1, 'rgba(255, 118, 117, 0.4)');
                            gradients[1].addColorStop(0, 'rgba(9, 132, 227, 0.9)');
                            gradients[1].addColorStop(1, 'rgba(9, 132, 227, 0.4)');
                            gradients[2].addColorStop(0, 'rgba(108, 92, 231, 0.9)');
                            gradients[2].addColorStop(1, 'rgba(108, 92, 231, 0.4)');
                            gradients[3].addColorStop/gradients[3].addColorStop(0, 'rgba(0, 206, 255, 0.9)');
                            gradients[3].addColorStop(1, 'rgba(0, 206, 255, 0.4)');
                            return gradients;
                          },
                          borderRadius: 6,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.label}: ${context.raw} µg/m³`,
                          },
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Concentration (µg/m³)',
                          },
                        },
                      },
                      animation: {
                        duration: 1500,
                        easing: 'easeInOutQuart',
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {activeTab === 'forecast' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">7-Day Forecast</h3>
            <div className="overflow-x-auto">
              <table className="w-full rounded-lg shadow-md overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <th className="py-4 px-6 text-left">Day</th>
                    <th className="py-4 px-6 text-left">Date</th>
                    <th className="py-4 px-6 text-left">AQI</th>
                    <th className="py-4 px-6 text-left">PM2.5</th>
                    <th className="py-4 px-6 text-left">CO</th>
                    <th className="py-4 px-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.weekly_forecast.map((item, index) => {
                    const aqi = Math.min(Math.max(Math.round(item.aqi), 1), 5);
                    const status = getAqiStatus(aqi);
                    return (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white hover:bg-gray-50 transition-all duration-300"
                      >
                        <td className="py-4 px-6 flex items-center gap-2">
                          {status.icon}
                          <span>{item.day}</span>
                        </td>
                        <td className="py-4 px-6">{item.date}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium shadow-sm"
                              style={{ backgroundColor: getAqiColor(aqi) }}
                            >
                              {aqi}
                            </div>
                            <span>{status.label}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">{item.pm2_5} µg/m³</td>
                        <td className="py-4 px-6">{item.co} µg/m³</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            {status.icon}
                            <span className="text-sm">{status.label}</span>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
        {activeTab === 'health' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
              <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                <FiEye className="text-green-600" /> Outdoor Activities
              </h4>
              <p className="text-gray-600">
                {currentAqi <= 2
                  ? 'Perfect conditions for all outdoor activities. Enjoy the fresh air!'
                  : currentAqi <= 3
                  ? "Consider reducing intense outdoor activities, especially if you're sensitive."
                  : 'Limit outdoor activities. Choose indoor alternatives when possible.'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl">
              <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                <FiHeart className="text-red-600" /> Health Precautions
              </h4>
              <p className="text-gray-600">
                {currentAqi <= 2
                  ? 'No special precautions needed for most people.'
                  : currentAqi <= 3
                  ? 'People with heart or lung disease should consider reducing exertion.'
                  : 'Everyone may begin to experience health effects. Sensitive groups should avoid exertion.'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
              <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                <FiWind className="text-purple-600" /> Indoor Air Quality
              </h4>
              <p className="text-gray-600">
                {currentAqi <= 2
                  ? 'Natural ventilation is recommended.'
                  : 'Keep windows closed and use air purifiers if available. Avoid activities that generate indoor pollution.'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                <FiActivity className="text-blue-600" /> Long-term Exposure
              </h4>
              <p className="text-gray-600">
                {currentAqi <= 2
                  ? 'Minimal risk from current air quality levels.'
                  : 'Prolonged exposure may lead to respiratory issues. Consider protective measures if regularly exposed.'}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Tabs;