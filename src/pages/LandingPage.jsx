//landingpage.jsx

'use client';

import Navbar from '../features/landing-page/Navbar';
import Hero from '../features/landing-page/Hero';
import CabinsCarousel from '../features/landing-page/CabinCarousel';
import About from '../features/landing-page/About';
import ContactUs from '../features/landing-page/ContactUs';
import Testimonials from '../features/landing-page/Testimonials';
import Footer from '../features/landing-page/Footer';
import AnimatedSection from '../features/landing-page/AnimatedSection';
import { useStaggeredAnimation } from '../features/landing-page/useScrollAnimation';
import styled from 'styled-components';

// Styled component for the page wrapper
const PageWrapper = styled.div`
  overflow-x: hidden; // Prevent horizontal scrollbar during animations
`;

// Styled component for staggered children
const StaggeredChild = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: ${(props) => props.delay}s;

  ${(props) =>
    props.isVisible &&
    `
    opacity: 1;
    transform: translateY(0);
  `}
`;

function Landing() {
  // For sections with staggered children (like features or benefits)
  const { containerRef, isVisible, getDelay } = useStaggeredAnimation(4, {
    threshold: 0.1,
    staggerDelay: 0.15,
  });

  return (
    <PageWrapper>
      <Navbar />

      {/* Hero doesn't need animation as it's the first thing visible */}
      <Hero />

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

export default Landing;
