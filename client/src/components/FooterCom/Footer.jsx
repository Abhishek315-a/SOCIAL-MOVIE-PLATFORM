import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="main-container">
      <h2>
        MOVIE<span>Flix</span>
      </h2>
      <div className="container-box">
        <div className="first-div">
          <Link to="/">Home</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link>Terms of Services</Link>
          <Link to="/about-us">About Us</Link>
        </div>
        <div className="second-div">
          <Link>Live</Link>
          <Link>FAQs Us</Link>
          <Link>Premium</Link>
          <Link>Privacy Poilcy</Link>
        </div>
        <div className="third-div">
          <Link>You must watch</Link>
          <Link>Recent release</Link>
          <Link>Top IMDB</Link>
        </div>
      </div>
      <footer
        style={{
          textAlign: "center",
          padding: "1rem 0",
          backgroundColor: "black",
          color: "#fff",
        }}
      >
        &copy; 2025 MovieVerse. All rights reserved. | Designed and developed by
        Abhishek Kumar Singh
      </footer>
    </div>
  );
};

export default Footer;
