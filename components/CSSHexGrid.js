import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { hexGridData, getHexColor, getIntensity } from '../data/hexGridData';

const CSSHexGrid = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

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

      // Add POI markers
      const newMarkers = hexGridData.map((poi) => {
        const customIcon = window.L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            background-color: ${getHexColor(poi.level)};
            padding: 8px;
            border-radius: 20px;
            border: 3px solid #FFF;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #FFF;
            width: 40px;
            height: 40px;
          ">🍽️</div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40]
        });

        const marker = window.L.marker([poi.centerLat, poi.centerLng], { icon: customIcon }).addTo(leafletMap);
        marker.bindPopup(`
          <b>${poi.name || `Hexágono ${poi.id}`}</b><br/>
          ${poi.level} demanda • ⭐ ${poi.rating || '4.5'}<br/>
          Intensidad: ${Math.round(poi.intensity * 100)}%
        `);
        return marker;
      });
      setMarkers(newMarkers);

      // Add custom styles
      const style = document.createElement('style');
      style.textContent = `
        /* Hexagonal Grid CSS */
        .hex-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }

        #myHexGrid {
          --gridWidth: 20em;
          --gridHeight: auto;
          --columnCount: 5;
          --rowCount: 14;
          --hexCount: auto;
          --hexLayout: row;
          --gridOrient: vertical;
          --crop: none;
          --cropFactor: 1;
          --hexContent: auto;
          --hexSize: auto;
          --hexMargin: 0.5em;
          --hexShape: hexagon;
          --hexColor: #48a999;
          --breakpoints: none;
          --images: none;
          
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }

        .hexCrop {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .hexContainer {
          --amount: var(--columnCount);
          --counter: 1;
          position: relative;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(var(--amount), 1fr 2fr) 1fr;
          grid-gap: calc(var(--hexMargin) * 2) calc(var(--hexMargin) * 4);
          width: 100%;
          height: 100%;
        }

        .hex {
          position: relative;
          grid-column: 1 / span 3;
          grid-row: calc(var(--counter) + var(--counter)) / span 2;
          filter: drop-shadow(0 0 10px rgba(68, 68, 68, 0.08));
          height: 0;
          padding-bottom: 90%;
          transition: transform 0.24s ease-out;
          cursor: pointer;
          pointer-events: auto;
          font-size: 1.125rem;
          color: #111111;
          background-color: var(--hexColor);
          clip-path: polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem 25%;
          text-decoration: none;
          text-align: center;
          margin: var(--hexMargin);
        }

        /* 5 columns pattern for large screens */
        .hex:nth-of-type(5n + 1) {
          grid-column: 1 / span 3;
        }

        .hex:nth-of-type(5n + 2) {
          grid-column: 3 / span 3;
          grid-row: calc(var(--counter) + var(--counter) - 1) / span 2;
        }

        .hex:nth-of-type(5n + 3) {
          grid-column: 5 / span 3;
        }

        .hex:nth-of-type(5n + 4) {
          grid-column: 7 / span 3;
          grid-row: calc(var(--counter) + var(--counter) - 1) / span 2;
        }

        .hex:nth-of-type(5n + 5) {
          grid-column: 9 / span 3;
        }

        /* Rows - counter system */
        .hex:nth-of-type(n + 6) {
          --counter: 2;
        }

        .hex:nth-of-type(n + 11) {
          --counter: 3;
        }

        .hex:nth-of-type(n + 16) {
          --counter: 4;
        }

        .hex:nth-of-type(n + 21) {
          --counter: 5;
        }

        .hex:nth-of-type(n + 26) {
          --counter: 6;
        }

        .hex:nth-of-type(n + 31) {
          --counter: 7;
        }

        .hex:nth-of-type(n + 36) {
          --counter: 8;
        }

        .hex:nth-of-type(n + 41) {
          --counter: 9;
        }

        .hex:nth-of-type(n + 46) {
          --counter: 10;
        }

        .hex:nth-of-type(n + 51) {
          --counter: 11;
        }

        .hex:nth-of-type(n + 56) {
          --counter: 12;
        }

        .hex:nth-of-type(n + 61) {
          --counter: 13;
        }

        .hex:nth-of-type(n + 66) {
          --counter: 14;
        }

        /* Responsive breakpoints */
        @media screen and (min-width: 1120px) and (max-width: 1439px) {
          #myHexGrid {
            --columnCount: 4;
          }
          
          .hexContainer {
            --amount: 4;
            --counter: 1;
          }
          
          .hex:nth-of-type(4n + 1) {
            grid-column: 1 / span 3;
          }
          
          .hex:nth-of-type(4n + 2) {
            grid-column: 3 / span 3;
            grid-row: calc(var(--counter) + var(--counter) - 1) / span 2;
          }
          
          .hex:nth-of-type(4n + 3) {
            grid-column: 5 / span 3;
          }
          
          .hex:nth-of-type(4n + 4) {
            grid-column: 7 / span 3;
            grid-row: calc(var(--counter) + var(--counter) - 1) / span 2;
          }
        }

        @media screen and (min-width: 840px) and (max-width: 1119px) {
          #myHexGrid {
            --columnCount: 3;
            --hexMargin: 0.3em;
          }
          
          .hexContainer {
            --amount: 3;
            --counter: 1;
            grid-gap: calc(var(--hexMargin) * 2) calc(var(--hexMargin) * 3);
          }
          
          .hex:nth-of-type(3n + 1) {
            grid-column: 1 / span 3;
          }
          
          .hex:nth-of-type(3n + 2) {
            grid-column: 3 / span 3;
            grid-row: calc(var(--counter) + var(--counter) - 1) / span 2;
          }
          
          .hex:nth-of-type(3n + 3) {
            grid-column: 5 / span 3;
          }
        }

        @media screen and (min-width: 480px) and (max-width: 839px) {
          #myHexGrid {
            --columnCount: 2;
            --hexMargin: 0.3em;
          }
          
          .hexContainer {
            --amount: 2;
            --counter: 1;
            grid-gap: calc(var(--hexMargin) * 2) calc(var(--hexMargin) * 3);
          }
          
          .hex:nth-of-type(2n + 1) {
            grid-column: 1 / span 3;
          }
          
          .hex:nth-of-type(2n + 2) {
            grid-column: 3 / span 3;
            grid-row: calc(var(--counter) + var(--counter) - 1) / span 2;
          }
        }

        @media screen and (max-width: 479px) {
          #myHexGrid {
            --columnCount: 1;
            --hexMargin: 0.2em;
          }
          
          .hexContainer {
            --amount: 1;
            grid-gap: calc(var(--hexMargin) * 2) calc(var(--hexMargin) * 3);
          }
        }

        .hex:hover {
          transform: scale(1.1);
          z-index: 1001;
        }

        .hex:hover {
          font-size: 1.25rem;
        }

        /* Demand level colors */
        .hex[data-level="Alta"] {
          background-color: rgba(244, 67, 54, 0.7);
        }

        .hex[data-level="Media"] {
          background-color: rgba(255, 152, 0, 0.6);
        }

        .hex[data-level="Baja"] {
          background-color: rgba(76, 175, 80, 0.5);
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
      
      {/* Hexagonal Grid Overlay */}
      <div id="myHexGrid">
        <div className="hexCrop">
          <div className="hexContainer">
            {hexGridData.map((hex) => (
              <div 
                key={hex.id} 
                className="hex"
                data-level={hex.level}
                data-intensity={hex.intensity}
                title={`Hexágono ${hex.id} - ${hex.level} Demanda - ${Math.round(hex.intensity * 100)}%`}
              >
                {hex.id}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Malla Hexagonal 12x14</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
          <Text style={styles.legendText}>Alta Demanda</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
          <Text style={styles.legendText}>Demanda Media</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.legendText}>Baja Demanda</Text>
        </View>
        <View style={styles.legendDivider} />
        <Text style={styles.legendSubtitle}>168 Hexágonos</Text>
        <Text style={styles.legendDescription}>
          Cobertura granular de Buenos Aires
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

export default CSSHexGrid;
