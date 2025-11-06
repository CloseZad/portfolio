import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const projects = [
  {
    id: 1,
    title: "PickUpTracker",
    description:
      "Pickup Tracker is a mobile-first web app that makes managing pickup games effortless — add teams, track who’s in play, and rotate matches automatically with “winner-stays-on” mode. Built with React, Tailwind, and Express for fast, seamless game management anywhere. Note: if server is not running, contact me to try it out.",
    image:
      "https://github.com/CloseZad/pickupTracker/blob/main/PickupTracker.jpeg?raw=true",
    githubUrl: "https://github.com/CloseZad/pickupTracker",
    liveUrl: "https://closezad.github.io/pickupTracker/",
    technologies: ["React", "Tailwind", "Express"],
  },
  {
    id: 2,
    title: "TopSpeedTracker",
    description:
      "A small app (that you can use for youself) for Assetto Corsa (racing simulator software) that tracks speed in-engine as well as your session's top speed achieved. Supports switching between imperial and metric units.",
    image: "/Screenshot 2025-06-30 at 1.03.43 AM.png",
    githubUrl: "https://github.com/CloseZad/TopSpeedTracker",
    liveUrl: "https://youtu.be/hLxgE1tyIVA",
    technologies: ["Python", "Assetto Corsa", "Numpy"],
  },
  {
    id: 3,
    title: "Tales of Nuiryn",
    description:
      "In June 2020, my friends and I entered a game jam (game hackathon) hosted by the University of Waterloo's Games Institute. I was one of the lead developers on our team where we somehow won an award. Personally, I think making an RPG for a game jam is a terrible idea.",
    image:
      "https://github.com/CloseZad/oldPortfolio/blob/main/src/images/Winner.jpg?raw=true",
    githubUrl: "https://github.com/CloseZad/GameJam2020-WON-AWARD-",
    liveUrl: null,
    technologies: ["C#", "Unity3D", "Java"],
  },
  {
    id: 4,
    title: "Disgraph (Hack the North 2020 Submission)",
    description:
      "Wrote script functions for a discord bot that generates graphs from user input data based on graph style choice and details.",
    image:
      "https://github.com/CloseZad/oldPortfolio/blob/main/src/images/DisGraph.png?raw=true",
    githubUrl: "https://github.com/brandonnly/HTN-2020",
    liveUrl: "https://devpost.com/software/disgraph",
    technologies: ["Python", "Matplotlib", "Discord API"],
  },
  {
    id: 5,
    title: "chAD (EngHacks 2021 Submission)",
    description:
      "Designed social media monetization system via a discord bot that generates custom ads based on wishes of the server's owner. Curated for businesses looking to market in new spaces, and server owners looking to make ad-revenue.",
    image: "https://tyseer2335.github.io/chAD-Bot/images/logo.png",
    githubUrl: "https://github.com/joonsauce/EngHack2021",
    liveUrl:
      "https://devpost.com/software/chad-the-ad-bot-for-discord-servers?ref_content=my-projects-tab&ref_feature=my_projects",
    technologies: ["Python", "Discord API", "Python"],
  },
];

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {/* Navigation Arrows */}
        <button
          className="carousel-nav carousel-nav-left"
          onClick={goToPrevious}
          aria-label="Previous project"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button
          className="carousel-nav carousel-nav-right"
          onClick={goToNext}
          aria-label="Next project"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        {/* Main Content */}
        <div className="carousel-content">
          <div className="carousel-image-container">
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="carousel-image"
            />
            <div className="carousel-overlay">
              <div className="carousel-tech-stack">
                {currentProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="carousel-info">
            <div className="carousel-header">
              <h3 className="carousel-title">
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="title-link"
                >
                  {currentProject.title}
                  <FontAwesomeIcon icon={faGithub} className="github-icon" />
                </a>
              </h3>
            </div>

            <p className="carousel-description">{currentProject.description}</p>

            <div className="carousel-links">
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link github-link"
              >
                <FontAwesomeIcon icon={faGithub} />
                View Code
              </a>
              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link live-link"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="carousel-dots">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="carousel-progress">
          <div
            className="carousel-progress-bar"
            style={{
              width: `${((currentIndex + 1) / projects.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
