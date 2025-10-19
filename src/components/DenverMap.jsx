// DenverMap.jsx
import React, { useState, useRef } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { logEvent } from '../utils/analytics';
import coloradoCities from '../data/Colorado_City_Boundaries.json';

// Denver Metro Area cities to highlight
const denverMetroCities = [
  'Denver', 'Aurora', 'Lakewood', 'Arvada', 'Westminster', 'Thornton',
  'Centennial', 'Highlands Ranch', 'Littleton', 'Englewood', 'Commerce City',
  'Parker', 'Broomfield', 'Northglenn', 'Brighton', 'Greenwood Village',
  'Lone Tree', 'Castle Rock', 'Golden', 'Wheat Ridge', 'Federal Heights'
];

// Coordinates for Denver Metro Area cities (longitude, latitude)
const cityCoordinates = {
  Denver: [-104.9903, 39.7392],
  Aurora: [-104.8319, 39.7294],
  Lakewood: [-105.0814, 39.7047],
  Arvada: [-105.0875, 39.8028],
  Westminster: [-105.0372, 39.8367],
  Thornton: [-104.9719, 39.8680],
  Centennial: [-104.8509, 39.5807],
  "Highlands Ranch": [-104.9690, 39.5536],
  Littleton: [-105.0166, 39.6133],
  Englewood: [-104.9690, 39.6475],
  "Commerce City": [-104.9334, 39.8084],
  Parker: [-104.7714, 39.5186],
  Broomfield: [-105.0398, 39.9205],
  Northglenn: [-104.9811, 39.9176],
  Brighton: [-104.8214, 39.9859],
  "Greenwood Village": [-104.925, 39.6133],
  "Lone Tree": [-104.8934, 39.5362],
  "Castle Rock": [-104.8561, 39.3722],
  Golden: [-105.2191, 39.7555],
  "Wheat Ridge": [-105.0816, 39.7667],
  "Federal Heights": [-105.0029, 39.8511]
};

export default function DenverMap({ networkingEvents }) {
  const [showInfo, setShowInfo] = useState(false);
  const [infoPosition, setInfoPosition] = useState({ x: 0, y: 0 });
  const [markerData, setMarkerData] = useState(null);
  const mapContainerRef = useRef(null);

  const handleMarkerClick = (event, data) => {
    // Track map marker click
    logEvent('Denver Map', 'Marker Click', data.eventName);

    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const { clientX, clientY } = event;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      setInfoPosition({ x, y });
      setMarkerData(data);
      setShowInfo(true);
    }
  };

  const handleLearnMore = (link, eventName) => {
    if (link) {
      // Track Learn More button click
      logEvent('Denver Map', 'Learn More Click', eventName);
      
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      padding: "20px 0",
      backgroundColor: "#f7f9fc"
    }}>
      <div ref={mapContainerRef} style={{
        position: "relative",
        width: "100%",
        maxWidth: "1400px",
        height: "700px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fefefe"
      }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [-104.9903, 39.7392],
            scale: 80000,
          }}
          width={1400}
          height={700}
          style={{ width: "100%", height: "100%", backgroundColor: "#fefefe" }}
        >
          <Geographies geography={coloradoCities}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const cityName = geo.properties.CITY_NM || geo.properties.NAME || '';
                const isMetroCity = denverMetroCities.some(
                  city => cityName.toLowerCase().includes(city.toLowerCase())
                );

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isMetroCity ? "#2c3e50" : "#e8e8e8"}
                    stroke="#a3a7abff"
                    strokeWidth={0.8}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill: isMetroCity ? "#34495e" : "#d8d8d8",
                        outline: "none",
                        transition: "fill 0.3s ease"
                      },
                      pressed: { outline: "none" }
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Static city labels with improved contrast */}
          {denverMetroCities.map((city) => {
            const coords = cityCoordinates[city];
            if (!coords) return null;

            return (
              <Marker key={city} coordinates={coords}>
                <text
                  y={-10}
                  textAnchor="middle"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fill: "#1a1a2e",
                    fontWeight: "700",
                    fontSize: 14,
                    textShadow: "1px 1px 3px rgba(255,255,255,0.8)",
                    pointerEvents: "none",
                    userSelect: "none"
                  }}
                >
                  {city}
                </text>
              </Marker>
            );
          })}

          {/* Markers for networking events */}
          {networkingEvents && networkingEvents.map((event, index) => (
            <Marker
              key={index}
              coordinates={event.coordinates}
              onClick={(evt) => handleMarkerClick(evt, {
                location: event.location,
                eventName: event.title,
                date: event.date,
                topic: event.topic,
                coordinates: event.coordinates,
                link: event.link
              })}
            >
              <circle
                r={7}
                fill="#2980b9"
                stroke="#ecf0f1"
                strokeWidth={2}
                style={{ cursor: "pointer", transition: "fill 0.3s ease" }}
              />
            </Marker>
          ))}
        </ComposableMap>

        {showInfo && markerData && (
          <div style={{
            position: "absolute",
            top: `${infoPosition.y + 10}px`,
            left: `${infoPosition.x + 10}px`,
            backgroundColor: "white",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            minWidth: "250px",
            maxWidth: "300px",
            pointerEvents: "auto"
          }}>
            <p style={{ margin: "5px 0", color: "#2c3e50", fontWeight: "600" }}>
              <strong>Event:</strong> {markerData.eventName}
            </p>
            <p style={{ margin: "5px 0", color: "#2c3e50", fontWeight: "600" }}>
              <strong>Location:</strong> {markerData.location}
            </p>
            <p style={{ margin: "5px 0", color: "#2c3e50", fontWeight: "600" }}>
              <strong>Date:</strong> {markerData.date}
            </p>
            <p style={{ margin: "5px 0", color: "#2c3e50", fontWeight: "600" }}>
              <strong>Topic:</strong> {markerData.topic}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              {markerData.link && (
                <button
                  onClick={() => handleLearnMore(markerData.link, markerData.eventName)}
                  style={{
                    padding: "8px 15px",
                    cursor: "pointer",
                    backgroundColor: "#27ae60",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    width: "100%"
                  }}
                >
                  Learn More
                </button>
              )}
              <button
                onClick={() => setShowInfo(false)}
                style={{
                  padding: "8px 15px",
                  cursor: "pointer",
                  backgroundColor: "#2980b9",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  width: "100%"
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
