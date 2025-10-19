// VenezuelaMap.jsx
import React, { useState, useRef, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { logEvent } from '../utils/analytics';
import myJson from '../data/geoBoundaries-VEN-ADM1.json';

// Venezuelan states with approximate centroid coordinates for labeling
const stateLabels = [
  { name: "Amazonas", coordinates: [-66, 2.9916] },
  { name: "Anzoátegui", coordinates: [-64.6298, 9.465] },
  { name: "Apure", coordinates: [-69.0452, 7] },
  { name: "Aragua", coordinates: [-67.5, 10.05] },
  { name: "Barinas", coordinates: [-69.0326, 8.6172] },
  { name: "Bolívar", coordinates: [-62.8185, 7] },
  { name: "Carabobo", coordinates: [-68.0351, 9.8] },
  { name: "Cojedes", coordinates: [-68.3, 9] },
  { name: "Delta Amacuro", coordinates: [-61, 8.5397] },
  { name: "Falcón", coordinates: [-69.328, 11] },
  { name: "Guárico", coordinates: [-66.5, 8] },
  { name: "Lara", coordinates: [-69.7033, 10.0688] },
  { name: "Mérida", coordinates: [-71.3236, 8.6402] },
  { name: "Miranda", coordinates: [-66.2, 10] },
  { name: "Monagas", coordinates: [-63, 9.3184] },
  { name: "Nueva Esparta", coordinates: [-64.1803, 11.0256] },
  { name: "Portuguesa", coordinates: [-69.1488, 8.2655] },
  { name: "Sucre", coordinates: [-63.2514, 10.2] },
  { name: "Táchira", coordinates: [-72.1233, 7.7656] },
  { name: "Trujillo", coordinates: [-70.8122, 9.3106] },
  { name: "Vargas", coordinates: [-66.9303, 10.6082] },
  { name: "Yaracuy", coordinates: [-68.7, 10.2406] },
  { name: "Zulia", coordinates: [-72, 10.1051] }
];

export default function VenezuelaMap({ projects }) {
  const [showInfo, setShowInfo] = useState(false);
  const [infoPosition, setInfoPosition] = useState({ x: 0, y: 0 });
  const [markerData, setMarkerData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive map configuration - 30% increase for mobile
  const mapConfig = isMobile ? {
    scale: 3900, // 3000 * 1.3
    width: 800,
    height: 500,
    markerSize: 12,
    fontSize: 15, // Scaled to match 30% zoom
    strokeWidth: 1.2
  } : {
    scale: 3000,
    width: 1400,
    height: 700,
    markerSize: 7,
    fontSize: 14,
    strokeWidth: 0.8
  };

  const handleMarkerClick = (event, data) => {
    logEvent('Venezuela Map', 'Marker Click', data.projectName);

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

  const handleLearnMore = (link, projectName) => {
    if (link) {
      logEvent('Venezuela Map', 'Learn More Click', projectName);
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      padding: isMobile ? "10px 0" : "20px 0",
      backgroundColor: "#f7f9fc"
    }}>
      <div ref={mapContainerRef} style={{
        position: "relative",
        width: "100%",
        maxWidth: isMobile ? "100%" : "1400px",
        height: isMobile ? "400px" : "700px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fefefe"
      }}>
        <ComposableMap
          width={mapConfig.width}
          height={mapConfig.height}
          projectionConfig={{
            scale: mapConfig.scale,
            center: [-66, 7],
          }}
          style={{ width: "100%", height: "100%", backgroundColor: "white" }}
        >
          <Geographies geography={myJson}>
            {({ geographies }) => geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#d8d8d8"
                stroke="white"
                strokeWidth={mapConfig.strokeWidth}
                style={{
                  default: { outline: "none" },
                  hover: {
                    fill: "#938686ff",
                    outline: "none",
                    transition: "fill 0.3s ease"
                  },
                  pressed: { outline: "none" }
                }}
              />
            ))}
          </Geographies>

          {/* Static state labels - visible on all devices with scaled font */}
          {stateLabels.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates}>
              <text
                y={-10}
                textAnchor="middle"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fill: "#1a1a2e",
                  fontWeight: "700",
                  fontSize: mapConfig.fontSize,
                  textShadow: "1px 1px 3px rgba(255,255,255,0.8)",
                  pointerEvents: "none",
                  userSelect: "none"
                }}
              >
                {name}
              </text>
            </Marker>
          ))}

          {/* Markers for projects */}
          {projects && projects.map((project, index) => (
            <Marker
              key={index}
              coordinates={project.coordinates}
              onClick={(event) => handleMarkerClick(event, {
                location: project.location,
                projectName: project.title,
                date: project.date,
                description: project.description,
                coordinates: project.coordinates,
                link: project.link
              })}
            >
              <circle
                r={mapConfig.markerSize}
                fill="#2980b9"
                stroke="#ecf0f1"
                strokeWidth={isMobile ? 3 : 2}
                style={{ cursor: "pointer", transition: "fill 0.3s ease" }}
              />
            </Marker>
          ))}
        </ComposableMap>

        {showInfo && markerData && (
          <div style={{
            position: "absolute",
            top: isMobile ? "50%" : `${infoPosition.y + 10}px`,
            left: isMobile ? "50%" : `${infoPosition.x + 10}px`,
            transform: isMobile ? "translate(-50%, -50%)" : "none",
            backgroundColor: "white",
            padding: isMobile ? "20px" : "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            minWidth: isMobile ? "90%" : "250px",
            maxWidth: isMobile ? "90%" : "300px"
          }}>
            <p style={{ margin: "5px 0", color: "#2c3e50", fontWeight: "600", fontSize: isMobile ? "16px" : "14px" }}>
              <strong>Location:</strong> {markerData.location}
            </p>
            <p style={{ margin: "5px 0", color: "#2c3e50", fontWeight: "600", fontSize: isMobile ? "16px" : "14px" }}>
              <strong>Project:</strong> {markerData.projectName}
            </p>
            <p style={{ margin: "5px 0", color: "#2c3e50", fontWeight: "600", fontSize: isMobile ? "16px" : "14px" }}>
              <strong>Date:</strong> {markerData.date}
            </p>
            <p style={{ margin: "5px 0", color: "#2c3e50", fontWeight: "600", fontSize: isMobile ? "16px" : "14px", wordBreak: "break-word" }}>
              <strong>Description:</strong> {markerData.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              {markerData.link && (
                <button
                  onClick={() => handleLearnMore(markerData.link, markerData.projectName)}
                  style={{
                    padding: isMobile ? "12px 20px" : "8px 15px",
                    cursor: "pointer",
                    backgroundColor: "#27ae60",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    width: "100%",
                    fontSize: isMobile ? "16px" : "14px",
                    fontWeight: "600"
                  }}
                >
                  Learn More
                </button>
              )}
              <button
                onClick={() => setShowInfo(false)}
                style={{
                  padding: isMobile ? "12px 20px" : "8px 15px",
                  cursor: "pointer",
                  backgroundColor: "#2980b9",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  width: "100%",
                  fontSize: isMobile ? "16px" : "14px",
                  fontWeight: "600"
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
