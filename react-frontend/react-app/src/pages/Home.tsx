import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import timelessstyle2 from "../assets/timeless-style-2.png";
import salonbg from "../assets/salonbg.jpeg";
import avedaLogo from "../assets/aveda-logo.png";
import lorealLogo from "../assets/loreal-logo.png";
import grafenLogo from "../assets/grafen-logo.png";
import kerastaseLogo from "../assets/kerastase-seeklogo.png";
import companyMissionBg from "../assets/our-company-misson-background.jpg";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero text-center text-white py-5"
        style={{
          backgroundImage: `url(${salonbg})`, // Change image here, remember to import it first
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "80vh",
        }}
      >
        <div className="container">
          <img
            src={timelessstyle2}
            alt="Timeless Style Logo"
            height="200"
            className="me-2"
          />
          <p className="lead"></p> <br></br>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/booking"
          >
            {" "}
            <button className="custom-button">Book an Appointment</button>
          </Link>
        </div>
      </section>

      {/* Video Section */}
      <section className="services py-5 text-center">
        <div className="container">
          <h2 className="mb-4">More than style, we care - bringing beauty and happiness to you!</h2>
          <hr/>
          <iframe 
  className="responsive-iframe"
  src="https://www.youtube.com/embed/-FnrCZJw6TE" 
  title="hair salon video" 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerPolicy="strict-origin-when-cross-origin" 
  allowFullScreen
></iframe>
        </div>
      </section>

  {/* Our Partners Section */}
  <section
        className="partners text-center bg-light"
        style={{
          display: "flex", // Flexbox for centering
          flexDirection: "column", // Stack content vertically
          alignItems: "center", // Center horizontally
          justifyContent: "center", // Center vertically
          padding: "20px", // Optional padding
        }}
      >
        <div className="container">
          <h2 className="mb-4">Our Trusted Partners</h2>
          <div
            className="d-flex flex-wrap justify-content-center align-items-center"
            style={{ gap: "30px" }} // Space between logos
          >
            <img
              src={avedaLogo}
              alt="Aveda Logo"
              className="img-fluid"
              style={{ maxWidth: "300px", height: "auto" }} // Adjust size as needed
            />
            <img
              src={lorealLogo}
              alt="L'Oréal Logo"
              className="img-fluid"
              style={{ maxWidth: "300px", height: "auto" }}
            />
            <img
              src={grafenLogo}
              alt="Grafen Logo"
              className="img-fluid"
              style={{ maxWidth: "300px", height: "auto" }}
            />
            <img
              src={kerastaseLogo}
              alt="Kérastase Logo"
              className="img-fluid"
              style={{ maxWidth: "300px", height: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* Our Company Mission Section */}
      <section
        className="mission text-center text-white"
        style={{
          minHeight: "50vh",
          width: "100vw",
          backgroundImage: `url(${companyMissionBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black overlay
            zIndex: 1,
          }}
        />
        <div
          className="container"
          style={{
            zIndex: 2,
            position: "relative",
            maxWidth: "1600px", // Limit width for readability
          }}
        >
          <div
            style={{
              borderTop: "4px solid #d4af37", // Gold line above (matches prototype color)
              borderBottom: "4px solid #d4af37", // Gold line below
              padding: "20px 0", // Space between lines and text
            }}
          >
            <h2 className="mb-4">Our Company Mission</h2>
            <p style={{ fontSize: "1.5rem", lineHeight: "1.6" }}>
              At Timeless Style, we blend professionalism with compassion,
              making quality hair care accessible to all. We provide top-tier
              styling while giving back to the community through affordable
              services and skill development for the underprivileged.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section
      <section className="gallery py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4">Style Inspiration</h2>
          <div className="row">
            <div className="col-md-4">
              <img
                src="/uploads/style1.jpg"
                alt="Style 1"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-4">
              <img
                src="/uploads/style2.jpg"
                alt="Style 2"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-4">
              <img
                src="/uploads/style3.jpg"
                alt="Style 3"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
          <Link to="/gallery" className="btn btn-outline-dark mt-4">
            Explore More Styles →
          </Link>
        </div>
      </section> */}

{/* Testimonials Section */}
<section className="testimonials py-5" style={{ 
  backgroundColor: "#f8f9fa",
  width: "100%", 
  overflow: "hidden" 
}}>
  <div className="container-fluid">
    <h2 className="text-center mb-5">What Our Clients Say</h2>
    
    <div className="testimonial-section">
      <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* Testimonial 1 */}
          <div className="carousel-item active">
            <div className="testimonial-card mx-auto" style={{ 
              width: "90%", 
              maxWidth: "1200px", 
              backgroundColor: "white", 
              padding: "40px 60px",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              margin: "0 auto" 
            }}>
              <h4 className="text-center mb-4">Emily Carter</h4>
              <p className="text-center mb-0" style={{ fontSize: "1.1rem" }}>
                "I walked into Timeless Style feeling unsure, and I left with the most amazing haircut! 
                The stylists truly listened to what I wanted and gave me a cut that perfectly suited my
                 face shape and personality. The attention to detail was incredible, and I received so many
                  compliments afterward. I've never felt so confident in my look! The atmosphere was warm 
                  and welcoming, making the entire experience so enjoyable. I will definitely be returning for future appointments."
              </p>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="carousel-item">
            <div className="testimonial-card mx-auto" style={{ 
              width: "90%", 
              maxWidth: "1200px", 
              backgroundColor: "white", 
              padding: "40px 60px",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              margin: "0 auto" 
            }}>
              <h4 className="text-center mb-4">James Lee</h4>
              <p className="text-center mb-0" style={{ fontSize: "1.1rem" }}>
                "The team at Timeless Style gave me a fresh, modern look for my new job. Their attention to detail
                 is incredible, and the atmosphere is so relaxing! From the moment I walked in, I felt welcomed and
                  valued as a customer. The stylist took time to understand my preferences and suggested a cut
                   that complemented my features. The end result was beyond my expectations—I've never felt more
                    stylish and confident! I highly recommend them to anyone looking for top-tier hairstyling."
              </p>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="carousel-item">
            <div className="testimonial-card mx-auto" style={{ 
              width: "90%", 
              maxWidth: "1200px", 
              backgroundColor: "white", 
              padding: "40px 60px",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              margin: "0 auto" 
            }}>
              <h4 className="text-center mb-4">Sophia Nguyen</h4>
              <p className="text-center mb-0" style={{ fontSize: "1.1rem" }}>
                "I love my new hair color! The staff at Timeless Style are so talented and made the whole experience fun.
                 They took the time to discuss different shades and maintenance tips, ensuring I was comfortable with my
                  choice. The transformation was exactly what I hoped for—vibrant, natural-looking, and beautifully blended.
                   I’ve been getting so many compliments, and I can’t wait for my next appointment! The entire process was smooth,
                    and the results were worth every penny."
              </p>
            </div>
          </div>

          {/* Testimonial 4 */}
          <div className="carousel-item">
            <div className="testimonial-card mx-auto" style={{ 
              width: "90%", 
              maxWidth: "1200px", 
              backgroundColor: "white", 
              padding: "40px 60px",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              margin: "0 auto" 
            }}>
              <h4 className="text-center mb-4">Michael Brown</h4>
              <p className="text-center mb-0" style={{ fontSize: "1.1rem" }}>
                "Best salon experience I've ever had! The haircut was perfect, and the staff were so friendly.
                 They truly go above and beyond to make you feel comfortable and ensure you leave satisfied.
                  The stylist gave me great advice on how to style and maintain my cut at home.
                   It’s rare to find a place that combines skill, professionalism, and a warm atmosphere all in one.
                    I’ve finally found a salon I can trust, and I’ll be recommending Timeless Style to all my friends and family!"
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Indicators (Dots) */}
        <div className="carousel-indicators" style={{ 
          position: "relative", 
          bottom: "0", 
          marginTop: "30px", 
          marginBottom: "0" 
        }}>
          <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="0" className="active" style={{ backgroundColor: "#333", width: "10px", height: "10px", borderRadius: "50%" }} aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="1" style={{ backgroundColor: "#333", width: "10px", height: "10px", borderRadius: "50%" }} aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="2" style={{ backgroundColor: "#333", width: "10px", height: "10px", borderRadius: "50%" }} aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="3" style={{ backgroundColor: "#333", width: "10px", height: "10px", borderRadius: "50%" }} aria-label="Slide 4"></button>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Contact & Booking CTA */}
      <section className="contact py-5 bg-dark text-white text-center">
        <div className="container">
          <h2 className="mb-3">Ready for a New Look?</h2>
          <p>Book your appointment today and let us take care of your style.</p>
          <br></br>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/booking"
          >
            {" "}
            <button className="custom-button">Book an Appointment</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

