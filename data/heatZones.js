// Función para generar coordenadas de hexágono (rotado 90 grados)
const generateHexagon = (centerLat, centerLng, width, height) => {
  const coordinates = [];
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  
  // Hexágono rotado 90 grados (más alto que ancho)
  const points = [
    { x: 0, y: -halfHeight },           // Top
    { x: halfWidth * 0.866, y: -halfHeight * 0.5 },  // Top-right
    { x: halfWidth * 0.866, y: halfHeight * 0.5 },   // Bottom-right
    { x: 0, y: halfHeight },            // Bottom
    { x: -halfWidth * 0.866, y: halfHeight * 0.5 },  // Bottom-left
    { x: -halfWidth * 0.866, y: -halfHeight * 0.5 }  // Top-left
  ];
  
  for (const point of points) {
    const lat = centerLat + (point.y * 0.0001);
    const lng = centerLng + (point.x * 0.0001);
    coordinates.push({ latitude: lat, longitude: lng });
  }
  
  return coordinates;
};

// Función para generar malla hexagonal basada en el patrón CSS (12x14)
const generateHoneycombGrid = (centerLat, centerLng) => {
  const hexagons = [];
  const rows = 12;
  const cols = 14;
  const hexWidth = 63.26;
  const hexHeight = 73.05;
  
  // Conversión de píxeles a coordenadas geográficas
  const latStep = 0.0008;  // Ajuste para el espaciado vertical
  const lngStep = 0.0006;  // Ajuste para el espaciado horizontal
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Patrón de offset para hexágonos (cada fila alterna)
      const offsetX = (row % 2) * (hexWidth * 0.5);
      const x = col * hexWidth + offsetX;
      const y = row * hexHeight;
      
      const lat = centerLat + (y * latStep);
      const lng = centerLng + (x * lngStep);
      
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
        coordinates: generateHexagon(lat, lng, hexWidth, hexHeight),
        intensity: intensity,
        center: { latitude: lat, longitude: lng },
        width: hexWidth,
        height: hexHeight
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
