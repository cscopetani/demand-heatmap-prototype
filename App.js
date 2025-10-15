import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { heatZoneData } from './data/heatZones';
import { poiData } from './data/poiData';

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

export default function App() {
  // Coordenadas iniciales (centradas en Buenos Aires)
  const initialRegion = {
    latitude: -34.6037,
    longitude: -58.3816,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={MapView.PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {/* Renderizado de las Zonas de Calor (Heatmap simulado) */}
        {heatZoneData.map((zone) => (
          <Polygon
            key={zone.id}
            coordinates={zone.coordinates}
            fillColor={zone.color}
            strokeColor="rgba(255, 255, 255, 0.8)"
            strokeWidth={2}
          />
        ))}

        {/* Renderizado de los Puntos de Interés (Restaurantes) */}
        {poiData.map((poi) => (
          <Marker
            key={poi.id}
            coordinate={{ latitude: poi.latitude, longitude: poi.longitude }}
            title={poi.name}
            description={`${poi.category} • ⭐ ${poi.rating} • ${poi.demand} demanda`}
          >
            <View style={[styles.customMarker, { backgroundColor: getMarkerColor(poi.demand) }]}>
              <Text style={styles.markerIcon}>{getCategoryIcon(poi.category)}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Leyenda de colores */}
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

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  customMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerIcon: {
    fontSize: 18,
    color: '#FFF',
  },
  legend: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
