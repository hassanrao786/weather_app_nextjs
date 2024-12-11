"use client";
import React, { useEffect, useState } from 'react';

const WeatherApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState({
    city: 'Denver',
    temp: '51°C',
    icon: '04n',
    description: 'Cloudy',
    humidity: '60%',
    windSpeed: '6.2 km/h',
    loading: true
  });

  const apiKey = '67b92f0af5416edbfe58458f502b0a31';

  const fetchWeather = async (city:any) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('No weather found.');
      }
      const data = await response.json();
      const { name, weather, main, wind } = data;
      const { icon, description } = weather[0];
      const { temp, humidity } = main;
      const { speed } = wind;
      setWeatherData({
        city: name,
        temp: `${temp}°C`,
        icon,
        description,
        humidity: `Humidity: ${humidity}%`,
        windSpeed: `Wind speed: ${speed} km/h`,
        loading: false
      });
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('No weather found.');
    }
  };

  const handleSearch = () => {
    fetchWeather(searchQuery);
  };

  useEffect(() => {
    fetchWeather('Karachi');
  }, []);

  return (
    <div>
      <div className="card">
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
            </svg>
          </button>
        </div>
        <div className={`weather ${weatherData.loading ? 'loading' : ''}`}>
          <h2 className="city">Weather in {weatherData.city}</h2>
          <h1 className="temp">{weatherData.temp}</h1>
          <div className="flex">
            <img src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="" className="icon" />
            <div className="description">{weatherData.description}</div>
          </div>
          <div className="humidity">{weatherData.humidity}</div>
          <div className="wind">{weatherData.windSpeed}</div>
        </div>
      </div>
      <br />
      <br />
      <div className="footer">
        <h4>Designed & Developed with ❤️ by Muhammad Hassan</h4>
      </div>
    </div>
  );
};

export default WeatherApp;