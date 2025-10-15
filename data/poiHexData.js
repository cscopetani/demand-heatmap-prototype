// Función para generar coordenadas de hexágono
const createHexagon = (centerLat, centerLng, radiusKm) => {
  const earthRadius = 6371; // Radio de la Tierra en km
  const lat = centerLat * Math.PI / 180;
  const lng = centerLng * Math.PI / 180;
  
  const hexPoints = [];
  // Generar 6 vértices del hexágono, empezando desde el vértice superior
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 - 30) * Math.PI / 180; // -30 para empezar desde arriba
    const newLat = Math.asin(Math.sin(lat) * Math.cos(radiusKm / earthRadius) + 
                           Math.cos(lat) * Math.sin(radiusKm / earthRadius) * Math.cos(angle));
    const newLng = lng + Math.atan2(Math.sin(angle) * Math.sin(radiusKm / earthRadius) * Math.cos(lat),
                                   Math.cos(radiusKm / earthRadius) - Math.sin(lat) * Math.sin(newLat));
    
    hexPoints.push({
      latitude: newLat * 180 / Math.PI,
      longitude: newLng * 180 / Math.PI
    });
  }
  return hexPoints;
};

// Generar hexágonos centrados en los POIs
export const poiHexData = [
  // Don Julio - Palermo (Alta demanda)
  {
    id: 1,
    centerLat: -34.5850,
    centerLng: -58.4150,
    level: 'Alta',
    intensity: 0.9,
    color: 'rgba(244, 67, 54, 0.7)',
    coordinates: createHexagon(-34.5850, -58.4150, 0.3),
    poiName: 'Don Julio'
  },
  
  // Café Tortoni - San Telmo (Media demanda)
  {
    id: 2,
    centerLat: -34.6080,
    centerLng: -58.3730,
    level: 'Media',
    intensity: 0.6,
    color: 'rgba(255, 152, 0, 0.6)',
    coordinates: createHexagon(-34.6080, -58.3730, 0.3),
    poiName: 'Café Tortoni'
  },
  
  // La Cabrera - Palermo (Baja demanda)
  {
    id: 3,
    centerLat: -34.5900,
    centerLng: -58.4200,
    level: 'Baja',
    intensity: 0.4,
    color: 'rgba(76, 175, 80, 0.5)',
    coordinates: createHexagon(-34.5900, -58.4200, 0.3),
    poiName: 'La Cabrera'
  },
  
  // Puerto Madero (Alta demanda)
  {
    id: 4,
    centerLat: -34.6150,
    centerLng: -58.3650,
    level: 'Alta',
    intensity: 0.8,
    color: 'rgba(244, 67, 54, 0.7)',
    coordinates: createHexagon(-34.6150, -58.3650, 0.3),
    poiName: 'Puerto Madero'
  },
  
  // Café Martínez - Recoleta (Media demanda)
  {
    id: 5,
    centerLat: -34.6000,
    centerLng: -58.3900,
    level: 'Media',
    intensity: 0.5,
    color: 'rgba(255, 152, 0, 0.6)',
    coordinates: createHexagon(-34.6000, -58.3900, 0.3),
    poiName: 'Café Martínez'
  },
  
  // La Panadería - Palermo (Alta demanda)
  {
    id: 6,
    centerLat: -34.5800,
    centerLng: -58.4100,
    level: 'Alta',
    intensity: 0.7,
    color: 'rgba(244, 67, 54, 0.7)',
    coordinates: createHexagon(-34.5800, -58.4100, 0.3),
    poiName: 'La Panadería'
  },
  
  // Freddo - San Telmo (Media demanda)
  {
    id: 7,
    centerLat: -34.6200,
    centerLng: -58.3750,
    level: 'Media',
    intensity: 0.6,
    color: 'rgba(255, 152, 0, 0.6)',
    coordinates: createHexagon(-34.6200, -58.3750, 0.3),
    poiName: 'Freddo'
  },
  
  // El Obrero - Barracas (Baja demanda)
  {
    id: 8,
    centerLat: -34.6400,
    centerLng: -58.3800,
    level: 'Baja',
    intensity: 0.3,
    color: 'rgba(76, 175, 80, 0.5)',
    coordinates: createHexagon(-34.6400, -58.3800, 0.3),
    poiName: 'El Obrero'
  },
  
  // Casa Rosada - Centro (Alta demanda)
  {
    id: 9,
    centerLat: -34.6080,
    centerLng: -58.3700,
    level: 'Alta',
    intensity: 0.9,
    color: 'rgba(244, 67, 54, 0.7)',
    coordinates: createHexagon(-34.6080, -58.3700, 0.3),
    poiName: 'Casa Rosada'
  },
  
  // Caminito - La Boca (Media demanda)
  {
    id: 10,
    centerLat: -34.6500,
    centerLng: -58.3650,
    level: 'Media',
    intensity: 0.5,
    color: 'rgba(255, 152, 0, 0.6)',
    coordinates: createHexagon(-34.6500, -58.3650, 0.3),
    poiName: 'Caminito'
  }
];

// Función auxiliar para obtener color del marcador basado en demanda
export const getHexColor = (level) => {
  switch (level) {
    case 'Alta': return '#F44336';
    case 'Media': return '#FF9800';
    case 'Baja': return '#4CAF50';
    default: return '#9E9E9E';
  }
};

// Función auxiliar para obtener intensidad visual
export const getIntensity = (intensity) => {
  return Math.max(0.3, Math.min(0.9, intensity));
};
