import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AbsoluteHexGrid = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Hexagon data with absolute positions
  const hexData = [
    { id: 85, x: 12.62, y: 7.27, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 43, x: 151.44, y: 58.21, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 86, x: 0, y: 58.21, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 87, x: 88.34, y: 7.27, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 88, x: 75.72, y: 58.21, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 45, x: 189.26, y: 65.47, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 90, x: 37.82, y: 65.47, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 23, x: 277.6, y: 14.54, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 91, x: 126.16, y: 14.54, color: '#F23D4F' },
    { id: 46, x: 264.98, y: 65.47, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 92, x: 113.54, y: 65.47, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 19, x: 164.06, y: 21.8, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 93, x: 12.62, y: 21.8, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 47, x: 151.44, y: 72.74, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 94, x: 0, y: 72.74, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 95, x: 88.34, y: 21.8, color: '#F23D4F' },
    { id: 97, x: 50.44, y: 29.07, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 49, x: 189.26, y: 80.01, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 98, x: 37.82, y: 80.01, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 25, x: 277.6, y: 29.07, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 99, x: 126.16, y: 29.07, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 50, x: 264.98, y: 80.01, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 100, x: 113.54, y: 80.01, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 17, x: 164.06, y: 36.34, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 101, x: 12.62, y: 36.34, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 51, x: 151.44, y: 87.28, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 102, x: 0, y: 87.28, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 103, x: 88.34, y: 36.34, color: '#F23D4F' },
    { id: 105, x: 50.44, y: 43.61, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 53, x: 189.26, y: 94.55, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 106, x: 37.82, y: 94.55, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 27, x: 277.6, y: 43.61, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 107, x: 126.16, y: 43.61, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 54, x: 264.98, y: 94.55, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 108, x: 113.54, y: 94.55, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 109, x: 25.23, y: 14.54, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 55, x: 164.05, y: 65.47, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 110, x: 12.61, y: 65.47, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 28, x: 252.38, y: 14.54, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 111, x: 100.95, y: 14.54, color: '#F23D4F' },
    { id: 112, x: 88.33, y: 65.47, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 113, x: 63.05, y: 21.8, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 57, x: 201.87, y: 72.74, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 114, x: 50.43, y: 72.74, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 29, x: 290.21, y: 21.8, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 115, x: 138.77, y: 21.8, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 58, x: 277.59, y: 72.74, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 116, x: 126.15, y: 72.74, color: 'rgba(242, 61, 79, 0.1)' },
    { id: 13, x: 176.66, y: 43.61, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 117, x: 25.23, y: 43.61, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 59, x: 164.05, y: 94.55, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 118, x: 12.61, y: 94.55, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 30, x: 252.38, y: 43.61, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 119, x: 100.95, y: 43.61, color: '#F23D4F' },
    { id: 120, x: 88.33, y: 94.55, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 12, x: 214.49, y: 50.88, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 121, x: 63.05, y: 50.88, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 61, x: 201.87, y: 101.81, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 31, x: 290.21, y: 50.88, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 123, x: 138.77, y: 50.88, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 62, x: 277.59, y: 101.81, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 124, x: 126.15, y: 101.81, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 125, x: 25.23, y: 0, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 63, x: 164.05, y: 50.94, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 126, x: 12.61, y: 50.94, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 32, x: 252.38, y: 0, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 127, x: 100.95, y: 0, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 128, x: 88.33, y: 50.94, color: '#F23D4F' },
    { id: 65, x: 201.87, y: 58.21, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 130, x: 50.43, y: 58.21, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 33, x: 290.21, y: 7.27, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 131, x: 138.77, y: 7.27, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 66, x: 277.59, y: 58.21, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 132, x: 126.15, y: 58.21, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 9, x: 176.66, y: 29.07, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 133, x: 25.23, y: 29.07, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 67, x: 164.05, y: 80.01, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 134, x: 12.61, y: 80.01, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 34, x: 252.38, y: 29.07, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 135, x: 100.95, y: 29.07, color: '#F23D4F' },
    { id: 136, x: 88.33, y: 80.01, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 137, x: 63.05, y: 36.34, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 69, x: 201.87, y: 87.28, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 35, x: 290.21, y: 36.34, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 139, x: 138.77, y: 36.34, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 70, x: 277.59, y: 87.28, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 140, x: 126.15, y: 87.28, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 141, x: 37.84, y: 7.27, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 71, x: 176.65, y: 58.21, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 142, x: 25.22, y: 58.21, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 36, x: 264.99, y: 7.27, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 143, x: 113.56, y: 7.27, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 72, x: 252.37, y: 58.21, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 144, x: 100.93, y: 58.21, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 145, x: 75.66, y: 14.54, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 73, x: 214.48, y: 65.47, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 37, x: 302.82, y: 14.54, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 147, x: 151.38, y: 14.54, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 74, x: 290.2, y: 65.47, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 148, x: 138.76, y: 65.47, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 149, x: 37.84, y: 21.8, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 75, x: 176.65, y: 72.74, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 150, x: 25.22, y: 72.74, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 38, x: 264.99, y: 21.8, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 151, x: 113.56, y: 21.8, color: '#F23D4F' },
    { id: 76, x: 252.37, y: 72.74, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 152, x: 100.93, y: 72.74, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 153, x: 75.66, y: 29.07, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 77, x: 214.48, y: 80.01, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 39, x: 302.82, y: 29.07, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 155, x: 151.38, y: 29.07, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 78, x: 290.2, y: 80.01, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 156, x: 138.76, y: 80.01, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 3, x: 189.27, y: 36.34, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 157, x: 37.84, y: 36.34, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 79, x: 176.65, y: 87.28, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 158, x: 25.22, y: 87.28, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 40, x: 264.99, y: 36.34, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 159, x: 113.56, y: 36.34, color: '#F23D4F' },
    { id: 80, x: 252.37, y: 87.28, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 160, x: 100.93, y: 87.28, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 165, x: 75.66, y: 43.61, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 83, x: 214.48, y: 94.55, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 42, x: 302.82, y: 43.61, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 167, x: 151.38, y: 43.61, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 84, x: 290.2, y: 94.55, color: 'rgba(242, 61, 79, 0.2)' },
    { id: 168, x: 138.76, y: 94.55, color: 'rgba(242, 61, 79, 0.2)' }
  ];

  useEffect(() => {
    const loadLeaflet = async () => {
      // Dynamically import Leaflet
      const L = await import('leaflet');
      window.L = L;

      const mapElement = mapRef.current;
      if (!mapElement) return;

      // Initialize map centered on Buenos Aires
      const leafletMap = window.L.map(mapElement).setView([-34.6037, -58.3816], 13);

      // Add custom styled map tiles
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(leafletMap);

      setMap(leafletMap);

      // Add custom styles
      const style = document.createElement('style');
      style.textContent = `
        #absoluteHexGrid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }

        .hexagon {
          position: absolute;
          width: 14.52px;
          height: 16.76px;
          background: rgba(242, 61, 79, 0.2);
          border: 0.3px solid rgba(0, 0, 0, 0.04);
          transform: rotate(90deg);
          cursor: pointer;
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: bold;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          transition: all 0.3s ease;
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }

        .hexagon:hover {
          transform: rotate(90deg) scale(1.2);
          z-index: 1001;
        }

        /* Custom marker styling */
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }

        /* Google Maps styling */
        .leaflet-container {
          background: #f5f5f5 !important;
        }

        .leaflet-tile {
          filter:
            hue-rotate(0deg)
            saturate(0.7)
            brightness(1.1)
            contrast(0.85)
            sepia(0.1) !important;
        }

        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1) !important;
          border-radius: 4px !important;
          overflow: hidden !important;
        }

        .leaflet-control-zoom a {
          background: white !important;
          border: none !important;
          color: #616161 !important;
          font-weight: 500 !important;
          font-size: 18px !important;
          line-height: 1 !important;
          width: 40px !important;
          height: 40px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .leaflet-control-zoom a:hover {
          background: #f0f0f0 !important;
          color: #333 !important;
        }

        .leaflet-control-zoom a:first-child {
          border-bottom: 1px solid #e0e0e0 !important;
        }

        .leaflet-popup-content-wrapper {
          background: white !important;
          border-radius: 8px !important;
          box-shadow: 0 2px 7px rgba(0,0,0,0.15) !important;
          border: none !important;
          padding: 0 !important;
        }

        .leaflet-popup-content {
          margin: 0 !important;
          padding: 12px !important;
          font-family: 'Roboto', Arial, sans-serif !important;
          color: #616161 !important;
        }

        .leaflet-popup-tip {
          background: white !important;
          border: none !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
        }

        .leaflet-control-attribution {
          background: rgba(255,255,255,0.9) !important;
          font-size: 10px !important;
          color: #9e9e9e !important;
          padding: 2px 4px !important;
        }
      `;
      document.head.appendChild(style);
    };

    loadLeaflet();

    return () => {
      if (map) {
        map.remove();
      }
      markers.forEach(({ marker, infoWindow }) => {
        if (marker) marker.remove();
        if (infoWindow) infoWindow.close();
      });
      setMarkers([]);
    };
  }, [map]);

  return (
    <View style={styles.container}>
      <div ref={mapRef} style={styles.map} />
      
      {/* Absolute Positioned Hexagonal Grid */}
      <div id="absoluteHexGrid">
        {hexData.map((hex) => (
          <div
            key={hex.id}
            className="hexagon"
            style={{
              left: `${hex.x}px`,
              top: `${hex.y}px`,
              backgroundColor: hex.color
            }}
            title={`Hexágono ${hex.id} - Posición: (${hex.x}, ${hex.y})`}
          >
            {hex.id}
          </div>
        ))}
      </div>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Malla Hexagonal Absoluta</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#F23D4F' }]} />
          <Text style={styles.legendText}>Alta Demanda</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(242, 61, 79, 0.2)' }]} />
          <Text style={styles.legendText}>Demanda Media</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(242, 61, 79, 0.1)' }]} />
          <Text style={styles.legendText}>Baja Demanda</Text>
        </View>
        <View style={styles.legendDivider} />
        <Text style={styles.legendSubtitle}>168 Hexágonos</Text>
        <Text style={styles.legendDescription}>
          Posicionamiento absoluto con coordenadas exactas
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <Text style={styles.controlsTitle}>Controles</Text>
        <Text style={styles.controlsText}>• Arrastra para navegar</Text>
        <Text style={styles.controlsText}>• Rueda para zoom</Text>
        <Text style={styles.controlsText}>• Click en hexágonos</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  legend: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  legendDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  legendSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  legendDescription: {
    fontSize: 10,
    color: '#666',
    lineHeight: 14,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
  },
  controlsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  controlsText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
});

export default AbsoluteHexGrid;
