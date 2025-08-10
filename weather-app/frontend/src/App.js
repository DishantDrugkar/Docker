import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`http://localhost:5003/weather?city=${city}`);
      setWeather(res.data);
      fetchHistory();
    } catch (err) {
      setError('City not found or API error');
      setWeather(null);
    }
    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5003/history');
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ width: '70%', padding: 8, fontSize: 16 }}
        />
        <button
          onClick={fetchWeather}
          style={{ padding: 8, fontSize: 16, marginLeft: 8 }}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div style={{ marginTop: 20, border: '1px solid #ccc', padding: 16, borderRadius: 8 }}>
          <h2>{weather.city}</h2>
          <p><strong>Temperature:</strong> {weather.temp} °C</p>
          <p><strong>Description:</strong> {weather.description}</p>
          <p><strong>Humidity:</strong> {weather.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind} m/s</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
      <div style={{ marginTop: 30 }}>
        <h3>Recent Searches</h3>
        {history.length === 0 && <p>No recent searches</p>}
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {item.city} — {new Date(item.searched_at).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;