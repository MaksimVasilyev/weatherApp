import React from "react";


function Dayshort(props) {
    return (
  <div style={{ alignItems: "center" }} >
    <p style={{ marginBottom: 0, textAlign: "center" }}>{props.day}</p>
    
    <img style={{ marginBottom: 0,  marginTop: 0 }} src={props.img} alt="Weather icon" />
    
    <p style={{ marginTop: 0, textAlign: "center" }}>{props.temp}</p>
  </div>
    )
}

export default Dayshort;
