// pages/Landing.jsx
import Navbar from '../features/landing-page/Navbar';
import Hero from '../features/landing-page/Hero';
import CabinsCarousel from '../features/landing-page/CabinCarousel';
import About from '../features/landing-page/About';

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <CabinsCarousel />
      <About />
    </>
  );
}

export default Landing;
