import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import WeatherCard from '../components/WeatherCard';
import { getCurrentWeather } from '../utils/weatherApi';
import './Home.css';

const CITIES = ['Roma', 'London', 'Paris', 'Tokyo', 'New York'];

function Home() {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherForCities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const promises = CITIES.map(city => getCurrentWeather(city));
        const results = await Promise.all(promises);
        
        const weatherMap = {};
        results.forEach((data, index) => {
          weatherMap[CITIES[index]] = data;
        });
        
        setWeatherData(weatherMap);
      } catch (err) {
        setError('Errore nel caricamento dei dati meteo. Riprova più tardi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherForCities();
  }, []);

  if (loading) {
    return (
      <Container className="home-container text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Caricamento...</span>
        </Spinner>
        <p className="mt-3">Caricamento dati meteo...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="home-container">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="home-container">
      <h1 className="text-center mb-4 page-title">
        🌍 Meteo nelle Grandi Città del Mondo
      </h1>
      <p className="text-center mb-5 subtitle">
        Scopri il tempo attuale nelle città più affascinanti del pianeta!
      </p>
      <Row className="g-4">
        {CITIES.map((city) => (
          <Col key={city} xs={12} md={6} lg={4}>
            {weatherData[city] && <WeatherCard weatherData={weatherData[city]} />}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
