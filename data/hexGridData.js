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

// Función para generar malla hexagonal sobre Palermo
const generateHexGrid = (centerLat, centerLng, gridSize, hexRadius) => {
  const hexagons = [];
  const hexHeight = hexRadius * Math.sqrt(3);
  const hexWidth = hexRadius * 2;
  
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = col * hexWidth * 0.75;
      const y = row * hexHeight + (col % 2) * hexHeight / 2;
      
      const lat = centerLat + (y * 0.0001); // Ajuste para latitud
      const lng = centerLng + (x * 0.0001); // Ajuste para longitud
      
      // Solo incluir hexágonos dentro del área de Palermo
      if (lat >= -34.6000 && lat <= -34.5700 && lng >= -58.4300 && lng <= -58.4000) {
        hexagons.push({
          id: `hex_${row}_${col}`,
          center: { latitude: lat, longitude: lng },
          coordinates: generateHexagon(lat, lng, hexRadius * 0.0001),
          demand: getRandomDemand(),
          intensity: Math.random()
        });
      }
    }
  }
  
  return hexagons;
};

// Función para asignar demanda aleatoria
const getRandomDemand = () => {
  const rand = Math.random();
  if (rand < 0.3) return 'Alta';
  if (rand < 0.7) return 'Media';
  return 'Baja';
};

// Generar malla hexagonal para Palermo
const palermoCenter = { lat: -34.5850, lng: -58.4150 };
const hexGridData = generateHexGrid(palermoCenter.lat, palermoCenter.lng, 8, 0.002);

export { hexGridData };
