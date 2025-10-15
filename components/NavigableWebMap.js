import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heatZoneData } from '../data/heatZones';
import { poiData } from '../data/poiData';
import { hexGridData } from '../data/hexGridData';

// Función auxiliar para elegir el color del marcador
const getMarkerColor = (demand) => {
  if (demand === 'Alta') return '#F44336';
  if (demand === 'Media') return '#FF9800';
  return '#4CAF50';
};

// Función auxiliar para obtener el ícono según la categoría
const getCategoryIcon = (category) => {
  switch (category) {
    case 'restaurant': return '🍽️';
    case 'cafe': return '☕';
    case 'bakery': return '🥖';
    case 'dessert': return '🍦';
    default: return '📍';
  }
};

const NavigableWebMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [hexagons, setHexagons] = useState([]);

  useEffect(() => {
    // Load Leaflet CSS and JS
    const loadLeaflet = () => {
      if (window.L) {
        initializeMap();
      } else {
        // Load CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        cssLink.crossOrigin = '';
        document.head.appendChild(cssLink);

        // Load JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        script.onload = initializeMap;
        document.head.appendChild(script);
      }
    };

    const initializeMap = () => {
      const mapElement = mapRef.current;
      if (!mapElement) return;

      // Check if map is already initialized
      if (mapElement._leaflet_id) {
        return;
      }

      // Initialize map centered on Buenos Aires
      const leafletMap = window.L.map(mapElement).setView([-34.6037, -58.3816], 13);

      // Add custom styled map tiles with exact Google Maps styling
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(leafletMap);

      setMap(leafletMap);

      // Add hexagonal grid for Palermo
      const hexPolygons = hexGridData.map((hex) => {
        const coordinates = hex.coordinates.map(coord => [coord.latitude, coord.longitude]);
        const polygon = window.L.polygon(coordinates, {
          color: 'rgba(255, 255, 255, 0.3)',
          weight: 1,
          fillColor: getMarkerColor(hex.demand),
          fillOpacity: hex.intensity * 0.6 + 0.2, // Opacidad basada en intensidad
          className: 'hex-cell'
        });

        polygon.bindPopup(`
          <div style="padding: 8px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 4px 0; color: #333;">Zona ${hex.demand} Demanda</h3>
            <p style="margin: 0; color: #666; font-size: 12px;">
              Intensidad: ${Math.round(hex.intensity * 100)}% • ID: ${hex.id}
            </p>
          </div>
        `);

        polygon.addTo(leafletMap);
        return polygon;
      });

      // Add heat zones (hexagonal honeycomb)
      const newPolygons = heatZoneData.map((zone) => {
        const coordinates = zone.coordinates.map(coord => [coord.latitude, coord.longitude]);
        const polygon = window.L.polygon(coordinates, {
          color: 'rgba(255, 255, 255, 0.4)',
          weight: 1,
          fillColor: zone.color,
          fillOpacity: zone.intensity || 0.6,
          className: 'heat-zone-hex'
        });

        polygon.bindPopup(`
          <div style="padding: 8px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 4px 0; color: #333;">Hexágono ${zone.level} Demanda</h3>
            <p style="margin: 0; color: #666; font-size: 12px;">
              Intensidad: ${Math.round((zone.intensity || 0.6) * 100)}% • ID: ${zone.id}
            </p>
            <p style="margin: 4px 0 0 0; color: #999; font-size: 10px;">
              Patrón de panal de abeja
            </p>
          </div>
        `);

        polygon.addTo(leafletMap);
        return polygon;
      });

      setPolygons(newPolygons);
      setHexagons(hexPolygons);

      // Add POI markers
      const newMarkers = poiData.map((poi) => {
        const marker = window.L.marker([poi.latitude, poi.longitude], {
          icon: window.L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                background-color: ${getMarkerColor(poi.demand)};
                width: 30px;
                height: 30px;
                border-radius: 15px;
                border: 2px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                cursor: pointer;
              ">
                ${getCategoryIcon(poi.category)}
              </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })
        });

        marker.bindPopup(`
          <div style="padding: 8px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 4px 0; color: #333;">${poi.name}</h3>
            <p style="margin: 0; color: #666; font-size: 12px;">
              ${getCategoryIcon(poi.category)} ${poi.category} • ⭐ ${poi.rating} • ${poi.demand} demanda
            </p>
          </div>
        `);

        marker.addTo(leafletMap);
        return marker;
      });

      setMarkers(newMarkers);

      // Add custom styles with exact Google Maps color scheme
      const style = document.createElement('style');
      style.textContent = `
        .heat-zone {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .heat-zone:hover {
          fill-opacity: 0.9 !important;
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        
        /* Hexagonal grid styling */
        .hex-cell {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .hex-cell:hover {
          fill-opacity: 0.9 !important;
          stroke: rgba(255, 255, 255, 0.8) !important;
          stroke-width: 2 !important;
        }
        
        /* Heat zone hexagonal styling */
        .heat-zone-hex {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .heat-zone-hex:hover {
          fill-opacity: 0.9 !important;
          stroke: rgba(255, 255, 255, 0.9) !important;
          stroke-width: 2 !important;
          filter: brightness(1.1) !important;
        }
        
        /* Exact Google Maps styling */
        .leaflet-container {
          background: #f5f5f5 !important;
        }
        
        /* Apply exact Google Maps color filters */
        .leaflet-tile {
          filter: 
            hue-rotate(0deg) 
            saturate(0.7) 
            brightness(1.1) 
            contrast(0.85) 
            sepia(0.1) !important;
        }
        
        /* Custom zoom controls with Google Maps styling */
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
        
        /* Google Maps popup styling */
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
        
        /* Attribution with Google Maps colors */
        .leaflet-control-attribution {
          background: rgba(255,255,255,0.9) !important;
          font-size: 10px !important;
          color: #9e9e9e !important;
          padding: 2px 4px !important;
        }
        
        /* Hide default map elements */
        .leaflet-control-layers {
          display: none !important;
        }
        
        /* Enhanced map tile styling to match Google Maps exactly */
        .leaflet-tile-container {
          filter: 
            contrast(0.85) 
            brightness(1.1) 
            saturate(0.7) 
            sepia(0.1) 
            hue-rotate(0deg) !important;
        }
        
        /* Additional styling for map elements */
        .leaflet-tile-pane {
          opacity: 0.95 !important;
        }
        
        /* Custom styling for map labels to match Google Maps */
        .leaflet-tile {
          image-rendering: -webkit-optimize-contrast !important;
          image-rendering: crisp-edges !important;
        }
      `;
      document.head.appendChild(style);
    };

    loadLeaflet();

    // Cleanup
    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
      // Clean up markers, polygons and hexagons
      markers.forEach(({ marker, infoWindow }) => {
        if (marker) marker.remove();
        if (infoWindow) infoWindow.close();
      });
      polygons.forEach(polygon => {
        if (polygon) polygon.remove();
      });
      hexagons.forEach(hexagon => {
        if (hexagon) hexagon.remove();
      });
      setMarkers([]);
      setPolygons([]);
      setHexagons([]);
    };
  }, []);

  return (
    <View style={styles.container}>
      <div ref={mapRef} style={styles.map} />
      
      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Niveles de Demanda</Text>
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
        <Text style={styles.legendSubtitle}>Patrón Panal de Abeja</Text>
        <Text style={styles.legendDescription}>
          Hexágonos interconectados muestran demanda granular en toda la ciudad
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <Text style={styles.controlsTitle}>Controles</Text>
        <Text style={styles.controlsText}>• Arrastra para navegar</Text>
        <Text style={styles.controlsText}>• Rueda del mouse para zoom</Text>
        <Text style={styles.controlsText}>• Click en zonas/marcadores</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  legend: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
    zIndex: 1000,
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
    zIndex: 1000,
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

export default NavigableWebMap;
