import React, { useState, useEffect } from "react";
import BlockOfDays from './components/BlockOfDays'
import Detailed from './components/Detailed'
import Footer from './components/Footer';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [firstDay, setFirstDay] = useState(0);
  const [detailedDay, setDetailedDay] = useState(0);
  const [city, setCity] = useState("calgary");
  const [country, setCountry] = useState("Canada");

  useEffect(() => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}%2C%20${country}?unitGroup=metric&key=${process.env.REACT_APP_API_KEY}&include=obs%2Chours%2Cfcst%2Calerts&elements=datetime%2Ctemp%2Ctempmax%2Ctempmin%2Csunrise%2Csunset%2Cmoonphase%2Cconditions%2Cicon%2Cprecip%2Cprecipprob%2Chumidity%2Cwindspeed&aggregateHours=24&days=15`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
        throw new Error(response.statusText);
        }
        return response.json();
        })
      .then(data => setWeatherData(data))
      .catch(error => {
        console.log(error);
        alert("Invalid city/country");
      });
  }, [city, country]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  function updateDetailedDay(index) {
   setDetailedDay(index);
  }
  
  function onClickRight() {
    setFirstDay(prevFirstDay => prevFirstDay + 5);
  }
  function onClickLeft() {
    setFirstDay(prevFirstDay => prevFirstDay -5);
  }
  const isLastPage = firstDay + 5 >= 15;
  const isFirstPage = firstDay   <= 4;
  
  function handleSubmit(event) {
    event.preventDefault();
    setCity(event.target.elements.city.value);
    setCountry(event.target.elements.country.value);
    event.target.elements.city.value = "";
    event.target.elements.country.value = "";
  }
  
  
  return (
    <>
    <IconButton onClick={onClickLeft}   style ={{position: 'absolute', left: "25%", top: "22%", color: "white"}}  aria-label="back" disabled={isFirstPage}>
      <ArrowBackIosIcon />
    </IconButton>
    <IconButton onClick={onClickRight} style ={{position: 'absolute', left: "72%", top: "22%", color: "white"}}  aria-label="back" disabled={isLastPage}>
      <ArrowForwardIosIcon />
    </IconButton>
    <form style={{ display: "flex", justifyContent: "center", marginTop: "20px", margin: "10px",  }} onSubmit={handleSubmit}>
    <input
  type="text"
  name="city"
  placeholder ="City"
  style={{
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
    borderRadius: "5px",
    padding: "8px",
    marginRight: "10px"
  }}
  className="my-input"
/>
<input
  type="text"
  name="country"
  placeholder ="Country"
  style={{
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
    borderRadius: "5px",
    padding: "8px",
    marginRight: "10px"
  }}
  className="my-input"
/>

  <button style={{ marginTop: 1, backgroundColor: 'transparent', borderRadius: 5, color: 'white', border: '1px solid white' }} type="submit">Submit</button>
</form>
      <BlockOfDays
        weatherData={weatherData}
        firstDay={firstDay}
        onDayClick={updateDetailedDay}
        detailedDay={detailedDay}
      />
      {detailedDay !== null && (
        <Detailed
          weatherData={weatherData}
          dayDetailed={detailedDay}
        />
      )}
     <Footer />
    </>
  );
}

export default App;