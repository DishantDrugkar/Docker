# Weather App (React + Node.js + PostgreSQL)

## Description

A simple Weather App where users can search city weather, with search history stored in PostgreSQL.  
The app consists of three Docker containers: frontend, backend, and database.

## Setup

1. Clone/download the repo.  
2. Replace `YOUR_OPENWEATHER_API_KEY` in `backend/.env.example` and `docker-compose.yml` with your OpenWeatherMap API key.  
3. Run:  
```bash
docker-compose up --build
```
4. Open your browser at [http://localhost:5003]  

## Project Structure

- `frontend/` — React app  
- `backend/` — Node.js API server  
- `db/init.sql` — PostgreSQL DB initialization script  
- `docker-compose.yml` — Docker compose config for all services

---

Enjoy your Weather App!