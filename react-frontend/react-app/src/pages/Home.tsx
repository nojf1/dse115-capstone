import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import timelessstyle2 from "../assets/timeless-style-2.png";
import salonbg from "../assets/salonbg.jpeg";

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
          <iframe width="920" height="460" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up (Official Music Video)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </section>

      {/* Gallery Section */}
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
      </section>

      {/* Testimonials */}
      <section className="testimonials py-5 text-center">
        <div className="container">
          <h2 className="mb-4">What Our Clients Say</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="p-4 border rounded bg-white shadow-sm">
                <p>
                  "The best haircut I've ever had! The stylists are amazing."
                </p>
                <strong>- Jane Doe</strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 border rounded bg-white shadow-sm">
                <p>"Fantastic service and a relaxing atmosphere!"</p>
                <strong>- Mark Smith</strong>
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
          <Link to="/booking" className="btn btn-primary btn-lg mt-3">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
