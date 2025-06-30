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
import { faEnvelope, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import ProjectsCarousel from "./components/ProjectsCarousel";
import "./components/ProjectsCarousel.css";

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

  function renderSplash() {
    const handleClick = (e) => {
      e.preventDefault();
      setPage("");
    };

    const checkPw = (e) => {
      e.preventDefault();
      const answer = document.getElementById("password").value;

      if (answer === "PERSONSPECIFIED") {
        setPage("PERSONSPECIFIED");
      } else {
        setPage("");
      }
    };

    return (
      <GradientBackground>
        <div className="header-wrapper">
          <div className="main-info">
            <button className="enter-button" onClick={handleClick}>
              <h1>Enter Portfolio</h1>
            </button>

            <form onSubmit={checkPw} className="password-form">
              <input
                id="password"
                name="password"
                type="password"
                className="password-input"
                placeholder="Enter special access code"
              />
              <button type="submit" className="password-button">
                Enter with Password
              </button>
            </form>
          </div>
        </div>
      </GradientBackground>
    );
  }

  function renderPage() {
    return (
      <GradientBackground>
        <Navbar />
        <div className="content">
          <div id="welcome" className="section">
            <img
              src="https://lh3.googleusercontent.com/pw/AP1GczNznBJhEmOgbtoMo1RgZJETqZVUiALT79ORzzBbyAHbuEIHj86vkcAcun13FE1bB945j9ASeCmEbiPq8zBq8ieTuhomfc7KJs-Il_5-nvI_H8vJKJXPxtf6GhDO57aLYSzjjCw2SSIs8NQtGbQTGQAQXg=w1168-h1556-s-no-gm?authuser=0"
              alt="Farzad Rahman"
              className="profile-photo"
            />
            <h1>Hi, I'm Farzad</h1>
            <p>
              This site is in no way a representation of myself nor my image,
              but maybe you'd want to work with me after seeing this glorified
              linktree
            </p>
            <div className="social-icons">
              <a
                href="https://github.com/closezad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://linkedin.com/in/farzadrahman"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="mailto:farzadrahman20@gmail.com"
                aria-label="Email Contact"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
              <a
                href="https://instagram.com/closezad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>

          <div id="work" className="section">
            <Timeline />
          </div>

          <div id="projects" className="section">
            <h1>Projects</h1>
            <p style={{ marginBottom: "40px" }}>
              Here are some of the projects I've worked on. Each represents a
              different aspect of my development journey and technical
              expertise.
            </p>
            <ProjectsCarousel />
          </div>

          <div id="GameGallery" className="section">
            <h1>Game Gallery</h1>
            <p>
              Coming soon! I'm porting my game gallery from my previous site.
              This will showcase various games and interactive projects I've
              created.
            </p>
          </div>
        </div>
      </GradientBackground>
    );
  }

  function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

    const closeDropdown = () => {
      setShowDropdown(false);
    };

    // Close dropdown when clicking on a link
    const handleLinkClick = () => {
      if (isMobile) {
        setShowDropdown(false);
      }
    };

    return (
      <nav className="navbar">
        {isMobile ? (
          <>
            <div className="menu-button">
              <span style={{ color: "white", fontWeight: "bold" }}>
                Farzad Rahman
              </span>
              <button
                className="dropbtn"
                onClick={toggleDropdown}
                aria-label="Toggle navigation menu"
              >
                <FontAwesomeIcon icon={showDropdown ? faTimes : faBars} />
                <span>{showDropdown ? "Close" : "Menu"}</span>
              </button>
            </div>
            <div className={`dropdown-content ${showDropdown ? "show" : ""}`}>
              <a href="#welcome" onClick={handleLinkClick}>
                Welcome
              </a>
              <a href="#work" onClick={handleLinkClick}>
                Work Experience
              </a>
              <a href="#projects" onClick={handleLinkClick}>
                Projects
              </a>
              <a href="#GameGallery" onClick={handleLinkClick}>
                Game Gallery
              </a>
              <a
                href="/Updated.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
              >
                Resume
              </a>
            </div>
          </>
        ) : (
          <div className="navbar-content">
            <a href="#welcome">Welcome</a>
            <a href="#work">Work Experience</a>
            <a href="#projects">Projects</a>
            <a href="#GameGallery">Game Gallery</a>
            <a href="/RESUME2025.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </div>
        )}
      </nav>
    );
  }

  return (
    <>
      {page === "splash" && renderSplash()}
      {page === "" && renderPage()}
      {page !== "" && page !== "splash" && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 1001,
            background: "rgba(0,0,0,0.8)",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          <button
            onClick={() => setPage("")}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ← Back to Portfolio
          </button>
        </div>
      )}
    </>
  );
}

export default App;
