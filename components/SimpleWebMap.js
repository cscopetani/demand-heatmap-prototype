import React from 'react';
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

const SimpleWebMap = () => {
  return (
    <View style={styles.container}>
      {/* Mapa simulado con zonas de calor */}
      <View style={styles.mapContainer}>
        <div style={styles.mapBackground}>
          {/* Zonas de calor simuladas */}
          {heatZoneData.map((zone, index) => (
            <div
              key={zone.id}
              style={{
                ...styles.heatZone,
                backgroundColor: zone.color,
                top: `${20 + index * 15}%`,
                left: `${10 + index * 20}%`,
                width: `${15 + index * 5}%`,
                height: `${10 + index * 3}%`,
              }}
            >
              <div style={styles.zoneLabel}>{zone.level}</div>
            </div>
          ))}
          
          {/* Marcadores de POI simulados */}
          {poiData.map((poi, index) => (
            <div
              key={poi.id}
              style={{
                ...styles.poiMarker,
                backgroundColor: getMarkerColor(poi.demand),
                top: `${30 + (index % 3) * 20}%`,
                left: `${20 + (index % 4) * 15}%`,
              }}
              title={`${poi.name} - ${poi.category} - ⭐ ${poi.rating}`}
            >
              {getCategoryIcon(poi.category)}
            </div>
          ))}
          
          {/* Título del mapa */}
          <div style={styles.mapTitle}>
            <h2 style={styles.titleText}>Mapa de Demanda - San Francisco</h2>
            <p style={styles.subtitleText}>Zonas de calor y puntos de interés</p>
          </div>
        </div>
      </View>
      
      {/* Leyenda */}
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

      {/* Lista de restaurantes */}
      <View style={styles.restaurantList}>
        <Text style={styles.listTitle}>Restaurantes en el Área</Text>
        {poiData.map((poi) => (
          <View key={poi.id} style={styles.restaurantItem}>
            <Text style={styles.restaurantName}>{poi.name}</Text>
            <Text style={styles.restaurantDetails}>
              {getCategoryIcon(poi.category)} {poi.category} • ⭐ {poi.rating} • {poi.demand} demanda
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    position: 'relative',
    backgroundImage: 'linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
  },
  heatZone: {
    position: 'absolute',
    borderRadius: 8,
    opacity: 0.7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(255, 255, 255, 0.8)',
  },
  zoneLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  },
  poiMarker: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    border: '2px solid white',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  mapTitle: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '12px 16px',
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  titleText: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitleText: {
    margin: '4px 0 0 0',
    fontSize: '12px',
    color: '#666',
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
  restaurantList: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
    maxHeight: 200,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  restaurantItem: {
    padding: '4px 0',
    borderBottom: '1px solid #eee',
  },
  restaurantName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  restaurantDetails: {
    fontSize: 10,
    color: '#666',
  },
});

export default SimpleWebMap;
