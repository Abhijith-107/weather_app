import React, { useEffect, useState } from 'react';
import './Weather.css';
import search_Icon from '../assets/search.png';
import clear_Icon from '../assets/clear.png';
import cloud_Icon from '../assets/cloud.png';
import drizzle_Icon from '../assets/drizzle.png';
import humidity_Icon from '../assets/humidity.png';
import rain_Icon from '../assets/rain.png';
import snow_Icon from '../assets/snow.png';
import wind_Icon from '../assets/wind.png';

const allIcons = {
    "01d": clear_Icon,
    "01n": clear_Icon,
    "02d": cloud_Icon,
    "02n": cloud_Icon,
    "03d": cloud_Icon,
    "03n": cloud_Icon,
    "04d": drizzle_Icon,
    "04n": drizzle_Icon,
    "09d": rain_Icon,
    "09n": rain_Icon,
    "10d": rain_Icon,
    "10n": rain_Icon,
    "13d": snow_Icon,
    "13n": snow_Icon,
};

const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);
    const [searchInput, setSearchInput] = useState(''); // State for the search input

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            const icon = data.weather && data.weather[0] ? allIcons[data.weather[0].icon] || clear_Icon : clear_Icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperture: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setWeatherData(false);
        }
    };

    useEffect(() => {
        search("Kochi"); // Default city on component load
    }, []);

    const handleSearch = () => {
        if (searchInput.trim()) {
            search(searchInput); // Trigger search with input value
        }
    };

    return (
        <div className="weather">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} // Update searchInput state
                />
                <img
                    src={search_Icon}
                    alt="search"
                    onClick={handleSearch} // Trigger search on click
                    style={{ cursor: 'pointer' }} // Add pointer cursor for search icon
                />
            </div>
            {weatherData && (
                <>
                    <img src={weatherData.icon} alt="weather" className="weather-icon" />
                    <p className="temperature">{weatherData.temperture}℃</p>
                    <p className="location">{weatherData.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_Icon} alt="humidity" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_Icon} alt="wind" />
                            <div>
                                <p>{weatherData.windSpeed}km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Weather;
