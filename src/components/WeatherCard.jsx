import { Card } from 'react-bootstrap';
import { getWeatherIconUrl } from '../utils/weatherApi';
import { getWeatherComment, formatLocalTime } from '../utils/weatherHelpers';
import './WeatherCard.css';

function WeatherCard({ weatherData, showComment = true }) {
  const { name, main, weather, dt, timezone } = weatherData;
  const weatherInfo = weather[0];
  const localTime = formatLocalTime(dt, timezone);

  return (
    <Card className="weather-card shadow-sm h-100">
      <Card.Body className="text-center">
        <Card.Title className="city-name mb-3">{name}</Card.Title>
        <img
          src={getWeatherIconUrl(weatherInfo.icon)}
          alt={weatherInfo.description}
          className="weather-icon"
        />
        <div className="weather-description mb-2">
          {weatherInfo.description.charAt(0).toUpperCase() + 
           weatherInfo.description.slice(1)}
        </div>
        <div className="temperature mb-2">
          {Math.round(main.temp)}°C
        </div>
        <div className="local-time mb-2">
          ⏰ Ora locale: {localTime}
        </div>
        <div className="weather-details mb-2">
          <small>
            Min: {Math.round(main.temp_min)}°C | Max: {Math.round(main.temp_max)}°C
          </small>
        </div>
        {showComment && (
          <div className="weather-comment mt-3 p-2">
            {getWeatherComment(weatherInfo.main)}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;
