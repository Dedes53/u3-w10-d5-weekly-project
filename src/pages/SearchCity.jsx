import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { getCurrentWeather, getForecast, getWeatherIconUrl } from '../utils/weatherApi';
import { getWeatherComment, formatDate } from '../utils/weatherHelpers';
import WeatherCard from '../components/WeatherCard';
import './SearchCity.css';

function SearchCity() {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!city.trim()) {
      setError('Per favore inserisci il nome di una città');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city)
      ]);
      
      setCurrentWeather(currentData);
      setForecast(forecastData);
    } catch (error) {
      setError('Città non trovata. Verifica il nome e riprova.');
      setCurrentWeather(null);
      setForecast(null);
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get daily forecasts (one per day at 12:00)
  const getDailyForecasts = () => {
    if (!forecast) return [];
    
    const dailyData = [];
    const processedDates = new Set();
    
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      
      // Get one forecast per day, preferring midday (12:00)
      if (!processedDates.has(date) && dailyData.length < 5) {
        const hour = new Date(item.dt * 1000).getHours();
        if (hour >= 11 && hour <= 14) {
          processedDates.add(date);
          dailyData.push(item);
        }
      }
    });
    
    // If we don't have enough forecasts, fill with any available
    if (dailyData.length < 5) {
      const remainingDates = new Set();
      forecast.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!processedDates.has(date) && dailyData.length < 5 && !remainingDates.has(date)) {
          remainingDates.add(date);
          dailyData.push(item);
        }
      });
    }
    
    return dailyData;
  };

  return (
    <Container className="search-container">
      <h1 className="text-center mb-4 page-title">
        🔍 Cerca il Meteo nella Tua Città
      </h1>
      
      <Form onSubmit={handleSubmit} className="search-form mb-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Inserisci il nome della città..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                size="lg"
                className="search-input"
              />
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              size="lg" 
              className="w-100 search-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Caricamento...
                </>
              ) : (
                '🔍 Cerca'
              )}
            </Button>
          </Col>
        </Row>
      </Form>

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {currentWeather && forecast && (
        <Row className="g-4">
          <Col xs={12} lg={5}>
            <h3 className="section-title">☀️ Meteo Oggi</h3>
            <WeatherCard weatherData={currentWeather} showComment={true} />
          </Col>
          
          <Col xs={12} lg={7}>
            <h3 className="section-title">📅 Previsioni a 5 Giorni</h3>
            <Row className="g-3">
              {getDailyForecasts().map((day, index) => (
                <Col key={index} xs={12} sm={6} md={4}>
                  <Card className="forecast-card shadow-sm h-100">
                    <Card.Body className="text-center">
                      <Card.Title className="forecast-date">
                        {formatDate(day.dt_txt)}
                      </Card.Title>
                      <img
                        src={getWeatherIconUrl(day.weather[0].icon)}
                        alt={day.weather[0].description}
                        className="forecast-icon"
                      />
                      <div className="forecast-description">
                        {day.weather[0].description.charAt(0).toUpperCase() + 
                         day.weather[0].description.slice(1)}
                      </div>
                      <div className="forecast-temp">
                        {Math.round(day.main.temp)}°C
                      </div>
                      <div className="forecast-details">
                        <small>
                          Min: {Math.round(day.main.temp_min)}°C
                          <br />
                          Max: {Math.round(day.main.temp_max)}°C
                        </small>
                      </div>
                      <div className="forecast-comment mt-2">
                        <small>{getWeatherComment(day.weather[0].main)}</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}

      {!currentWeather && !loading && !error && (
        <div className="text-center empty-state">
          <div className="empty-icon">🌍</div>
          <p className="empty-text">
            Inserisci il nome di una città per vedere il meteo!
          </p>
        </div>
      )}
    </Container>
  );
}

export default SearchCity;
