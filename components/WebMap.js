import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heatZoneData } from '../data/heatZones';
import { poiData } from '../data/poiData';

// Función auxiliar para elegir el color del marcador
const getMarkerColor = (demand) => {
  if (demand === 'Alta') return '#D32F2F';
  if (demand === 'Media') return '#FF9800';
  return '#FFC107';
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

const WebMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    // Load Google Maps JavaScript API
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
      } else {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dgsWc7f0F2D5Yk&libraries=geometry&loading=async`;
        script.async = true;
        script.defer = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      }
    };

    const initializeMap = () => {
      const mapElement = mapRef.current;
      if (!mapElement) return;

      const googleMap = new window.google.maps.Map(mapElement, {
        center: { lat: 37.7850, lng: -122.4350 },
        zoom: 14,
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      setMap(googleMap);

      // Add heat zones (polygons)
      const newPolygons = heatZoneData.map((zone) => {
        const polygon = new window.google.maps.Polygon({
          paths: zone.coordinates.map(coord => ({
            lat: coord.latitude,
            lng: coord.longitude
          })),
          fillColor: zone.color,
          fillOpacity: 0.7,
          strokeColor: 'rgba(255, 255, 255, 0.8)',
          strokeWeight: 2,
          clickable: false
        });

        polygon.setMap(googleMap);
        return polygon;
      });

      setPolygons(newPolygons);

      // Add POI markers
      const newMarkers = poiData.map((poi) => {
        const marker = new window.google.maps.Marker({
          position: { lat: poi.latitude, lng: poi.longitude },
          map: googleMap,
          title: poi.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: getMarkerColor(poi.demand),
            fillOpacity: 1,
            strokeColor: '#FFF',
            strokeWeight: 2
          }
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; font-family: Arial, sans-serif;">
              <h3 style="margin: 0 0 4px 0; color: #333;">${poi.name}</h3>
              <p style="margin: 0; color: #666; font-size: 12px;">
                ${getCategoryIcon(poi.category)} ${poi.category} • ⭐ ${poi.rating} • ${poi.demand} demanda
              </p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMap, marker);
        });

        return { marker, infoWindow };
      });

      setMarkers(newMarkers);
    };

    loadGoogleMaps();

    // Cleanup
    return () => {
      markers.forEach(({ marker, infoWindow }) => {
        marker.setMap(null);
        infoWindow.close();
      });
      polygons.forEach(polygon => {
        polygon.setMap(null);
      });
    };
  }, []);

  return (
    <View style={styles.container}>
      <div ref={mapRef} style={styles.map} />
      
      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Niveles de Demanda</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#D32F2F' }]} />
          <Text style={styles.legendText}>Alta Demanda</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
          <Text style={styles.legendText}>Demanda Media</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#FFC107' }]} />
          <Text style={styles.legendText}>Baja Demanda</Text>
        </View>
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
});

export default WebMap;
