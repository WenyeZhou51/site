import React, { useState } from 'react';
import './Creations.css';

function Creations() {
  // State for managing which image is currently selected in galleries
  const [activeImageIndex, setActiveImageIndex] = useState({});

  // Helper function to set active image for a specific gallery
  const setActiveImage = (galleryId, index) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [galleryId]: index
    }));
  };

  // Art project data organized by folders
  const artProjects = [
    {
      id: "journal-comic",
      title: "Journal Comic",
      description: "Journal comic, 2024",
      type: "pdf",
      pdfPath: "/Asset/Random Art/Journal Comic/Tim_Book_cut.pdf",
    },
    {
      id: "tarot-cards",
      title: "Tarot Card Drawings",
      description: "Tarot Cards, 2025",
      type: "gallery",
      images: [
        {
          path: "/Asset/Random Art/Tarot Drawings/Strength.png",
          title: "Strength"
        },
        {
          path: "/Asset/Random Art/Tarot Drawings/Chariot.png",
          title: "Chariot"
        },
        {
          path: "/Asset/Random Art/Tarot Drawings/Wheel.png",
          title: "Wheel of Fortune"
        },
        {
          path: "/Asset/Random Art/Tarot Drawings/Hermit.png",
          title: "Hermit"
        }
      ]
    },
    {
      id: "posters",
      title: "Posters",
      description: "Soft Rain Poster",
      type: "image",
      imagePath: "/Asset/Random Art/Posters/Soft.png",
      imageTitle: "Soft Rains"
    }
  ];

  // Render different content based on type (pdf, image, or gallery)
  const renderContent = (project) => {
    switch (project.type) {
      case 'pdf':
        return (
          <div className="art-pdf-container">
            <div className="pdf-preview">
              <object 
                data={process.env.PUBLIC_URL + project.pdfPath + '#page=1'} 
                type="application/pdf"
                className="pdf-object"
              >
                <div className="pdf-fallback">
                  <p>PDF preview not available</p>
                </div>
              </object>
            </div>
            <div className="art-actions">
              <a 
                href={process.env.PUBLIC_URL + project.pdfPath} 
                target="_blank" 
                rel="noopener noreferrer"
                className="paper-btn btn-primary"
              >
                View PDF
              </a>
              <a 
                href={process.env.PUBLIC_URL + project.pdfPath} 
                download
                className="paper-btn btn-secondary"
              >
                Download
              </a>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="art-image-container">
            <img 
              src={process.env.PUBLIC_URL + project.imagePath} 
              alt={project.imageTitle} 
              className="art-single-image"
            />
            <div className="image-caption">{project.imageTitle}</div>
          </div>
        );
      
      case 'gallery':
        // Get current active image index or default to 0
        const currentIndex = activeImageIndex[project.id] || 0;
        
        return (
          <div className="art-gallery-container">
            <div className="gallery-main-image">
              <img 
                src={process.env.PUBLIC_URL + project.images[currentIndex].path} 
                alt={project.images[currentIndex].title}
                className="gallery-featured-image" 
              />
              <div className="image-caption">{project.images[currentIndex].title}</div>
            </div>
            
            <div className="gallery-thumbnails">
              {project.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`gallery-thumbnail ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setActiveImage(project.id, index)}
                >
                  <img 
                    src={process.env.PUBLIC_URL + image.path} 
                    alt={image.title}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return <p>Content not available</p>;
    }
  };

  return (
    <div className="about-canvas">
      <div className="about-content">
        <h2 className="about-title">Random Art</h2>
        <p className="art-intro">
          Explore my collection of artistic creations across different mediums and styles. Each project represents a unique exploration of visual storytelling.
        </p>
        
        <div className="art-projects">
          {artProjects.map((project) => (
            <div key={project.id} className="art-project-card">
              <h3 className="art-project-title">{project.title}</h3>
              <p className="art-project-description">{project.description}</p>
              
              <div className="art-project-content">
                {renderContent(project)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Creations;
