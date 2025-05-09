// pages/Landing.jsx
import Navbar from '../features/landing-page/Navbar';
import Hero from '../features/landing-page/Hero';
import CabinsCarousel from '../features/landing-page/CabinCarousel';
import About from '../features/landing-page/About';
import ContactUs from '../features/landing-page/ContactUs';
import Testimonials from '../features/landing-page/Testimonials';

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <CabinsCarousel />
      <About />
      <Testimonials />
      <ContactUs />
    </>
  );
}

export default Landing;
