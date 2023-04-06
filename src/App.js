import React, { useState, useEffect } from "react";
import BlockOfDays from './components/BlockOfDays'
import Detailed from './components/Detailed'



function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [firstDay, setFirstDay] = useState(0);
  const [detailedDay, setDetailedDay] = useState(0);

  useEffect(() => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/calgary%2C%20Canada?unitGroup=metric&key=VQ76ZQP5TD2GZEC47H54ZV3DB&include=obs%2Chours%2Cfcst%2Calerts&elements=datetime%2Ctemp%2Ctempmax%2Ctempmin%2Csunrise%2Csunset%2Cmoonphase%2Cconditions%2Cicon&aggregateHours=24&days=15`;

    fetch(url)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.log(error));
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <>
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