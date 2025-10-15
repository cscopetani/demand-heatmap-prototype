# 🗺️ Demand Heatmap Mobile Prototype

A React Native mobile prototype that visualizes demand levels on a map using heat zones, similar to Uber Eats' demand visualization. Built for Buenos Aires with Google Maps-like styling.

## ✨ Features

### 🎯 **Heat Zone Visualization**
- **Color-coded polygons** representing different demand levels
- 🔴 **High Demand**: Red zones (Palermo, Puerto Madero)
- 🟠 **Medium Demand**: Orange zones (Recoleta, San Telmo)  
- 🟢 **Low Demand**: Green zones (Barracas)

### 📍 **Interactive POI Markers**
- **Restaurant markers** with category-specific icons
- 🍽️ Restaurants, ☕ Cafes, 🥖 Bakeries, 🍦 Desserts
- **Color-coded by demand level**
- **Rating and demand information** in popups

### 🗺️ **Map Features**
- **Fully navigable** with pan, zoom, and click interactions
- **Google Maps-like styling** with minimal design
- **Buenos Aires location** with real neighborhoods
- **Interactive legend** and controls
- **Web and mobile compatibility**

## 🛠️ Technical Stack

- **React Native** with Expo for rapid development
- **Leaflet Maps** for web compatibility
- **react-native-maps** for mobile
- **Custom styling** matching Google Maps aesthetic
- **Material Design colors** and typography

## 📁 Project Structure

```
DemandMapPrototype/
├── App.js                     # Mobile app component
├── App.web.js                 # Web app component
├── components/
│   ├── NavigableWebMap.js     # Interactive web map
│   ├── SimpleWebMap.js        # Static web map
│   └── WebMap.js              # Google Maps web component
├── data/
│   ├── heatZones.js          # Buenos Aires heat zones
│   └── poiData.js            # Restaurant POI data
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Expo CLI
- iOS Simulator (for iOS) or Android Studio (for Android)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/cscopetani/demand-heatmap-prototype.git
   cd demand-heatmap-prototype
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Run on different platforms**:
   ```bash
   # Web (recommended for testing)
   npm run web
   
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## 🎨 Customization

### Adding New Heat Zones
Edit `data/heatZones.js`:
```javascript
{
  id: 6,
  level: 'Alta',
  color: 'rgba(244, 67, 54, 0.6)',
  coordinates: [
    { latitude: -34.6000, longitude: -58.4000 },
    // ... more coordinates
  ],
}
```

### Adding New Restaurants
Edit `data/poiData.js`:
```javascript
{
  id: 111,
  name: "New Restaurant",
  latitude: -34.6000,
  longitude: -58.4000,
  demand: 'Alta',
  category: 'restaurant',
  rating: 4.5
}
```

### Styling
- **Map colors**: Modify `NavigableWebMap.js` styles
- **Heat zone colors**: Update `heatZones.js`
- **Marker colors**: Change `getMarkerColor()` function

## 📊 Data Structure

### Heat Zones
```javascript
{
  id: number,
  level: 'Alta' | 'Media' | 'Baja',
  color: 'rgba(r, g, b, opacity)',
  coordinates: [{ latitude: number, longitude: number }]
}
```

### Points of Interest
```javascript
{
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  demand: 'Alta' | 'Media' | 'Baja',
  category: 'restaurant' | 'cafe' | 'bakery' | 'dessert',
  rating: number
}
```

## 🌍 Buenos Aires Locations

### Heat Zones
- **Palermo**: High demand area
- **Recoleta**: Medium demand area
- **Barracas**: Low demand area
- **Puerto Madero**: High demand area
- **San Telmo**: Medium demand area

### Featured Restaurants
- **Don Julio** (Palermo) - High demand
- **Café Tortoni** (Centro) - Medium demand
- **La Cabrera** (Palermo) - Low demand
- **Puerto Madero** (Puerto Madero) - High demand
- **Café Martínez** (Recoleta) - Medium demand

## 🔧 Development

### Web Development
The web version uses Leaflet maps for better compatibility and no API key requirements.

### Mobile Development
The mobile version uses react-native-maps for native performance.

### Styling
The app uses Google Maps-like minimal styling with:
- Light gray background (`#f5f5f5`)
- White roads
- Subtle colors for heat zones
- Material Design color palette

## 🚀 Future Enhancements

- [ ] Real-time data integration
- [ ] Dynamic zone updates
- [ ] User location services
- [ ] Performance optimization
- [ ] Analytics dashboard
- [ ] Multi-city support
- [ ] Offline map support

## 📱 Screenshots

The prototype features:
- Interactive heat zones over Buenos Aires
- Restaurant markers with category icons
- Google Maps-like minimal styling
- Responsive design for web and mobile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both web and mobile
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Repository**: https://github.com/cscopetani/demand-heatmap-prototype
- **Live Demo**: Run `npm run web` to see the web version
- **Documentation**: See README.md for detailed setup instructions
