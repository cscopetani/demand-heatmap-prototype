// Función para generar coordenadas de hexágono
const createHexagon = (centerLat, centerLng, radiusKm) => {
  const earthRadius = 6371; // Radio de la Tierra en km
  const lat = centerLat * Math.PI / 180;
  const lng = centerLng * Math.PI / 180;
  
  const hexPoints = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60) * Math.PI / 180;
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

// Generar malla hexagonal 12x14 para Buenos Aires
export const hexGridData = [];

// Centro de Buenos Aires
const centerLat = -34.6037;
const centerLng = -58.3816;
const hexRadius = 0.8; // Radio del hexágono en km

// Crear malla hexagonal
for (let row = 0; row < 14; row++) {
  for (let col = 0; col < 12; col++) {
    const id = row * 12 + col + 1;
    
    // Calcular posición del hexágono
    const x = col * hexRadius * 1.5;
    const y = row * hexRadius * Math.sqrt(3);
    
    // Offset para filas impares (patrón de panal)
    const offsetX = (row % 2) * hexRadius * 0.75;
    
    // Convertir a coordenadas lat/lng
    const lat = centerLat + (y / 111); // 1 grado ≈ 111 km
    const lng = centerLng + ((x + offsetX) / (111 * Math.cos(centerLat * Math.PI / 180)));
    
    // Determinar nivel de demanda basado en ubicación
    let level, intensity, color;
    
    // Palermo y Puerto Madero - Alta demanda
    if ((lat > -34.5900 && lat < -34.5700 && lng > -58.4300 && lng < -58.4000) ||
        (lat > -34.6100 && lat < -34.6000 && lng > -58.3700 && lng < -58.3600)) {
      level = 'Alta';
      intensity = 0.8 + Math.random() * 0.2;
      color = 'rgba(244, 67, 54, 0.7)';
    }
    // Recoleta y San Telmo - Media demanda
    else if ((lat > -34.6000 && lat < -34.5800 && lng > -58.4000 && lng < -58.3800) ||
             (lat > -34.6200 && lat < -34.6000 && lng > -58.3800 && lng < -58.3600)) {
      level = 'Media';
      intensity = 0.5 + Math.random() * 0.3;
      color = 'rgba(255, 152, 0, 0.6)';
    }
    // Barracas y zonas periféricas - Baja demanda
    else {
      level = 'Baja';
      intensity = 0.2 + Math.random() * 0.3;
      color = 'rgba(76, 175, 80, 0.5)';
    }
    
    // Crear hexágono
    const hexagon = {
      id,
      level,
      intensity,
      color,
      coordinates: createHexagon(lat, lng, hexRadius),
      centerLat: lat,
      centerLng: lng,
      row,
      col
    };
    
    hexGridData.push(hexagon);
  }
}

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
