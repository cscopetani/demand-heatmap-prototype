// Función para generar coordenadas de hexágono perfecto (panal de abeja)
const generateHexagon = (centerLat, centerLng, radius) => {
  const coordinates = [];
  
  // Hexágono perfecto con 6 vértices
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i; // 60 grados por vértice
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    const lat = centerLat + (y * 0.0001);
    const lng = centerLng + (x * 0.0001);
    coordinates.push({ latitude: lat, longitude: lng });
  }
  
  return coordinates;
};

// Función para generar malla hexagonal de panal de abeja perfecto
const generateHoneycombGrid = (centerLat, centerLng) => {
  const hexagons = [];
  const rows = 12;
  const cols = 14;
  
  // Radio del hexágono (basado en las dimensiones CSS)
  const hexRadius = 0.003; // Radio en grados geográficos
  
  // Espaciado para panal de abeja perfecto
  const hexWidth = hexRadius * 2; // Ancho del hexágono
  const hexHeight = hexRadius * Math.sqrt(3); // Altura del hexágono
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Cálculo de posición para panal de abeja
      const x = col * hexWidth * 0.75; // 75% del ancho para solapamiento
      const y = row * hexHeight + (col % 2) * hexHeight / 2; // Offset alternado
      
      const lat = centerLat + y;
      const lng = centerLng + x;
      
      // Asignar demanda basada en el patrón del CSS
      let demand = 'Baja';
      let intensity = 0.3;
      
      // Patrón de demanda basado en la posición
      if (row <= 3) {
        // Filas superiores - Alta demanda
        if (col >= 2 && col <= 5) {
          demand = 'Alta';
          intensity = 0.7 + Math.random() * 0.3;
        } else if (col >= 6 && col <= 9) {
          demand = 'Media';
          intensity = 0.5 + Math.random() * 0.3;
        }
      } else if (row >= 4 && row <= 7) {
        // Filas medias - Distribución mixta
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
        // Filas inferiores - Baja demanda
        demand = 'Baja';
        intensity = 0.2 + Math.random() * 0.2;
      }
      
      hexagons.push({
        id: `hex_${row}_${col}`,
        level: demand,
        color: getDemandColor(demand, intensity),
        coordinates: generateHexagon(lat, lng, hexRadius),
        intensity: intensity,
        center: { latitude: lat, longitude: lng },
        radius: hexRadius
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

// Generar malla hexagonal para Buenos Aires (12x14 = 168 hexágonos)
const buenosAiresCenter = { lat: -34.6037, lng: -58.3816 };
export const heatZoneData = generateHoneycombGrid(buenosAiresCenter.lat, buenosAiresCenter.lng);

// Debug: Log para verificar que se generan los hexágonos
console.log('Hexágonos generados:', heatZoneData.length);
if (heatZoneData.length > 0) {
  console.log('Primer hexágono:', heatZoneData[0]);
  console.log('Último hexágono:', heatZoneData[heatZoneData.length - 1]);
  
  // Distribución por nivel
  const distribution = heatZoneData.reduce((acc, hex) => {
    acc[hex.level] = (acc[hex.level] || 0) + 1;
    return acc;
  }, {});
  console.log('Distribución de demanda:', distribution);
}
