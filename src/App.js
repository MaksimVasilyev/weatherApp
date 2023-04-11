import React, { useState, useEffect } from "react";
import BlockOfDays from './components/BlockOfDays'
import Detailed from './components/Detailed'
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [firstDay, setFirstDay] = useState(0);
  const [detailedDay, setDetailedDay] = useState(0);

  useEffect(() => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/calgary%2C%20Canada?unitGroup=metric&key=${process.env.REACT_APP_API_KEY}&include=obs%2Chours%2Cfcst%2Calerts&elements=datetime%2Ctemp%2Ctempmax%2Ctempmin%2Csunrise%2Csunset%2Cmoonphase%2Cconditions%2Cicon%2Cprecip%2Cprecipprob%2Chumidity%2Cwindspeed&aggregateHours=24&days=15`;

    fetch(url)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.log(error));
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  
  function onClickRight() {
    setFirstDay(prevFirstDay => prevFirstDay + 5);
  }
  function onClickLeft() {
    setFirstDay(prevFirstDay => prevFirstDay -5);
  }
  const isLastPage = firstDay + 5 >= 15;
  const isFirstPage = firstDay   <= 4;
  return (
    <>
    <IconButton onClick={onClickLeft}   style ={{left: "250px", top: "220px"}}  aria-label="back" disabled={isFirstPage}>
      <ArrowBackIosIcon />
    </IconButton>
    <IconButton onClick={onClickRight} style ={{left: "780px", top: "220px"}}  aria-label="back" disabled={isLastPage}>
      <ArrowForwardIosIcon />
    </IconButton>
      <BlockOfDays
        weatherData={weatherData}
        firstDay={firstDay}
      />
      <Detailed
        weatherData={weatherData}
        dayDetailed={detailedDay}
      />
    </>
  );
}

export default App;