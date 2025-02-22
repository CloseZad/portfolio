import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import "./App.css";
import newvid from "./newvid.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";

function App() {
  const [page, setPage] = useState("splash");

  function GradientBackground({ children }) {
    return (
      <div className="background-container">
        {isMobile ? (
          <div className="gradient-background" />
        ) : (
          <video autoPlay loop muted className="background-video">
            <source src={newvid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="content">{children}</div>
      </div>
    );
  }

  // <div className="gradient-background">
  //   {children}
  // </div>

  function renderSplash() {
    const handleClick = (e) => {
      setPage("");
    };

    return (
      <div className="header-wrapper">
        <div className="main-info">
          <button className="enter-button" onClick={handleClick}>
            <h1>Enter</h1>
          </button>

          <form onSubmit={checkPw} className="password-form">
            <input
              id="password"
              name="password"
              type="password"
              className="password-input"
              placeholder="Enter your password"
            />
            <button className="password-button">Enter with a password</button>
          </form>
        </div>
      </div>
    );
  }

  const checkPw = () => {
    // gets the current input value
    const answer = document.getElementById("password").value;

    if (answer === "PERSONSPECIFIED") {
      setPage("PERSONSPECIFIED");
    } else {
      setPage("");
    }
  };

  function renderPage() {
    return (
      <GradientBackground>
        <Navbar />
        <div className="content">
          <div id="welcome" className="section">
            <h1>I'm Farzad</h1>
            <div className="social-icons">
              <a href="https://github.com/closezad" target="_blank">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
              <a href="https://linkedin.com/in/farzadrahman" target="_blank">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a href="mailto:farzadrahman20@gmail.com" target="_blank">
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
              </a>
              <a href="https://instagram.com/closezad" target="_blank">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>

          <div id="work" className="section">
            <Timeline />
          </div>

          <div id="projects" className="section">
            <p>I'll add some projects here soon.</p>
          </div>

          <div id="GameGallery" className="section">
            <p>I'll add the gallery here soon. Porting from my old site</p>
          </div>
        </div>
      </GradientBackground>
    );
  }

  function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
      <nav className="navbar">
        {isMobile ? (
          <>
            <button
              className="dropbtn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              ☰ Menu
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <a href="#welcome">Welcome</a>
                <a href="#work">Work</a>
                <a href="#projects">Projects</a>
                <a href="#GameGallery">GameGallery</a>
                <a href="/RESUME2025.pdf">Resume</a>
              </div>
            )}
          </>
        ) : (
          <div className="navbar-content">
            <a href="#welcome">Welcome</a>
            <a href="#work">Work</a>
            <a href="#projects">Projects</a>
            <a href="#GameGallery">GameGallery</a>
            <a href="/RESUME2025.pdf">Resume</a>
          </div>
        )}
      </nav>
    );
  }

  return (
    <>
      {page === "splash" && renderSplash()}
      {/* {page === "" && GradientBackground()} */}
      {page === "" && renderPage()}

      {page === "" && <h1>status: home</h1> &&
        console.log(isMobile ? "User is on mobile" : "User is on desktop")}

      {page != "" && page != "splash" && (
        <button
          onClick={function () {
            return setPage("");
          }}
        >
          <h1>BACK</h1>
        </button>
      )}
    </>
  );
}

export default App;
