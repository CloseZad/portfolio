import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A full-stack web application built with React and Node.js. Features real-time data processing and modern UI/UX design.",
    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
    githubUrl: "https://github.com/closezad/project-alpha",
    liveUrl: "https://project-alpha-demo.com",
    technologies: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Mobile Game Engine",
    description: "Custom game engine developed for mobile platforms with advanced physics simulation and cross-platform compatibility.",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
    githubUrl: "https://github.com/closezad/mobile-game-engine",
    liveUrl: null,
    technologies: ["C++", "OpenGL", "Android SDK"]
  },
  {
    id: 3,
    title: "AI Data Analyzer",
    description: "Machine learning application that processes large datasets and provides intelligent insights through interactive visualizations.",
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
    githubUrl: "https://github.com/closezad/ai-data-analyzer",
    liveUrl: "https://ai-analyzer-demo.com",
    technologies: ["Python", "TensorFlow", "React"]
  },
  {
    id: 4,
    title: "Robotics Control System",
    description: "Advanced control system for autonomous robots with real-time path planning and obstacle avoidance capabilities.",
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
    githubUrl: "https://github.com/closezad/robotics-control",
    liveUrl: null,
    technologies: ["ROS", "C++", "Python"]
  },
  {
    id: 5,
    title: "Cloud Infrastructure Tool",
    description: "DevOps automation tool for managing cloud infrastructure with monitoring, scaling, and deployment capabilities.",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    githubUrl: "https://github.com/closezad/cloud-infra-tool",
    liveUrl: "https://cloud-tool-demo.com",
    technologies: ["Docker", "Kubernetes", "AWS"]
  }
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
    setCurrentIndex(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
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
                  <span key={index} className="tech-tag">{tech}</span>
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

            <p className="carousel-description">
              {currentProject.description}
            </p>

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
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
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
              width: `${((currentIndex + 1) / projects.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}