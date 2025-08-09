require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL pool setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Test DB connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log('PostgreSQL connected');
  release();
});

// GET /weather?city=cityname
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    // Call OpenWeatherMap API
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    const response = await axios.get(url);
    const weatherData = response.data;

    // Store city search history in DB
    await pool.query('INSERT INTO search_history(city) VALUES($1)', [city]);

    // Send relevant weather data to frontend
    res.json({
      city: weatherData.name,
      temp: weatherData.main.temp,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      humidity: weatherData.main.humidity,
      wind: weatherData.wind.speed,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// GET /history to fetch search history
app.get('/history', async (req, res) => {
  try {
    const result = await pool.query('SELECT city, searched_at FROM search_history ORDER BY searched_at DESC LIMIT 10');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});