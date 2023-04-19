import React from "react";

function Footer() {
    const year = new Date().getFullYear();
    return (
      <footer style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
        <p>Vasilev Maksim {year}</p>
      </footer>
    );
  }

export default Footer;