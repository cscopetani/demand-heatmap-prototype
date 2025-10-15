// Función para generar coordenadas de hexágono
const generateHexagon = (centerLat, centerLng, radius) => {
  const coordinates = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const lat = centerLat + (radius * Math.cos(angle));
    const lng = centerLng + (radius * Math.sin(angle));
    coordinates.push({ latitude: lat, longitude: lng });
  }
  return coordinates;
};

// Función para generar malla hexagonal de panal de abeja
const generateHoneycombGrid = (centerLat, centerLng, gridSize, hexRadius) => {
  const hexagons = [];
  const hexHeight = hexRadius * Math.sqrt(3);
  const hexWidth = hexRadius * 2;
  
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = col * hexWidth * 0.75;
      const y = row * hexHeight + (col % 2) * hexHeight / 2;
      
      const lat = centerLat + (y * 0.0005);
      const lng = centerLng + (x * 0.0005);
      
          // Asignar demanda basada en posición en la grilla
          let demand = 'Baja';
          let intensity = 0.3;

          // Alta demanda en el centro-norte (simulando Palermo)
          if (row <= 2 && col >= 2 && col <= 4) {
            demand = 'Alta';
            intensity = 0.7 + Math.random() * 0.3;
          }
          // Media demanda en el centro-este (simulando Puerto Madero)
          else if (row >= 2 && row <= 4 && col >= 3) {
            demand = 'Media';
            intensity = 0.5 + Math.random() * 0.3;
          }
          // Media demanda en el centro-oeste (simulando Recoleta)
          else if (row >= 1 && row <= 3 && col <= 2) {
            demand = 'Media';
            intensity = 0.4 + Math.random() * 0.3;
          }
          // Baja demanda en los bordes
          else {
            demand = 'Baja';
            intensity = 0.2 + Math.random() * 0.2;
          }
      
      hexagons.push({
        id: `heat_hex_${row}_${col}`,
        level: demand,
        color: getDemandColor(demand, intensity),
        coordinates: generateHexagon(lat, lng, hexRadius),
        intensity: intensity,
        center: { latitude: lat, longitude: lng }
      });
    }
  }
  
  return hexagons;
};

// Función para obtener color basado en demanda e intensidad
const getDemandColor = (demand, intensity) => {
  const baseColors = {
    'Alta': [244, 67, 54],    // Rojo
    'Media': [255, 152, 0],   // Naranja
    'Baja': [76, 175, 80]     // Verde
  };
  
  const [r, g, b] = baseColors[demand];
  const opacity = 0.3 + (intensity * 0.5);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Generar malla hexagonal para Buenos Aires
const buenosAiresCenter = { lat: -34.6037, lng: -58.3816 };
export const heatZoneData = generateHoneycombGrid(buenosAiresCenter.lat, buenosAiresCenter.lng, 6, 0.02);

// Debug: Log para verificar que se generan los hexágonos
console.log('Hexágonos generados:', heatZoneData.length);
if (heatZoneData.length > 0) {
  console.log('Primer hexágono:', heatZoneData[0]);
  console.log('Coordenadas del primer hexágono:', heatZoneData[0].coordinates);
}
