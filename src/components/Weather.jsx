import React, { useEffect, useState } from 'react';
import "./Weather.css";

const WeatherInfo = ({ weatherData }) => {
  const { name, main, weather, wind } = weatherData;
  const date = new Date().toLocaleString();

  return (
    <div className="weather-info">
      <div className="date-time">{date}</div>
      <div className="weather-icon">
        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="weather icon" />
      </div>
      <div className="temp-details">
        <div>Min Temp: {main.temp_min} °C</div>
        <div>Avg Temp: {main.temp} °C</div>
        <div>Max Temp: {main.temp_max} °C</div>
      </div>
      <div className="location">{name}</div>
      <div className="other-info">
        <div><i className="fas fa-water"></i> {main.humidity}% Humidity</div>
        <div><i className="fas fa-wind"></i> {wind.speed} Km/h Wind Speed</div>
      </div>
    </div>
  );
};

const ToggleTheme = ({ onToggle }) => {
  return (
    <div className="toggle-theme">
      <label className="switch">
        <input type="checkbox" onChange={onToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

const SearchBar = ({ city, setCity, handleSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}  
        placeholder="Enter City..."
      />
      <button onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

const Header = () => {
  return <h1 className="header-title">Weather Dashboard</h1>;
};

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Hyderabad');
  const [darkMode, setDarkMode] = useState(false);

  const fetchWeatherData = async (cityName) => {
    const apiKey = "7b32543e9965a3e4461f0f2c2aa56356";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null); 
    }
  };

  useEffect(() => {
    fetchWeatherData(city); 
  }, []);

  const handleSearch = () => {
    if (city) {
      fetchWeatherData(city);
    }
  };

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="app">
      <ToggleTheme onToggle={handleToggleTheme} />
      <Header />
      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
      {weatherData && <WeatherInfo weatherData={weatherData} />}
    </div>
  );
};

export default WeatherDashboard;
