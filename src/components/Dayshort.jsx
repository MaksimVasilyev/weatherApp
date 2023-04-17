import React from "react";


function Dayshort(props) {

  function handleClick() {
    props.onDayClick(props.index);
    console.log(props.detailedDay, props.index);
  }

  const frameStyle = props.index === props.detailedDay ? { border: "2px solid black" } : {};     
    return (
    <div onClick={handleClick} style={{ alignItems: "center",  ...frameStyle}} >
    <p style={{ marginBottom: 0, textAlign: "center" }}>{props.day}</p>
    
    <img style={{ marginBottom: 0,  marginTop: 0 }} src={props.img} alt="Weather icon" />
    
    <p style={{ marginTop: 0, textAlign: "center" }}>{props.temp}</p>
  </div>
    )
}


export default Dayshort;
