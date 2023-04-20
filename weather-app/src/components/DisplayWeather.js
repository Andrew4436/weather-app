import React, { useEffect, useRef, useState } from "react";
import "../weatherStyles.css";
import { API_KEY } from "../api_key";

function DisplayWeather() {
  const cityNameRef = useRef()
  const [weatherInfo, setWeatherInfo] = useState("");
  const [imgLink, setImgLink] = useState("");

  useEffect(() => {
    if (weatherInfo) {
      const newIcon = weatherInfo.weather[0].icon.replace("n", "d");
      const link = `http://openweathermap.org/img/wn/${newIcon}@4x.png`;
      setImgLink(link);
    }
  });

  async function sendReq() {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityNameRef.current.value}&appid=${API_KEY}`
    );
    if (res.ok) {
      const jsonData = await res.json();
      setWeatherInfo(jsonData);
    } else {
      console.log("error: " + res.status);
    }
  }

  function sunriseTime () {
    const timeStamp = weatherInfo.sys.sunrise
    const date = new Date(timeStamp * 1000)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if(hours > 12) {
      hours = hours - 12;
    }
    if(hours < 10) {
      hours = '0' + hours;
    }
    if(minutes < 10) {
      minutes = '0' + minutes;
    }
    return (`${hours}${minutes ? ':' + minutes : ''}`);
  }
  function sunsetTime () {
    const timeStamp = weatherInfo.sys.sunset
    const date = new Date(timeStamp * 1000)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if(hours > 12) {
      hours = hours - 12;
    }
    if(hours < 10) {
      hours = '0' + hours;
    }
    if(minutes < 10) {
      minutes = '0' + minutes;
    }
    return (`${hours}${minutes ? ':' + minutes : ''}`);
  }

  console.log(weatherInfo);
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="weather-grand-container">
        {weatherInfo ? (
          <div className="weather-container">
            <h1 className="weather-info place">
              {weatherInfo.name}, {weatherInfo.sys.country}
            </h1>
            <img className="weather-img" src={imgLink} />
            <h3 className="weather-info weather-description">
              {weatherInfo.weather[0].description}
            </h3>
            <h2 className="weather-info temp">
              {Math.round(weatherInfo.main.temp - 273.15) + "°C"}
            </h2>
            <div className="more-info">
              {/* <h3 style={{ fontSize: '20px', color: 'white', fontWeight: 200 }}>More info</h3> */}
              <div className="more-info-container">
                <p className="more-weather-info">{`humidity: ${weatherInfo.main.humidity}%`}</p>
                <p className="more-weather-info">{`wind speed: ${weatherInfo.wind.speed} km/hr`}</p>
                <p className="more-weather-info">{`wind direction: ${weatherInfo.wind.deg}°deg`}</p>
                <p className="more-weather-info">{`pressure: ${weatherInfo.main.pressure} hPa`}</p>
                <p className="more-weather-info">{`sunrise: ${sunriseTime()}am`}</p>
                <p className="more-weather-info">{`sunset: ${sunsetTime()}pm`}</p>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} >
            <h1 style={{ color: 'white', position: 'relative', top: '-100px' }}>Check Weather of Any city or region</h1>
            <div>
              <input
                className="cityInput"
                type="text"
                placeholder="city or region name"
                ref={cityNameRef}
              />
              <button onClick={sendReq} className="btn">See Weather</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayWeather;
