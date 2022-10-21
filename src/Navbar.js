import React, { useState, useEffect } from "react";
import netflixLogo from "./netflixLogo.png";
import "./Navbar.css";


function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
   
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`navbar ${show && "navbar__black"}`}>
  <div>

    <div className={'logo_name'}>Alistair's</div> 
     <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix"
        className="Navbar__logo"
        />
        </div>
      <img src={netflixLogo} className="Navbar__avatar" alt="profile image" />
    </div>
  );
}

export default Navbar;
