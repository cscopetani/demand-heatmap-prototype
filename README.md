# Demand Heatmap Mobile Prototype

A React Native mobile prototype that visualizes demand levels on a map using heat zones, similar to Uber Eats' demand visualization.

## Features

- **Heat Zone Visualization**: Color-coded polygons representing different demand levels
  - 🔴 **High Demand**: Red zones with 70% opacity
  - 🟠 **Medium Demand**: Orange zones with 50% opacity  
  - 🟡 **Low Demand**: Yellow zones with 30% opacity

- **Interactive POI Markers**: Restaurant and business markers with:
  - Category-specific icons (🍽️ restaurants, ☕ cafes, 🥖 bakeries, 🍦 desserts)
  - Color-coded by demand level
  - Rating and demand information in descriptions

- **Map Features**:
  - Google Maps integration
  - User location display
  - Compass and scale indicators
  - Interactive legend

## Technical Stack

- **React Native** with Expo for rapid development
- **react-native-maps** for Google Maps integration
- **Polygon overlays** to simulate heat zones
- **Custom markers** for points of interest

## Project Structure

```
DemandMapPrototype/
├── App.js                 # Main application component
├── data/
│   ├── heatZones.js      # Mock data for demand zones
│   └── poiData.js        # Mock data for points of interest
└── README.md
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on device/simulator**:
   - For iOS: `npm run ios`
   - For Android: `npm run android`
   - For Web: `npm run web`

## Data Structure

### Heat Zones
Each zone contains:
- `id`: Unique identifier
- `level`: Demand level ('Alta', 'Media', 'Baja')
- `color`: RGBA color with opacity
- `coordinates`: Array of lat/lng points defining the polygon

### Points of Interest
Each POI contains:
- `id`: Unique identifier
- `name`: Business name
- `latitude/longitude`: Geographic coordinates
- `demand`: Demand level
- `category`: Business type
- `rating`: Star rating

## Customization

### Adding New Heat Zones
Edit `data/heatZones.js` and add new zone objects with coordinates defining the polygon area.

### Adding New POIs
Edit `data/poiData.js` and add new point objects with business information.

### Styling
Modify the `styles` object in `App.js` to customize:
- Marker appearance
- Legend styling
- Map controls
- Color schemes

## Future Enhancements

- Real-time data integration
- Dynamic zone updates
- User interaction with zones
- Performance optimization for large datasets
- Custom map styling
- Analytics dashboard integration
