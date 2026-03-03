import { useState, useEffect } from "react";
import weatherService from "../services/WeatherService";

const CountryShowcase = ({ country, shown }) => {
  const [weather, setWeather] = useState(null);
  const [latitude, longitude] = country.capitalInfo.latlng;

  useEffect(() => {
    weatherService
      .get(latitude, longitude)
      .then((weather) => setWeather(weather));
  }, [latitude, longitude]);

  if (!shown) return null;
  return (
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      <div>{`Capital ${country.capital[0]}`}</div>
      <div>{`Area ${country.area}`}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`}></img>
      {weather === null ? (
        <div>Loading weather...</div>
      ) : (
        <>
          <h2>{`Weather in ${country.capital[0]}`}</h2>
          <div>{`Temperature ${weather.main.temp} Celsius`}</div>
          <img
            src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}
            alt={`Weather in ${country.capital[0]}: ${weather.weather[0].description}`}
          ></img>
          <div>{`Wind ${weather.wind.speed} m/s`}</div>
        </>
      )}
    </div>
  );
};

export default CountryShowcase;
