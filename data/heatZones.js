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
      
      const lat = centerLat + (y * 0.0001);
      const lng = centerLng + (x * 0.0001);
      
      // Asignar demanda basada en ubicación
      let demand = 'Baja';
      let intensity = 0.3;
      
      // Palermo - Alta demanda
      if (lat >= -34.5900 && lat <= -34.5700 && lng >= -58.4200 && lng <= -58.4000) {
        demand = 'Alta';
        intensity = 0.7 + Math.random() * 0.3;
      }
      // Recoleta - Media demanda
      else if (lat >= -34.6000 && lat <= -34.5800 && lng >= -58.4100 && lng <= -58.3900) {
        demand = 'Media';
        intensity = 0.5 + Math.random() * 0.3;
      }
      // Puerto Madero - Alta demanda
      else if (lat >= -34.6200 && lat <= -34.6000 && lng >= -58.3800 && lng <= -58.3600) {
        demand = 'Alta';
        intensity = 0.6 + Math.random() * 0.4;
      }
      // San Telmo - Media demanda
      else if (lat >= -34.6300 && lat <= -34.6100 && lng >= -58.3900 && lng <= -58.3700) {
        demand = 'Media';
        intensity = 0.4 + Math.random() * 0.3;
      }
      // Barracas - Baja demanda
      else if (lat >= -34.6600 && lat <= -34.6400 && lng >= -58.3900 && lng <= -58.3700) {
        demand = 'Baja';
        intensity = 0.2 + Math.random() * 0.2;
      }
      
      hexagons.push({
        id: `heat_hex_${row}_${col}`,
        level: demand,
        color: getDemandColor(demand, intensity),
        coordinates: generateHexagon(lat, lng, hexRadius * 0.0001),
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
export const heatZoneData = generateHoneycombGrid(buenosAiresCenter.lat, buenosAiresCenter.lng, 12, 0.003);
