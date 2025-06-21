import React from 'react';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';

const Charts = ({ data, timeScale, setTimeScale, aqiChartData, pm25ChartData, pm10ChartData, colors, getAqiStatus }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const polluantVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  // Common chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* AQI Trend Card */}
      <motion.div
        variants={cardVariants}
        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">AQI Trend</h3>
            <p className="text-sm text-gray-500">Air Quality Index over time</p>
          </div>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
            {['daily', 'hourly'].map((scale) => (
              <button
                key={scale}
                onClick={() => setTimeScale(scale)}
                className={`px-4 py-1 text-sm rounded-full transition-all ${
                  timeScale === scale 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {scale.charAt(0).toUpperCase() + scale.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          {aqiChartData && (
            timeScale === 'hourly' ? (
              <Line
                data={{
                  ...aqiChartData,
                  datasets: [{
                    ...aqiChartData.datasets[0],
                    fill: true,
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderColor: 'rgba(99, 102, 241, 1)',
                  }]
                }}
                options={{
                  ...commonOptions,
                  plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                      ...commonOptions.plugins.tooltip,
                      callbacks: {
                        label: (context) => `AQI: ${context.raw}`,
                      },
                    },
                  },
                  scales: {
                    ...commonOptions.scales,
                    y: {
                      min: 1,
                      max: 5,
                      grid: {
                        color: 'rgba(0,0,0,0.05)'
                      },
                      ticks: {
                        stepSize: 1,
                        callback: (value) => {
                          const status = getAqiStatus(value);
                          return `${value} (${status.label})`;
                        },
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.4,
                      borderWidth: 1,
                    },
                    point: {
                      radius: 2,
                      hoverRadius: 4,
                      backgroundColor: 'white',
                      borderWidth: 1
                    }
                  },
                }}
              />
            ) : (
              <Bar
                data={aqiChartData}
                options={{
                  ...commonOptions,
                  plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                      ...commonOptions.plugins.tooltip,
                      callbacks: {
                        label: (context) => `AQI: ${context.raw}`,
                      },
                    },
                  },
                  scales: {
                    ...commonOptions.scales,
                    y: {
                      min: 1,
                      max: 5,
                      grid: {
                        color: 'rgba(0,0,0,0.05)'
                      },
                      ticks: {
                        stepSize: 1,
                        callback: (value) => {
                          const status = getAqiStatus(value);
                          return `${value} (${status.label})`;
                        },
                      },
                    },
                  },
                  barPercentage: 0.8,
                  categoryPercentage: 0.9,
                  backgroundColor: 'rgba(99, 102, 241, 0.5)',
                  borderColor: 'rgba(99, 102, 241, 1)',
                  borderWidth: 1
                }}
              />
            )
          )}
        </div>
      </motion.div>

      {/* Pollutant Levels Card */}
      <motion.div
        variants={cardVariants}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800"> Current Air Pollutants Level</h3>
          <p className="text-sm text-gray-500">Current concentration in µg/m³</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'PM2.5', value: data.air_pollution_data?.pm2_5 || 0, color: colors.success, max: 35 },
            { name: 'PM10', value: data.air_pollution_data?.pm10 || 0, color: colors.warning, max: 50 },
            { name: 'CO', value: data.air_pollution_data?.co || 0, color: colors.danger, max: 5 },
            { name: 'NO2', value: data.air_pollution_data?.no2 || 0, color: colors.info, max: 100 },
            { name: 'O3', value: data.air_pollution_data?.o3 || 0, color: colors.primary, max: 100 },
            { name: 'SO2', value: data.air_pollution_data?.so2 || 0, color: colors.secondary, max: 100 },
          ].map((pollutant, index) => (
            <motion.div
              key={index}
              variants={polluantVariants}
              whileHover="hover"
              className="bg-white p-4 rounded-lg border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm font-medium">{pollutant.name}</span>
                <span className="font-bold text-sm" style={{ color: pollutant.color }}>
                  {pollutant.value} µg/m³
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.min((pollutant.value / pollutant.max) * 100, 100)}%`,
                    transition: { delay: 0.2 + index * 0.05 }
                  }}
                  style={{ backgroundColor: pollutant.color }}
                ></motion.div>
              </div>
              <div className="text-right mt-1">
                <span className="text-xs text-gray-400">Max: {pollutant.max}µg</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* PM2.5 Trend Card */}
      {pm25ChartData && pm25ChartData.labels.length > 0 && (
        <motion.div
          variants={cardVariants}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">PM2.5 Trend</h3>
              <p className="text-sm text-gray-500">Fine particulate matter (≤2.5µm)</p>
            </div>
          </div>
          <div className="h-64">
            {timeScale === 'hourly' ? (
              <Line
                data={{
                  ...pm25ChartData,
                  datasets: [{
                    ...pm25ChartData.datasets[0],
                    fill: true,
                    backgroundColor: colors.success + '33',
                    borderColor: colors.success,
                  }]
                }}
                options={{
                  ...commonOptions,
                  plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                      ...commonOptions.plugins.tooltip,
                      callbacks: {
                        label: (context) => `PM2.5: ${context.raw} µg/m³`,
                      },
                    },
                  },
                  scales: {
                    ...commonOptions.scales,
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: {
                        color: 'rgba(0,0,0,0.05)'
                      },
                      ticks: {
                        stepSize: 10,
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.4,
                      borderWidth: 1,
                    },
                    point: {
                      radius: 2,
                      hoverRadius: 4,
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: colors.success
                    }
                  },
                }}
              />
            ) : (
              <Bar
                data={pm25ChartData}
                options={{
                  ...commonOptions,
                  plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                      ...commonOptions.plugins.tooltip,
                      callbacks: {
                        label: (context) => `PM2.5: ${context.raw} µg/m³`,
                      },
                    },
                  },
                  scales: {
                    ...commonOptions.scales,
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: {
                        color: 'rgba(0,0,0,0.05)'
                      },
                      ticks: {
                        stepSize: 10,
                      },
                    },
                  },
                  barPercentage: 0.8,
                  categoryPercentage: 0.9,
                  backgroundColor: colors.success + '80',
                  borderColor: colors.success,
                  borderWidth: 1
                }}
              />
            )}
          </div>
        </motion.div>
      )}

      {/* PM10 Trend Card */}
      {pm10ChartData && pm10ChartData.labels.length > 0 && (
        <motion.div
          variants={cardVariants}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">PM10 Trend</h3>
              <p className="text-sm text-gray-500">Coarse particulate matter (≤10µm)</p>
            </div>
          </div>
          <div className="h-64">
            {timeScale === 'hourly' ? (
              <Line
                data={{
                  ...pm10ChartData,
                  datasets: [{
                    ...pm10ChartData.datasets[0],
                    fill: true,
                    backgroundColor: colors.warning + '33',
                    borderColor: colors.warning,
                  }]
                }}
                options={{
                  ...commonOptions,
                  plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                      ...commonOptions.plugins.tooltip,
                      callbacks: {
                        label: (context) => `PM10: ${context.raw} µg/m³`,
                      },
                    },
                  },
                  scales: {
                    ...commonOptions.scales,
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: {
                        color: 'rgba(0,0,0,0.05)'
                      },
                      ticks: {
                        stepSize: 10,
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.4,
                      borderWidth: 1,
                    },
                    point: {
                      radius: 2,
                      hoverRadius: 4,
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: colors.warning
                    }
                  },
                }}
              />
            ) : (
              <Bar
                data={pm10ChartData}
                options={{
                  ...commonOptions,
                  plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                      ...commonOptions.plugins.tooltip,
                      callbacks: {
                        label: (context) => `PM10: ${context.raw} µg/m³`,
                      },
                    },
                  },
                  scales: {
                    ...commonOptions.scales,
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: {
                        color: 'rgba(0,0,0,0.05)'
                      },
                      ticks: {
                        stepSize: 10,
                      },
                    },
                  },
                  barPercentage: 0.8,
                  categoryPercentage: 0.9,
                  backgroundColor: colors.warning + '80',
                  borderColor: colors.warning,
                  borderWidth: 1
                }}
              />
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Charts;