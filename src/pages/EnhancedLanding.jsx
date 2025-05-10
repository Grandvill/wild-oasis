'use client';

import Navbar from '../features/landing-page/Navbar';
import Hero from '../features/landing-page/Hero';
import CabinsCarousel from '../features/landing-page/CabinCarousel';
import AnimatedCabins from '../features/landing-page/AnimatedCabins';
import About from '../features/landing-page/About';
import ContactUs from '../features/landing-page/ContactUs';
import Testimonials from '../features/landing-page/Testimonials';
import Footer from '../features/landing-page/Footer';
import AnimatedFeatures from '../features/landing-page/AnimatedFeatures';
import AnimatedSection from '../components/AnimatedSection';
import styled from 'styled-components';

// Styled component for the page wrapper
const PageWrapper = styled.div`
  overflow-x: hidden; // Prevent horizontal scrollbar during animations
`;

function EnhancedLanding() {
  return (
    <PageWrapper>
      <Navbar />

      {/* Hero doesn't need animation as it's the first thing visible */}
      <Hero />

      {/* Animated Cabins with zoom in effect */}
      <AnimatedSection animation="zoomIn" duration={1} threshold={0.2}>
        <AnimatedCabins />
      </AnimatedSection>

      {/* Features section with staggered animations */}
      <AnimatedFeatures />

      {/* Cabins Carousel with slide in from right */}
      <AnimatedSection animation="fadeInRight" duration={0.8} threshold={0.1}>
        <CabinsCarousel />
      </AnimatedSection>

      {/* About section with slide in from left */}
      <AnimatedSection animation="fadeInLeft" duration={0.8} threshold={0.2}>
        <About />
      </AnimatedSection>

      {/* Testimonials with fade up animation */}
      <AnimatedSection animation="fadeInUp" duration={0.8} threshold={0.15}>
        <Testimonials />
      </AnimatedSection>

      {/* Contact Us with fade in animation */}
      <AnimatedSection animation="fadeIn" duration={1} threshold={0.1}>
        <ContactUs />
      </AnimatedSection>

      {/* Footer doesn't need animation as it's the last element */}
      <Footer />
    </PageWrapper>
  );
}

export default EnhancedLanding;
