import React, { useState, useEffect } from "react";
import "./GameGallery.css";
import {
  loadGameImagesFromFolder,
  preloadAllGameImages,
} from "../utils/imageLoader";

const GameGallery = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameImages, setGameImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState({});

  // Game configuration with icons and folder names
  const games = [
    {
      id: "AssettoCorsa",
      name: "Assetto Corsa",
      icon: "https://cdn2.steamgriddb.com/icon_thumb/97208e4cb6de9c04b325c2185316439f.png",
      folder: "AssettoCorsa",
    },
    {
      id: "Cyberpunk",
      name: "Cyberpunk 2077",
      icon: "https://i.redd.it/jku1fnv5f7461.png",
      folder: "Cyberpunk",
    },
    {
      id: "Minecraft",
      name: "Minecraft",
      icon: "https://www.rw-designer.com/icon-image/5547-256x256x32.png",
      folder: "Minecraft",
    },
    {
      id: "FFXV",
      name: "Final Fantasy XV",
      icon: "https://cdn2.steamgriddb.com/icon_thumb/599430bd25e315dd79020a112a1593da.png",
      folder: "FFXV",
    },
  ];

  // Preload all images on component mount
  useEffect(() => {
    const preloaded = preloadAllGameImages();
    setPreloadedImages(preloaded);
  }, []);

  // Function to load images from a specific game folder
  const loadGameImages = async (gameFolder) => {
    try {
      // First try to use preloaded images
      if (
        preloadedImages[gameFolder] &&
        preloadedImages[gameFolder].length > 0
      ) {
        setGameImages(preloadedImages[gameFolder]);
        return;
      }

      // Fallback to dynamic loading
      const images = await loadGameImagesFromFolder(gameFolder);
      setGameImages(images);
    } catch (error) {
      console.error("Error loading game images:", error);
      setGameImages([]);
    }
  };

  const openGamePopup = (game) => {
    setSelectedGame(game);
    setCurrentImageIndex(0);
    loadGameImages(game.folder);
  };

  const closePopup = () => {
    setSelectedGame(null);
    setGameImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === gameImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? gameImages.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Close popup on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    if (selectedGame) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedGame]);

  return (
    <div className="game-gallery">
      <div className="games-grid">
        {games.map((game) => (
          <div
            key={game.id}
            className="game-card"
            onClick={() => openGamePopup(game)}
          >
            <div className="game-icon">
              <img
                src={game.icon}
                alt={`${game.name} icon`}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/128x128/333333/ffffff?text=?";
                }}
              />
            </div>
            <h3 className="game-title">{game.name}</h3>
          </div>
        ))}
      </div>

      {/* Image Popup Modal */}
      {selectedGame && (
        <div className="image-popup-overlay" onClick={closePopup}>
          <div
            className="image-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-header">
              <h2>{selectedGame.name}</h2>
              <button className="close-button" onClick={closePopup}>
                ×
              </button>
            </div>

            <div className="main-image-container">
              <button className="nav-button prev" onClick={prevImage}>
                ‹
              </button>

              <div className="main-image">
                {gameImages.length > 0 && (
                  <img
                    src={gameImages[currentImageIndex]?.src}
                    alt={gameImages[currentImageIndex]?.alt}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/800x600/333333/ffffff?text=Image+Not+Found";
                    }}
                  />
                )}
              </div>

              <button className="nav-button next" onClick={nextImage}>
                ›
              </button>
            </div>

            {gameImages.length > 1 && (
              <div className="thumbnail-grid">
                {gameImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`thumbnail ${
                      index === currentImageIndex ? "active" : ""
                    }`}
                    onClick={() => goToImage(index)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100x75/333333/ffffff?text=?";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="image-counter">
              {currentImageIndex + 1} / {gameImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameGallery;
