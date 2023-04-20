import React from "react";

const Dayshort = ({ index, onDayClick, detailedDay, day, img, temp }) => {
  const handleClick = () => {
    onDayClick(index);
    console.log(detailedDay, index);
  };

  const frameStyle = index === detailedDay ? {
    border: "1px solid white",
    borderRadius: "15px",
    borderColor: "white",
  } : {};

  return (
    <div onClick={handleClick} style={{ alignItems: "center", ...frameStyle }}>
      <p style={{ marginBottom: 0, textAlign: "center" }}>{day}</p>
      <img style={{ marginBottom: 0, marginTop: 0 }} src={img} alt="Weather icon" />
      <p style={{ marginTop: 0, textAlign: "center" }}>{temp}</p>
    </div>
  );
};

export default Dayshort;