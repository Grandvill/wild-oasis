'use client';

import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

// Keyframes for animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

// Styled components for Hero
const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  background-color: var(--color-grey-50);
  text-align: center;
  position: relative;
  overflow: hidden;

  &.visible > div {
    animation: ${fadeInUp} 1s ease-out forwards;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 70% 30%, var(--color-brand-900), transparent 60%), radial-gradient(circle at 30% 70%, var(--color-brand-800), transparent 50%);
    opacity: 0.2;
    z-index: -1;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  opacity: 0;
`;

const Title = styled.h2`
  font-size: clamp(3.6rem, 8vw, 5.6rem);
  font-weight: bold;
  margin-bottom: 2rem;
  background: linear-gradient(to right, var(--color-brand-100), var(--color-brand-500));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
`;

const Subtitle = styled.p`
  font-size: clamp(1.6rem, 3vw, 2rem);
  margin-bottom: 4rem;
  max-width: 70ch;
  color: var(--color-grey-600);
  line-height: 1.6;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const BookingButton = styled(Link)`
  background-color: var(--color-brand-600);
  color: var(--color-grey-0);
  padding: 1.2rem 2.8rem;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  text-decoration: none;
  font-size: 1.6rem;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.5);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.7);
  }

  &:active {
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s ease;
    z-index: 1;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  span {
    position: relative;
    z-index: 2;
  }
`;

const ExploreButton = styled(Link)`
  background-color: transparent;
  color: var(--color-brand-600);
  padding: 1.2rem 2.8rem;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  text-decoration: none;
  font-size: 1.6rem;
  border: 2px solid var(--color-brand-600);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: var(--color-brand-50);
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(99, 102, 241, 0.2);
  }

  span {
    position: relative;
    z-index: 2;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  animation: ${float} 2s ease-in-out infinite;
`;

const ScrollText = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  margin-bottom: 0.8rem;
`;

const ScrollIcon = styled.div`
  width: 3rem;
  height: 5rem;
  border: 2px solid var(--color-brand-500);
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  padding-top: 0.8rem;

  &::before {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    background-color: var(--color-brand-500);
    border-radius: 50%;
    animation: ${float} 2s ease-in-out infinite;
  }
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
`;

const Shape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--color-brand-200), var(--color-brand-400));
  opacity: 0.1;
  filter: blur(40px);
`;

// Hero Component
function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection ref={sectionRef}>
      <BackgroundShapes>
        <Shape style={{ width: '400px', height: '400px', top: '-100px', right: '-100px' }} />
        <Shape style={{ width: '300px', height: '300px', bottom: '10%', left: '5%' }} />
        <Shape style={{ width: '200px', height: '200px', top: '20%', left: '15%' }} />
      </BackgroundShapes>

      <HeroContent>
        <Title>Discover Your Dream Cabin</Title>
        <Subtitle>Book a cabin comfortably, quickly, and safely at Wild Oasis. Enjoy an unforgettable stay amidst nature's beauty.</Subtitle>

        <ButtonContainer>
          <BookingButton to="/booking-now">
            <span>Book Now</span>
          </BookingButton>
          <ExploreButton to="/explore-cabin">
            <span>Explore Cabins</span>
          </ExploreButton>
        </ButtonContainer>
      </HeroContent>

      <ScrollIndicator onClick={() => scrollToSection('cabins')}>
        <ScrollText>Scroll Down</ScrollText>
        <ScrollIcon />
      </ScrollIndicator>
    </HeroSection>
  );
}

export default Hero;
