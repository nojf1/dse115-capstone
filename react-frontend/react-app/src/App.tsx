import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './services/AuthContext';
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import StyleGuide from "./pages/StyleGuide";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Login />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/service" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;
