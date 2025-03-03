import { useState, KeyboardEvent } from "react";
import { useStylistData } from "../services/StylistService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import trophy1 from '../assets/trophy_1-removebg-preview.png';
import trophy2 from '../assets/trophy_2-removebg-preview.png';
import trophy3 from '../assets/trophy_3-removebg-preview.png';

// Define the Stylist interface for proper TypeScript typing
interface Stylist {
  stylist_id: number;
  name: string;
  profile_picture?: string;
  expertise?: string;
  experience_years?: number;
  education?: string;
  career_interest?: string;
  description?: string;
}

const About = () => {
  const [activeSection, setActiveSection] = useState<"about" | "timeline" | "stylists">("about");
  const { stylists, loading, error } = useStylistData();
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);

  // Debug the fetched stylists data
  console.log("Fetched stylists:", stylists);

  const handleImageError = (stylistId: number) => {
    setLoadedImages((prev) => ({
      ...prev,
      [stylistId]: false,
    }));
  };

  const handleImageLoad = (stylistId: number) => {
    setLoadedImages((prev) => ({
      ...prev,
      [stylistId]: true,
    }));
  };

  const openModal = (stylist: Stylist) => {
    setSelectedStylist(stylist);
  };

  const closeModal = () => {
    setSelectedStylist(null);
  };

  // Handle keyboard accessibility for modal (close on Esc)
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    <div className="container py-5">
      {/* Section Navigation Buttons */}
      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group" role="group">
          <button
            className={`btn ${
              activeSection === "about" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setActiveSection("about")}
          >
            About Us
          </button>
          <button
            className={`btn ${
              activeSection === "timeline" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setActiveSection("timeline")}
          >
            Competition Timeline
          </button>
          <button
            className={`btn ${
              activeSection === "stylists" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setActiveSection("stylists")}
          >
            Our Stylists
          </button>
        </div>
      </div>

      {/* About Us Section */}
      {activeSection === "about" && (
        <div className="fade show about-section">
          <h2 className="text-center mb-4 text-white">About Timeless Style</h2>
          <div className="row">
            <div className="col-md-6">
              <h4 className="text-gold">Our Story</h4>
              <p className="text-white">
                Established in 2020, <strong>Timeless Style</strong> is more
                than just a hair salon—it's a sanctuary where artistry meets
                elegance. Our expert stylists are dedicated to crafting
                personalized looks that enhance your natural beauty, ensuring
                every client leaves with confidence and grace. With a deep
                passion for innovation and a commitment to perfection, we
                redefine hair styling as an immersive luxury experience.
              </p>
            </div>
            <div className="col-md-6">
              <h4 className="text-gold">Our Values</h4>
              <ul className="list-unstyled text-white">
                <li>
                  <strong>Excellence in Service</strong> – We set the highest
                  standards in hair artistry and customer care.
                </li>
                <li>
                  <strong>Client Satisfaction</strong> – Your happiness and
                  confidence are at the heart of what we do.
                </li>
                <li>
                  <strong>Continuous Learning</strong> – We stay ahead with
                  the latest trends and techniques in hair styling.
                </li>
                <li>
                  <strong>Community Engagement</strong> – We believe in
                  giving back and creating meaningful connections.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Competition Timeline Section */}
      {activeSection === "timeline" && (
        <div className="fade show timeline-section">
          <h2 className="text-center mb-4 text-white">Competition Timeline</h2>
          <div className="timeline">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body-timeline">
                    <img src={trophy1} alt="Trophy 1" className="trophy-icon" />
                    <h5 className="card-title">2023</h5>
                    <p className="card-text">
                      National Hairstyling Excellence Award
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body-timeline">
                    <img src={trophy2} alt="Trophy 2" className="trophy-icon" />
                    <h5 className="card-title">2022</h5>
                    <p className="card-text">Best Salon Innovation Award</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body-timeline">
                    <img src={trophy3} alt="Trophy 3" className="trophy-icon" />
                    <h5 className="card-title">2021</h5>
                    <p className="card-text">Rising Star Salon Award</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stylists Section */}
      {activeSection === "stylists" && (
        <div className="fade show stylists-section">
          <h2 className="text-center mb-4 text-black">Meet Our Stylists</h2>
          {loading && <div className="text-center text-dark">Loading stylists...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row g-4">
            {stylists.map((stylist: Stylist) => (
              <div key={stylist.stylist_id} className="col-md-4">
                <div className="card h-100" onClick={() => openModal(stylist)} style={{ cursor: "pointer" }}>
                  <div
                    className="card-img-wrapper"
                    style={{
                      height: "250px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {stylist.profile_picture ? (
                      <img
                        src={stylist.profile_picture}
                        className={`card-img-top ${
                          loadedImages[stylist.stylist_id] ? "show" : "hide"
                        }`}
                        alt={stylist.name}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          objectPosition: "top",
                          transition: "opacity 0.3s ease",
                        }}
                        onError={() => handleImageError(stylist.stylist_id)}
                        onLoad={() => handleImageLoad(stylist.stylist_id)}
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <i className="fas fa-user-circle fa-4x text-secondary"></i>
                      </div>
                    )}
                    {!loadedImages[stylist.stylist_id] &&
                      stylist.profile_picture && (
                        <div className="image-placeholder">
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{stylist.name}</h5>
                    {stylist.expertise && (
                      <p className="card-text">
                        <strong>Expertise:</strong> {stylist.expertise}
                      </p>
                    )}
                    {stylist.experience_years && (
                      <p className="card-text">
                        <strong>Experience:</strong> {stylist.experience_years}{" "}
                        years
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Stylist Details */}
      {selectedStylist && (
        <div
          className="modal show d-block about-stylist-modal"
          tabIndex={-1}
          role="dialog"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onKeyDown={handleKeyDown}
          aria-labelledby="stylistModalLabel"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body text-center" id="stylistModalLabel">
                <img
                  src={selectedStylist.profile_picture || "https://via.placeholder.com/250"}
                  alt={selectedStylist.name}
                  className="modal-stylist-photo"
                />
                <p>
                  <strong>Experience:</strong> {selectedStylist.experience_years} years
                </p>
                <p>
                  <strong>Expertise:</strong> {selectedStylist.expertise || "Not specified"}
                </p>
                <p>
                  <strong>Education:</strong> {selectedStylist.education || "Not specified"}
                </p>
                <p>
                  <strong>Career Interest:</strong>{" "}
                  {selectedStylist.career_interest || "Not specified"}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedStylist.description || "Not specified"}
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;