import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CSSHexGrid = () => {
  return (
    <View style={styles.container}>
      <div className="hex-grid">
        <ul className="hex-grid__list">
          {/* Generar 168 hexágonos (12x14) */}
          {Array.from({ length: 168 }, (_, index) => {
            const row = Math.floor(index / 14);
            const col = index % 14;
            
            // Asignar demanda basada en posición
            let demand = 'Baja';
            let intensity = 0.3;
            
            if (row <= 3) {
              if (col >= 2 && col <= 5) {
                demand = 'Alta';
                intensity = 0.7 + Math.random() * 0.3;
              } else if (col >= 6 && col <= 9) {
                demand = 'Media';
                intensity = 0.5 + Math.random() * 0.3;
              }
            } else if (row >= 4 && row <= 7) {
              if (col <= 3) {
                demand = 'Media';
                intensity = 0.4 + Math.random() * 0.3;
              } else if (col >= 4 && col <= 7) {
                demand = 'Alta';
                intensity = 0.6 + Math.random() * 0.3;
              } else {
                demand = 'Media';
                intensity = 0.5 + Math.random() * 0.3;
              }
            } else {
              demand = 'Baja';
              intensity = 0.2 + Math.random() * 0.2;
            }
            
            const getColor = (level) => {
              if (level === 'Alta') return '#F44336';
              if (level === 'Media') return '#FF9800';
              return '#4CAF50';
            };
            
            return (
              <li key={`hex-${row}-${col}`} className="hex-grid__item">
                <div 
                  className="hex-grid__content"
                  style={{
                    backgroundColor: getColor(demand),
                    opacity: intensity,
                    '--demand': demand,
                    '--intensity': Math.round(intensity * 100)
                  }}
                  title={`Zona ${demand} Demanda - Intensidad: ${Math.round(intensity * 100)}%`}
                >
                  <span className="hex-content__text">
                    {index + 1}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Niveles de Demanda</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(244, 67, 54, 0.8)' }]} />
          <Text style={styles.legendText}>Alta Demanda</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(255, 152, 0, 0.8)' }]} />
          <Text style={styles.legendText}>Demanda Media</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(76, 175, 80, 0.8)' }]} />
          <Text style={styles.legendText}>Baja Demanda</Text>
        </View>
        <View style={styles.legendDivider} />
        <Text style={styles.legendSubtitle}>Malla CSS Hexagonal</Text>
        <Text style={styles.legendDescription}>
          168 hexágonos con Flexbox y clip-path
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative'
  },
  hexGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '20px',
    gap: '0',
    overflow: 'hidden'
  },
  legend: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 8,
    minWidth: 200,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 2,
    marginRight: 8
  },
  legendText: {
    fontSize: 14,
    color: '#666'
  },
  legendDivider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 12
  },
  legendSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333'
  },
  legendDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 1.4
  }
});

export default CSSHexGrid;
