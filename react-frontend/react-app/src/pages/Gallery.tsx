import { useState } from "react";
import { useGalleryData } from "../services/GalleryService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Gallery = () => {
  const { images, loading, error } = useGalleryData();
  const [currentFemaleIndex, setCurrentFemaleIndex] = useState(0);
  const [currentMaleIndex, setCurrentMaleIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const imagesPerPage = 4;

  // Split images into female and male sections
  const femaleImages = images.filter(img => img.id >= 1 && img.id <= 14);
  const maleImages = images.filter(img => img.id > 14);

  const nextFemaleImages = () => {
    setCurrentFemaleIndex((prevIndex) => 
      (prevIndex + imagesPerPage) % femaleImages.length
    );
  };

  const prevFemaleImages = () => {
    setCurrentFemaleIndex((prevIndex) =>
      prevIndex - imagesPerPage < 0 
        ? femaleImages.length - imagesPerPage 
        : prevIndex - imagesPerPage
    );
  };

  const nextMaleImages = () => {
    setCurrentMaleIndex((prevIndex) => 
      (prevIndex + imagesPerPage) % maleImages.length
    );
  };

  const prevMaleImages = () => {
    setCurrentMaleIndex((prevIndex) =>
      prevIndex - imagesPerPage < 0 
        ? maleImages.length - imagesPerPage 
        : prevIndex - imagesPerPage
    );
  };

  return (
    <div className="ts-gallery-container">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Gallery</h1>
        <p className="lead">Explore our collection of stunning hairstyles and transformations</p>
      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Female Hairstyles Section */}
      <div className="ts-gallery-section mb-5">
        <h3 className="display-4 text-center mb-4">Female Hair Styles<hr /></h3>
        <div className="ts-gallery-carousel">
          {femaleImages.length > imagesPerPage && (
            <>
              <button 
                className="ts-gallery-arrow prev"
                onClick={prevFemaleImages}
                aria-label="Previous female hairstyles"
              >
                ❮
              </button>
              <button 
                className="ts-gallery-arrow next"
                onClick={nextFemaleImages}
                aria-label="Next female hairstyles"
              >
                ❯
              </button>
            </>
          )}

          <div className="row g-4 justify-content-center">
            {femaleImages
              .slice(currentFemaleIndex, currentFemaleIndex + imagesPerPage)
              .map((image) => (
                <div key={image.id} className="col-md-6 col-lg-3">
                  <div 
                    className="ts-gallery-item"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.image_url}
                      alt={image.caption || "Female Hairstyle"}
                      className="ts-gallery-image"
                    />
                    {image.caption && (
                      <div className="ts-gallery-caption">
                        <p className="m-0">{image.caption}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Male Hairstyles Section */}
      <div className="ts-gallery-section">
        <h3 className="display-4 text-center mb-4">Male Hair Styles<hr /></h3>
        <div className="ts-gallery-carousel">
          {maleImages.length > imagesPerPage && (
            <>
              <button 
                className="ts-gallery-arrow prev"
                onClick={prevMaleImages}
                aria-label="Previous male hairstyles"
              >
                ❮
              </button>
              <button 
                className="ts-gallery-arrow next"
                onClick={nextMaleImages}
                aria-label="Next male hairstyles"
              >
                ❯
              </button>
            </>
          )}

          <div className="row g-4 justify-content-center">
            {maleImages
              .slice(currentMaleIndex, currentMaleIndex + imagesPerPage)
              .map((image) => (
                <div key={image.id} className="col-md-6 col-lg-3">
                  <div 
                    className="ts-gallery-item"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.image_url}
                      alt={image.caption || "Male Hairstyle"}
                      className="ts-gallery-image"
                    />
                    {image.caption && (
                      <div className="ts-gallery-caption">
                        <p className="m-0">{image.caption}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Image Modal (remains the same) */}
      {selectedImage && (
        <div className="ts-gallery-modal" onClick={() => setSelectedImage(null)}>
          <div className="ts-gallery-modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="ts-gallery-close-button"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.caption || "Gallery Image"}
              className="ts-gallery-modal-image"
            />
            {selectedImage.caption && (
              <p className="ts-gallery-modal-caption">{selectedImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;