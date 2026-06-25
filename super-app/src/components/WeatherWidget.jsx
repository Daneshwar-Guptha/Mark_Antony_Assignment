import { useEffect, useState } from "react";
import { fetchCurrentWeather, getWeatherIconUrl } from "../services/weatherApi";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCurrentWeather()
      .then(setWeather)
      .catch((requestError) => setError(requestError.message));
  }, []);

  if (error) {
    return <article className="weather-widget widget-message">{error}</article>;
  }

  if (!weather) {
    return <article className="weather-widget widget-message">Loading weather...</article>;
  }

  return (
    <article className="weather-widget">
      <header>
        <strong>{weather.date}</strong>
        <strong>{weather.time}</strong>
      </header>
      <div className="weather-body">
        <div>
          <img className="weather-icon-img" src={getWeatherIconUrl(weather.icon)} alt={weather.condition} />
          <p>{weather.condition}</p>
        </div>
        <div>
          <strong>{weather.temperature}°C</strong>
          <p>
            {weather.pressure}
            <br />
            Pressure
          </p>
        </div>
        <div>
          <p>
            {weather.wind}
            <br />
            Wind
          </p>
          <p>
            {weather.humidity}
            <br />
            Humidity
          </p>
        </div>
      </div>
    </article>
  );
}

export default WeatherWidget;
