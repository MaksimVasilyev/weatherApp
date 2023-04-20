import React from "react";
import Dayshort from './Dayshort';

const BlockOfDays = ({ weatherData, firstDay, onDayClick, detailedDay }) => {
  const getWeatherIcon = (condition) => {
    const icons = {
      "clear-day": "01d",
      "clear-night": "01n",
      "partly-cloudy-day": "02d",
      "partly-cloudy-night": "02n",
      "cloudy": "03d",
      "rain": "10d",
      "snow": "13d",
      "thunderstorm": "11d",
      "wind": "50d",
      "fog": "50d"
    };
    return icons[condition] || "unknown.png";
  };

  const handleDayClick = (index) => {
    onDayClick(index);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "70px" }}>
      {weatherData &&
        weatherData.days.slice(firstDay, firstDay + 5).map(({ datetime, icon, tempmin, tempmax }, index) => (
          <Dayshort
            index={index + firstDay}
            key={index}
            day={`${datetime.split("-")[2]}.${datetime.split("-")[1]}`}
            img={`https://openweathermap.org/img/wn/${getWeatherIcon(icon)}@2x.png`}
            temp={<span>{Math.round(tempmin)}&nbsp;&nbsp;&nbsp;{Math.round(tempmax)}</span>}
            style={{ marginRight: index === weatherData.days.length - 1 ? 0 : "15px" }}
            onDayClick={handleDayClick}
            detailedDay={detailedDay}
          />
        ))}
    </div>
  );
};

export default BlockOfDays;