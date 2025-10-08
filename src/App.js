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
import GameGallery from "./components/GameGallery";
import "./components/ProjectsCarousel.css";
import "./components/GameGallery.css";
import resume from "./Updated.pdf";
import resume2 from "./UpdatedHW.pdf";

function App() {
  const [page, setPage] = useState("splash");
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionAnswer, setQuestionAnswer] = useState("");
  // Change this to the correct date in YYYY-MM-DD format
  const SECRET_DATE = "2025-07-22";

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

      if (answer === "Mio") {
        setPage("Mio");
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
            <div className="resume-buttons">
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-button"
                style={{ padding: "0 15px" }} // Add horizontal padding
              >
                Software Resume
              </a>
              <a
                href={resume2}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-button"
                style={{ padding: "0 15px" }} // Add horizontal padding
              >
                Hardware Resume
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
            <p style={{ marginBottom: "40px" }}>
              Explore my gaming experiences and screenshots from various games
              I've played. Click on any game icon to view a collection of
              screenshots and moments.
            </p>
            <GameGallery />
          </div>
        </div>
      </GradientBackground>
    );
  }

  function SecretComponent() {
    return (
      <GradientBackground>
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
        <div
          className="secret-content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
            padding: "20px",
            color: "white",
          }}
        >
          <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>hi baby </h1>
          <p style={{ fontSize: "1.5rem", marginBottom: "30px" }}>
            glad u found dis
          </p>
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
            </div>
          </>
        ) : (
          <div className="navbar-content">
            <a href="#welcome">Welcome</a>
            <a href="#work">Work Experience</a>
            <a href="#projects">Projects</a>
            <a href="#GameGallery">Game Gallery</a>
          </div>
        )}
      </nav>
    );
  }

  return (
    <>
      {page === "splash" && renderSplash()}
      {page === "" && renderPage()}
      {page === "secret" && <SecretComponent />}
      {page !== "" && page !== "splash" && page !== "secret" && (
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
              marginBottom: "10px",
              display: "block",
            }}
          >
            ← Back to Portfolio
          </button>

          <button
            onClick={() => setShowQuestion(!showQuestion)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              padding: "5px 10px",
              borderRadius: "4px",
              marginBottom: showQuestion ? "10px" : "0",
            }}
          >
            {showQuestion ? "Hide Secret Question" : "Show Secret Question"}
          </button>

          {showQuestion && (
            <div style={{ marginTop: "10px" }}>
              <p
                style={{
                  color: "white",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                When was our first date
              </p>
              <input
                type="date"
                value={questionAnswer}
                onChange={(e) => setQuestionAnswer(e.target.value)}
                placeholder="YYYY-MM-DD"
                style={{
                  padding: "5px 8px",
                  borderRadius: "4px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  fontSize: "14px",
                  width: "150px",
                  marginRight: "8px",
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (questionAnswer === SECRET_DATE) {
                      setPage("secret");
                      setShowQuestion(false);
                      setQuestionAnswer("");
                    } else {
                      alert("Incorrect date!");
                      setQuestionAnswer("");
                    }
                  }
                }}
              />
              <button
                onClick={() => {
                  if (questionAnswer === SECRET_DATE) {
                    setPage("secret");
                    setShowQuestion(false);
                    setQuestionAnswer("");
                  } else {
                    alert("You're not her???");
                    setQuestionAnswer("");
                  }
                }}
                style={{
                  background: "rgba(0,255,0,0.2)",
                  border: "1px solid rgba(0,255,0,0.5)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "12px",
                  padding: "5px 8px",
                  borderRadius: "4px",
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
