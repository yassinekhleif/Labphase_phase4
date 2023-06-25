import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = () => ''
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?city=${searchQuery}&key=3ce68198f49d441a8532c9a22f175680`
      );
      setWeatherData(response.data.data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again later.');
      setLoading(false);
    }
    const fetchWeatherData = async (location) => {
      try {
        const response = await axios.get(`API_URL?location=${location}`);
        const weatherData = response.data;
    displayWeatherData(weatherData);
  } catch (error) {
    if (error.response) {
      console.log("API Error:", error.response.data);
      displayErrorMessage("Error retrieving weather data. Please try again later.");
    } else if (error.request) {
      if (error.request.status === 0) {
        displayErrorMessage("The weather API is currently unavailable. Please try again later.");
      } else {
        console.log("No response from API:", error.request);
        displayErrorMessage("No response from the weather API. Please check your internet connection.");
      }
    } else {
      console.log("Error:", error.message);
      displayErrorMessage("An unexpected error occurred. Please try again later.");
    }
  }
};

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?city=${searchQuery}&key=3ce68198f49d441a8532c9a22f175680`
      );
      const weatherData = response.data;
      // Display the weather data to the user
      displayWeatherData(weatherData);
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // The API responded with an error status code (e.g., 404, 500)
        console.log("API Error:", error.response.data);
        displayErrorMessage("Error retrieving weather data. Please try again later.");
      } else if (error.request) {
        // The API request was made but no response was received
        console.log("No response from API:", error.request);
        displayErrorMessage("No response from the weather API. Please check your internet connection.");
      } else {
        // Other errors occurred during the request or processing
        console.log("Error:", error.message);
        displayErrorMessage("An unexpected error occurred. Please try again later.");
      }
    }
  };
const [errorMessage, setErrorMessage] = useState(null);
const displayErrorMessage = (message) => {
  setErrorMessage(message);
};
const clearErrorMessage = () => {
  setErrorMessage(null);
};
{errorMessage && (
  <div className="error-message">
    <p>{errorMessage}</p>
    <button onClick={clearErrorMessage}>Dismiss</button>
  </div>
)}

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.city_name}</h2>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Weather Condition: {weatherData.weather.description}</p>
          <p>Wind Speed: {weatherData.wind_spd} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
