import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';

const cities = [
  "Lahore", "Karachi", "Faisalabad", "Gujranwala", "Peshawar",
  "Islamabad", "Rawalpindi", "Sialkot", "Multan", "Quetta",
  "Sheikhupura", "Bahawalpur", "Sargodha", "Hyderabad", "Okara"
];

const apiKey = "NZBaTfW3v1NkMEJvs/Ds/g==3avSnMBjl9A9nlrq";

const getAirQualityDescription = (aqi) => {
  if (aqi <= 50) return { level: "Good", color: "#4CAF50" };
  if (aqi <= 100) return { level: "Moderate", color: "#FFCA28" };
  if (aqi <= 150) return { level: "Unhealthy for Sensitive Groups", color: "#FF5722" };
  if (aqi <= 200) return { level: "Unhealthy", color: "#D81B60" };
  if (aqi <= 300) return { level: "Very Unhealthy", color: "#8E24AA" };
  return { level: "Hazardous", color: "#5E35B1" };
};

const RankingTable = () => {
  const [aqiData, setAqiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, [navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAQIData = async () => {
      setLoading(true);
      try {
        const promises = cities.map(async (city) => {
          try {
            const response = await fetch(
              `https://api.api-ninjas.com/v1/airquality?city=${encodeURIComponent(city)}`,
              { headers: { "X-Api-Key": apiKey } }
            );
            if (!response.ok) throw new Error(`Failed for ${city}`);
            const data = await response.json();
            if (data && data.overall_aqi !== undefined) {
              const qualityInfo = getAirQualityDescription(data.overall_aqi);
              return {
                city,
                aqi: data.overall_aqi,
                quality: qualityInfo.level,
                color: qualityInfo.color
              };
            }
            return { city, aqi: "N/A", quality: "Data not available", color: "#B0BEC5" };
          } catch (error) {
            return { city, aqi: "Error", quality: "Error fetching data", color: "#B0BEC5" };
          }
        });

        const results = await Promise.all(promises);
        const validData = results.filter(item => typeof item.aqi === "number");
        validData.sort((a, b) => b.aqi - a.aqi); // Fixed typo: b.qi to b.aqi
        const errorData = results.filter(item => typeof item.aqi !== "number");

        setAqiData([...validData, ...errorData]);
        setErrorMsg("");
      } catch (error) {
        console.error(error);
        setErrorMsg("Failed to fetch AQI data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAQIData();
  }, [isAuthenticated]);

  const getAqiPercentage = (aqi) => {
    if (typeof aqi !== "number") return 0;
    return Math.min(100, (aqi / 300) * 100);
  };

  if (!isAuthenticated) return null;

  return (
    <div style={styles.mainContainer}>
      <Navbar />
      <div style={styles.contentContainer}>
        <div style={styles.header}>
          <h1 style={styles.heading}>Pakistan Air Quality Index (AQI) Ranking</h1>
          <p style={styles.subheading}>Real-time air pollution levels for major cities</p>
        </div>

        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Fetching latest air quality data...</p>
          </div>
        ) : errorMsg ? (
          <div style={styles.errorContainer}>
            <div style={styles.errorIcon}>⚠️</div>
            <p style={styles.errorText}>{errorMsg}</p>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>Rank</th>
                  <th style={styles.tableHeader}>City</th>
                  <th style={styles.tableHeader}>AQI</th>
                  <th style={styles.tableHeader}>Air Quality</th>
                  <th style={styles.tableHeader}>Level</th>
                </tr>
              </thead>
              <tbody>
                {aqiData.map((data, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={styles.rankCell}>
                      {typeof data.aqi === "number" ? (
                        <span style={styles.rankBadge(index + 1)}>{index + 1}</span>
                      ) : "-"}
                    </td>
                    <td style={styles.cityCell}>{data.city}</td>
                    <td style={styles.aqiCell}>{data.aqi}</td>
                    <td style={styles.qualityCell}>{data.quality}</td>
                    <td style={styles.levelCell}>
                      <div style={styles.levelContainer}>
                        <div
                          style={{
                            ...styles.levelIndicator,
                            width: `${getAqiPercentage(data.aqi)}%`,
                            backgroundColor: data.color
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={styles.legend}>
          <h3 style={styles.legendTitle}>AQI Levels:</h3>
          <div style={styles.legendItems}>
            {[
              { range: "0-50", color: "#4CAF50", label: "Good" },
              { range: "51-100", color: "#FFCA28", label: "Moderate" },
              { range: "101-150", color: "#FF5722", label: "Unhealthy for Sensitive Groups" },
              { range: "151-200", color: "#D81B60", label: "Unhealthy" },
              { range: "201-300", color: "#8E24AA", label: "Very Unhealthy" },
              { range: "301+", color: "#5E35B1", label: "Hazardous" }
            ].map((item, index) => (
              <div key={index} style={styles.legendItem}>
                <div style={{ ...styles.legendColor, backgroundColor: item.color }}></div>
                <span>{item.range} ({item.label})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eceff1 0%, #b0bec5 100%)',
    overflowX: 'hidden'
  },
  contentContainer: {
    flex: 1,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: '#1A202C',
    padding: '30px 20px',
    paddingTop: '100px', // Increased to ensure content clears navbar
    maxWidth: '1280px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative', // Ensure content is not affected by navbar z-index
    zIndex: 1, // Lower than navbar (assumed z-index: 1000)
    animation: 'fadeIn 0.5s ease-out'
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    padding: '30px',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transform: 'translateY(0)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  heading: {
    color: '#1A202C',
    margin: '0',
    fontSize: '2.5rem',
    fontWeight: '700',
    letterSpacing: '-0.025em'
  },
  subheading: {
    color: '#4A5568',
    margin: '12px 0 0',
    fontSize: '1.125rem',
    fontWeight: '400'
  },
  tableContainer: {
    overflowX: 'auto',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    marginBottom: '40px',
    padding: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    fontSize: '0.95rem'
  },
  tableHeaderRow: {
    background: '#F7FAFC',
    borderBottom: '2px solid #E2E8F0'
  },
  tableHeader: {
    color: '#2D3748',
    padding: '16px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.95rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '2px solid #E2E8F0'
  },
  tableRow: {
    borderBottom: '1px solid #EDF2F7',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    '&:hover': {
      backgroundColor: '#F7FAFC',
      transform: 'translateY(-2px)'
    }
  },
  rankCell: {
    padding: '16px',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '0.95rem'
  },
  cityCell: {
    padding: '16px',
    fontWeight: '500',
    fontSize: '1rem',
    color: '#2D3748'
  },
  aqiCell: {
    padding: '16px',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#2D3748'
  },
  qualityCell: {
    padding: '16px',
    fontSize: '0.95rem',
    color: '#4A5568'
  },
  levelCell: {
    padding: '16px',
    width: '220px'
  },
  levelContainer: {
    width: '100%',
    height: '10px',
    backgroundColor: '#EDF2F7',
    borderRadius: '6px',
    overflow: 'hidden',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
  },
  levelIndicator: {
    height: '100%',
    borderRadius: '6px',
    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  rankBadge: (rank) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: rank <= 3 ? 'linear-gradient(135deg, #E53E3E, #C53030)' : 'linear-gradient(135deg, #3182CE, #2B6CB0)',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '0.9rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  }),
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    animation: 'pulse 1.5s infinite'
  },
  spinner: {
    border: '6px solid #EDF2F7',
    borderTop: '6px solid #3182CE',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  loadingText: {
    color: '#4A5568',
    fontSize: '1rem',
    fontWeight: '500',
    margin: '0'
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    animation: 'fadeIn 0.5s ease-out'
  },
  errorIcon: {
    fontSize: '3rem',
    color: '#E53E3E',
    marginBottom: '20px',
    animation: 'shake 0.5s ease-in-out'
  },
  errorText: {
    color: '#E53E3E',
    fontSize: '1rem',
    fontWeight: '500',
    margin: '0',
    textAlign: 'center'
  },
  legend: {
    background: '#ffffff',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    marginBottom: '40px'
  },
  legendTitle: {
    margin: '0 0 20px',
    color: '#1A202C',
    fontSize: '1.25rem',
    fontWeight: '600'
  },
  legendItems: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '12px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.9rem',
    color: '#4A5568',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateX(5px)'
    }
  },
  legendColor: {
    width: '20px',
    height: '20px',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
};

// Inline keyframes for animations
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.02); opacity: 0.95; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(styleSheet);

export default RankingTable;