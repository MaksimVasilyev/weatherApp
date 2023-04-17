import React, { useState, useEffect, useRef } from "react";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

function Detailed(props) {
  

  const [isCelsius, setIsCelsius] = useState(true); // State to keep track of temperature unit
  const [chartType, setChartType] = useState("temp");

  const temperatureFormatter = (value, context) => {
    switch (chartType) {
      case "temp":
        return `${isCelsius ? value : Math.round((value * 9) / 5 + 32)}°${isCelsius ? "C" : "F"}`;
      case "humidity":
        return `${value}%`;
      case "precipprob":
        return `${value}%`;
      default:
        return value;
    }
  };
 
  function TemperatureChart() {
    
    const data = {
      labels: props.weatherData.days[props.dayDetailed].hours
        .filter((hour, index) => index % 3 === 0)
        .map((hour) => hour.datetime),
      datasets: [
        {
          data: props.weatherData.days[props.dayDetailed].hours
            .filter((hour, index) => index % 3 === 0)
            .map((hour) => hour[chartType]),
        },
      ],
    };
    
    const options = {
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          display: true,
          color: "black",
          align: "top",
          formatter: temperatureFormatter,
          font: {
            size: 12 // set font size for values
          }
        },
      },
      layout: { // set padding for canvas
        padding: {
          top: 20,
          
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          display: false, // Hide the y-axis
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      borderColor: "orange",
    };
    
  
    return (
      <div  style={{ padding: '20px' }}>
        <Line data={data} options={options} />
      </div>
    );
  }


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

  const city = props.weatherData.resolvedAddress.split(",")[0];
  const date = new Date(props.weatherData.days[props.dayDetailed].datetime);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const imgNumber = getWeatherIcon(props.weatherData.days[props.dayDetailed].icon);

  
  const handleClickC = () => {
   if (!isCelsius)  setIsCelsius(true); 
  };
  const handleClickF = () => {
    if (isCelsius)  setIsCelsius(false); 
   };

   const celsiusStyle = !isCelsius ? { color: "blue" } : {};
  const fahrenheitStyle = isCelsius ? { color: "blue" } : {};
  
  return (
    <div style={{  width: "55%",  margin: "auto", marginTop: "15px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>
      <p style={{fontSize: '22px', marginBottom: 0}}>{city}</p>
      <p style={{marginBottom: 0, marginTop: 5}}>{dayOfWeek}</p>
      <p style={{marginBottom: 0, marginTop: 5}}>{props.weatherData.days[props.dayDetailed].conditions}</p>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
      <img src={`https://openweathermap.org/img/wn/${imgNumber}@2x.png`} />
      <h1 style={{fontSize: '40px'}}>
        {isCelsius
          ? Math.round(props.weatherData.days[props.dayDetailed].temp) + "°C"
          : Math.round(
              (props.weatherData.days[props.dayDetailed].temp * 9) / 5 + 32
            ) + "°F"}
      </h1>
        <p style={{marginLeft: 5 }}><span style={celsiusStyle} onClick={handleClickC}>°C</span>|<span style={fahrenheitStyle} onClick={handleClickF}>°F</span></p>
      </div>
      </div>
      <div>
         <p>Prob. of precipitation: {props.weatherData.days[props.dayDetailed].precipprob}%</p>
         <p>Humidity: {props.weatherData.days[props.dayDetailed].precipprob}%</p>
         <p>Wind: {props.weatherData.days[props.dayDetailed].windspeed}m/s</p>
        <button style={{backgroundColor: chartType === "temp" ? "gray" : ""}} onClick={()=>setChartType("temp")}>Temperature</button>
        <button style={{backgroundColor: chartType === "humidity" ? "gray" : ""}} onClick={()=>setChartType("humidity")}>Humidity</button>
        <button style={{backgroundColor: chartType === "precipprob" ? "gray" : ""}} onClick={()=>setChartType("precipprob")}>Prob. of precipitation</button>
      </div>
      </div>
      <TemperatureChart />
    </div>
  );
}

export default Detailed;



