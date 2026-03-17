# 🌤️ Weather App

A modern, responsive weather application built with React, TypeScript, and TailwindCSS. Get real-time weather data and 7-day forecasts for any city worldwide.

https://dehiven.github.io/APP-Meteorologia/

## ✨ Features

### 🔍 City Search
- Search any city worldwide with autocomplete suggestions
- Instant results as you type
- Shows city name, region, and country

### 🌡️ Current Weather
- **Temperature** - Real-time temperature display
- **Feels Like** - Apparent temperature considering wind chill
- **Humidity** - Relative humidity with visual progress bar
- **Wind Speed** - Current wind velocity
- **Precipitation** - Current rainfall amount
- **UV Index** - UV radiation level (Low/Moderate/High)
- **Weather Icons** - Dynamic icons based on conditions

### 📅 7-Day Forecast
- Weekly weather outlook
- Daily high/low temperatures
- Visual weather condition icons
- Interactive day selection

### ⏰ Hourly Forecast
- 24-hour detailed forecast
- Temperature per hour
- Precipitation probability
- Weather conditions

### 🌍 Multi-Language Support
- 🇺🇸 English
- 🇪🇸 Español
- 🇫🇷 Français
- 🇩🇪 Deutsch

### 📐 Unit Conversion
- **Metric**: °C, km/h, mm
- **Imperial**: °F, mph, inches

### 📱 Responsive Design
- Fully optimized for mobile, tablet, and desktop
- Touch-friendly interface
- Adaptive layouts

### 🎨 Modern UI
- Glass morphism design
- Smooth animations
- Gradient backgrounds
- Dark blue atmospheric theme

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Zustand** - State management
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Zod** - Validation
- **Axios** - HTTP client

### API
- **Open-Meteo** - Free weather API (no key required)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Dehiven/APP-Meteorologia.git
cd APP-Meteorologia
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

### Running the App

**Option 1: Run both servers**
```bash
npm run dev:all
```

**Option 2: Run separately**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:5173
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 📁 Project Structure

```
weather-app/
├── src/                    # Frontend source
│   ├── components/         # React components
│   │   ├── CurrentWeather.tsx
│   │   ├── SearchBar.tsx
│   │   ├── WeeklyForecast.tsx
│   │   ├── HourlyForecast.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── UnitSelector.tsx
│   │   └── ...
│   ├── services/           # API services
│   ├── store/             # Zustand state
│   ├── types/             # TypeScript types
│   └── utils/             # Utilities
├── server/                # Backend source
│   └── src/
│       ├── controllers/   # Route controllers
│       ├── services/      # Business logic
│       ├── routes/        # Express routes
│       └── types/         # TypeScript types
├── dist/                  # Production build
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## 🎯 Usage

1. **Search for a city** - Type in the search box
2. **Select a location** - Click on a suggestion
3. **View weather** - See current conditions and forecast
4. **Change units** - Toggle °C/°F
5. **Change language** - Select your preferred language
6. **Check hourly/daily** - Click on forecast days

## 🔧 API Configuration

The app uses [Open-Meteo API](https://open-meteo.com/) - a free, open-source weather API that requires no API key.

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Weather: `https://api.open-meteo.com/v1/forecast`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developed by

**Dehiven Code**

---

<p align="center">
  Made with ❤️ using React & Open-Meteo API
</p>
