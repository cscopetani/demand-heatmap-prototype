export const heatZoneData = [
  // Zona de Alta Demanda (Polígono 1 - Palermo)
  {
    id: 1,
    level: 'Alta',
    color: 'rgba(244, 67, 54, 0.6)', // Rojo más suave
    coordinates: [
      { latitude: -34.5800, longitude: -58.4200 },
      { latitude: -34.5900, longitude: -58.4200 },
      { latitude: -34.5900, longitude: -58.4100 },
      { latitude: -34.5800, longitude: -58.4100 },
    ],
  },
  // Zona de Demanda Media (Polígono 2 - Recoleta)
  {
    id: 2,
    level: 'Media',
    color: 'rgba(255, 152, 0, 0.4)', // Naranja más suave
    coordinates: [
      { latitude: -34.5900, longitude: -58.4000 },
      { latitude: -34.6000, longitude: -58.4000 },
      { latitude: -34.6000, longitude: -58.3900 },
      { latitude: -34.5900, longitude: -58.3900 },
    ],
  },
  // Zona de Baja Demanda (Polígono 3 - Barracas)
  {
    id: 3,
    level: 'Baja',
    color: 'rgba(76, 175, 80, 0.3)', // Verde suave
    coordinates: [
      { latitude: -34.6500, longitude: -58.3800 },
      { latitude: -34.6600, longitude: -58.3800 },
      { latitude: -34.6600, longitude: -58.3700 },
      { latitude: -34.6500, longitude: -58.3700 },
    ],
  },
  // Zona adicional de Alta Demanda (Polígono 4 - Puerto Madero)
  {
    id: 4,
    level: 'Alta',
    color: 'rgba(244, 67, 54, 0.6)',
    coordinates: [
      { latitude: -34.6100, longitude: -58.3700 },
      { latitude: -34.6200, longitude: -58.3700 },
      { latitude: -34.6200, longitude: -58.3600 },
      { latitude: -34.6100, longitude: -58.3600 },
    ],
  },
  // Zona adicional de Demanda Media (Polígono 5 - San Telmo)
  {
    id: 5,
    level: 'Media',
    color: 'rgba(255, 152, 0, 0.4)',
    coordinates: [
      { latitude: -34.6200, longitude: -58.3800 },
      { latitude: -34.6300, longitude: -58.3800 },
      { latitude: -34.6300, longitude: -58.3700 },
      { latitude: -34.6200, longitude: -58.3700 },
    ],
  },
];
