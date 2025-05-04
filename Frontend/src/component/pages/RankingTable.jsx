import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
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
  if (aqi <= 100) return { level: "Moderate", color: "#FFEB3B" };
  if (aqi <= 150) return { level: "Unhealthy for Sensitive Groups", color: "#FF9800" };
  if (aqi <= 200) return { level: "Unhealthy", color: "#F44336" };
  if (aqi <= 300) return { level: "Very Unhealthy", color: "#9C27B0" };
  return { level: "Hazardous", color: "#673AB7" };
};

const RankingTable = () => {
  const [aqiData, setAqiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add state for authentication
  const navigate = useNavigate(); // Hook for navigation

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login if not authenticated
      }
    };

    checkAuthStatus();

    // Add event listener for storage changes (e.g., logout from another tab)
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, [navigate]);

  useEffect(() => {
    if (!isAuthenticated) return; // Only fetch data if authenticated

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
            return { city, aqi: "N/A", quality: "Data not available", color: "#9E9E9E" };
          } catch (error) {
            return { city, aqi: "Error", quality: "Error fetching data", color: "#9E9E9E" };
          }
        });

        const results = await Promise.all(promises);
        const validData = results.filter(item => typeof item.aqi === "number");
        validData.sort((a, b) => b.aqi - a.aqi);
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

  // If not authenticated, the redirect will happen in useEffect, so nothing will render here
  if (!isAuthenticated) {
    return null; // Render nothing while redirecting
  }

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
                    <td style={styles.aqiCell}>
                      {data.aqi}
                    </td>
                    <td style={styles.qualityCell}>
                      {data.quality}
                    </td>
                    <td style={styles.levelCell}>
                      <div style={styles.levelContainer}>
                        <div 
                          style={{
                            ...styles.levelIndicator,
                            width: `${getAqiPercentage(data.aqi)}%`,
                            backgroundColor: data.color,
                            opacity: 0.7
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
              { range: "51-100", color: "#FFEB3B", label: "Moderate" },
              { range: "101-150", color: "#FF9800", label: "Unhealthy for Sensitive Groups" },
              { range: "151-200", color: "#F44336", label: "Unhealthy" },
              { range: "201-300", color: "#9C27B0", label: "Very Unhealthy" },
              { range: "301+", color: "#673AB7", label: "Hazardous" }
            ].map((item, index) => (
              <div key={index} style={styles.legendItem}>
                <div style={{
                  ...styles.legendColor,
                  backgroundColor: item.color,
                  opacity: 0.7
                }}></div>
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
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flex: 1,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: '100%',
    boxSizing: "border-box"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },
  heading: {
    color: "#2c3e50",
    margin: "0",
    fontSize: "2rem",
    fontWeight: "600"
  },
  subheading: {
    color: "#7f8c8d",
    margin: "10px 0 0",
    fontSize: "1rem"
  },
  tableContainer: {
    overflowX: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    marginBottom: "30px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "10px",
    overflow: "hidden"
  },
  tableHeaderRow: {
    backgroundColor: "#f5f7fa",
    borderBottom: "2px solid #e0e0e0"
  },
  tableHeader: {
    color: "#2c3e50",
    padding: "15px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "0.9rem"
  },
  tableRow: {
    borderBottom: "1px solid #e0e0e0",
    "&:hover": {
      backgroundColor: "#f9f9f9"
    }
  },
  rankCell: {
    padding: "15px",
    textAlign: "center",
    fontWeight: "500",
    fontSize: "0.9rem"
  },
  cityCell: {
    padding: "15px",
    fontWeight: "500",
    fontSize: "0.9rem"
  },
  aqiCell: {
    padding: "15px",
    fontWeight: "600",
    fontSize: "0.9rem"
  },
  qualityCell: {
    padding: "15px",
    fontSize: "0.9rem"
  },
  levelCell: {
    padding: "15px",
    width: "200px"
  },
  levelContainer: {
    width: "100%",
    height: "8px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    overflow: "hidden"
  },
  levelIndicator: {
    height: "100%",
    borderRadius: "4px",
    transition: "width 0.5s ease"
  },
  rankBadge: (rank) => ({
    display: "inline-block",
    width: "26px",
    height: "26px",
    lineHeight: "26px",
    borderRadius: "50%",
    backgroundColor: rank <= 3 ? "#e74c3c" : "#3498db",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "0.8rem"
  }),
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },
  spinner: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    marginBottom: "20px"
  },
  loadingText: {
    color: "#7f8c8d",
    fontSize: "0.9rem",
    margin: "0"
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },
  errorIcon: {
    fontSize: "2.5rem",
    marginBottom: "20px"
  },
  errorText: {
    color: "#e74c3c",
    fontSize: "0.9rem",
    fontWeight: "500",
    margin: "0",
    textAlign: "center"
  },
  legend: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    marginBottom: "30px"
  },
  legendTitle: {
    marginTop: "0",
    marginBottom: "15px",
    color: "#2c3e50",
    fontSize: "1rem"
  },
  legendItems: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "10px"
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.8rem"
  },
  legendColor: {
    width: "16px",
    height: "16px",
    borderRadius: "4px"
  }
};

export default RankingTable;