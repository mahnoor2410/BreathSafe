import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

function AirPollutionMap() {
    const mapRef = useRef(null);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [placeInfo, setPlaceInfo] = useState('');
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Add state for authentication
    const navigate = useNavigate();

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
        if (!isAuthenticated) return; // Only initialize the map if authenticated

        const initMap = () => {
            const mapInstance = new window.google.maps.Map(mapRef.current, {
                center: { lat: 31.5436644, lng: 74.32700779 },
                zoom: 15,
            });

            const input = document.getElementById('searchInput');
            const autocomplete = new window.google.maps.places.Autocomplete(input);

            autocomplete.bindTo('bounds', mapInstance);

            const infowindow = new window.google.maps.InfoWindow();
            const marker = new window.google.maps.Marker({
                map: mapInstance,
                anchorPoint: new window.google.maps.Point(0, -29),
            });

            autocomplete.addListener('place_changed', () => {
                infowindow.close();
                marker.setVisible(false);

                const place = autocomplete.getPlace();
                if (!place.geometry) {
                    setError("Place details not found");
                    return;
                }

                if (place.geometry.viewport) {
                    mapInstance.fitBounds(place.geometry.viewport);
                } else {
                    mapInstance.setCenter(place.geometry.location);
                    mapInstance.setZoom(13);
                }

                marker.setPosition(place.geometry.location);
                marker.setVisible(true);

                setLatitude(place.geometry.location.lat());
                setLongitude(place.geometry.location.lng());
                setPlaceInfo(place.name || place.formatted_address || '');
                setError(null);

                infowindow.setContent(
                    `<div><strong>${place.name || place.formatted_address}</strong><br>${place.formatted_address}</div>`
                );
                infowindow.open(mapInstance, marker);
            });
        };

        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyjOSuHYRA5N1AKUHVgR7Yi15s4Hz_JneZr&libraries=geometry,places`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.body.appendChild(script);
        } else {
            initMap();
        }
    }, [isAuthenticated]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setError(null);

        if (!latitude || !longitude || !placeInfo) {
            setError('Please select a valid location.');
            return;
        }

        console.log("Navigating with data:", { latitude, longitude, placeInfo });

        navigate('/air_pollution', {
            state: { latitude, longitude, placeInfo },
        });
    };

    // If not authenticated, the redirect will happen in useEffect, so nothing will render here
    if (!isAuthenticated) {
        return null; // Render nothing while redirecting
    }

    return (
        <>
            <Navbar />
            <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
                <form
                    onSubmit={handleFormSubmit}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <input
                        id="searchInput"
                        type="text"
                        placeholder="Type Location (Auto Name)"
                        style={{
                            marginBottom: '10px',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            width: '300px',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#28a745',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Get AQI Data
                    </button>
                    {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                </form>
                <div
                    ref={mapRef}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                ></div>
            </div>
            
        </>
    );
}

export default AirPollutionMap;