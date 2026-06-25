const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const DEFAULT_CITY = import.meta.env.VITE_WEATHER_CITY || "Hyderabad";
const WEATHER_CODES = {
  0: ["Clear sky", "01d"],
  1: ["Mainly clear", "02d"],
  2: ["Partly cloudy", "03d"],
  3: ["Overcast", "04d"],
  45: ["Fog", "50d"],
  48: ["Fog", "50d"],
  51: ["Light drizzle", "09d"],
  53: ["Drizzle", "09d"],
  55: ["Heavy drizzle", "09d"],
  61: ["Light rain", "10d"],
  63: ["Rain", "10d"],
  65: ["Heavy rain", "10d"],
  71: ["Light snow", "13d"],
  73: ["Snow", "13d"],
  75: ["Heavy snow", "13d"],
  80: ["Rain showers", "09d"],
  81: ["Rain showers", "09d"],
  82: ["Heavy rain", "09d"],
  95: ["Thunderstorm", "11d"],
};

function formatWeatherDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).replaceAll("/", "-");
}

function formatWeatherTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateFromIso(dateValue) {
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).replaceAll("/", "-");
}

function formatTimeFromIso(dateValue) {
  return new Date(dateValue).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function fetchOpenMeteoWeather(city) {
  const geoParams = new URLSearchParams({
    name: city,
    count: "1",
    language: "en",
    format: "json",
  });
  const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${geoParams}`);
  const geoData = await geoResponse.json();
  const location = geoData.results?.[0];

  if (!geoResponse.ok || !location) {
    throw new Error("Unable to find weather location.");
  }

  const weatherParams = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m",
    timezone: "auto",
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${weatherParams}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.reason || "Unable to fetch weather.");
  }

  const code = data.current.weather_code;
  const [condition, icon] = WEATHER_CODES[code] || ["Unavailable", "10d"];

  return {
    date: formatDateFromIso(data.current.time),
    time: formatTimeFromIso(data.current.time),
    condition,
    icon,
    temperature: Math.round(data.current.temperature_2m),
    pressure: `${Math.round(data.current.surface_pressure)} mbar`,
    wind: `${data.current.wind_speed_10m} km/h`,
    humidity: `${data.current.relative_humidity_2m}%`,
  };
}

export async function fetchCurrentWeather(city = DEFAULT_CITY) {
  if (!WEATHER_API_KEY) {
    return fetchOpenMeteoWeather(city);
  }

  const params = new URLSearchParams({
    q: city,
    units: "metric",
    appid: WEATHER_API_KEY,
  });

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch weather.");
  }

  return {
    date: formatWeatherDate(data.dt),
    time: formatWeatherTime(data.dt),
    condition: data.weather?.[0]?.description || "Unavailable",
    icon: data.weather?.[0]?.icon || "10d",
    temperature: Math.round(data.main.temp),
    pressure: `${data.main.pressure} mbar`,
    wind: `${data.wind.speed} km/h`,
    humidity: `${data.main.humidity}%`,
  };
}

export function getWeatherIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
