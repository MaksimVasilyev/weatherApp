import React from "react";
import Dayshort from './Dayshort'



function BlockOfDays(props) {

  function getWeatherIcon(condition) {
    switch (condition) {
      case "clear-day":
        return "01d";
      case "clear-night":
        return "01n";
      case "partly-cloudy-day":
        return "02d";
        case "partly-cloudy-night":
        return "02n";
      case "cloudy":
        return "03d";
      case "rain":
        return "10d";
      case "snow":
        return "13d";
      case "thunderstorm":
        return "11d";
      case "wind":
        return "50d";
      case "fog":
      return "50d";
      default:
        return "unknown.png";

    }
  }

  function handleDayClick(index) {
    props.onDayClick(index);
  }
  
  
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      {props.weatherData &&
        props.weatherData.days.slice(props.firstDay, props.firstDay+5).map((day, index) => (
          <Dayshort
            index={index+props.firstDay}
            key={index}
            day={`${day.datetime.split("-")[2]}.${day.datetime.split("-")[1]}`}
            img={`https://openweathermap.org/img/wn/${getWeatherIcon(day.icon)}@2x.png`}
            temp={
             <span>
             {Math.round(day.tempmin)}&nbsp;&nbsp;&nbsp;{Math.round(day.tempmax)}
             </span>
                 }
            style={{ marginRight: index === props.weatherData.days.length - 1 ? 0 : "15px" }}
            onDayClick={handleDayClick}
            detailedDay={props.detailedDay}
          />
        ))}
    </div>
  )
}

export default BlockOfDays;