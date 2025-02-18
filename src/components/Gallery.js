import React, { useState } from "react";
import "./Gallery.css"; // Make sure to create this CSS file

const images = [
  {
    id: 1,
    src: "https://via.placeholder.com/300",
    title: "Project One",
    description: "This is a description of Project One.",
    link: "https://example.com/project-one",
  },
  {
    id: 2,
    src: "https://via.placeholder.com/300",
    title: "Project Two",
    description: "This is a description of Project Two.",
    link: "https://example.com/project-two",
  },
  {
    id: 3,
    src: "https://via.placeholder.com/300",
    title: "Project Three",
    description: "This is a description of Project Three.",
    link: "https://example.com/project-three",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="gallery-container">
      {images.map((image) => (
        <div
          key={image.id}
          className="gallery-item"
          onMouseEnter={() => setSelectedImage(image)}
          onMouseLeave={() => setSelectedImage(null)}
          onClick={() => window.open(image.link, "_blank")}
        >
          <img src={image.src} alt={image.title} className="gallery-image" />
          {selectedImage === image && (
            <div className="gallery-card">
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
