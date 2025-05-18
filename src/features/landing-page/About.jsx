import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { keyframes } from 'styled-components';

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

const AboutSection = styled.section`
  padding: 7rem 4rem;
  background-color: var(--color-grey-50);
  position: relative;

  &.visible > div {
    animation: ${fadeInUp} 1s ease-out forwards;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom, var(--color-grey-100), var(--color-brand-300));
  }
`;

const AboutContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
`;

const AboutTitle = styled.h3`
  font-size: 3.2rem;
  color: var(--color-brand-800);
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--color-brand-500);
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div`
  font-size: 1.8rem;
  color: var(--color-grey-700);
  line-height: 1.7;
  text-align: justify;

  p {
    margin-bottom: 2rem;
    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: var(--color-brand-800);
    font-weight: 600;
  }
`;

const ImageWrapper = styled.div`
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  position: relative;
  margin-top: 3rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--color-brand-900), transparent);
    opacity: 0.3;
    z-index: 1;
  }

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    display: block;
    transform: scale(1.01);
  }
`;

// About Component
function About() {
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

  return (
    <AboutSection id="about" ref={sectionRef}>
      <AboutContainer>
        <AboutTitle>About Wild Oasis</AboutTitle>
        <AboutContent>
          <AboutText>
            <p>
              <strong>Wild Oasis</strong> is a modern platform that simplifies the process of finding and booking your favorite cabins or hotels easily, quickly, and safely.
            </p>
            <p>We offer a variety of premium accommodations in stunning locations, designed to provide an unforgettable stay. Each of our cabins is crafted with a perfect blend of modern comfort and natural beauty.</p>
            <p>Enjoy the best accommodation experience with our services that prioritize your satisfaction and comfort. Fast reservations, instant confirmations, and 24/7 customer support are our commitments to you.</p>
          </AboutText>
          <ImageWrapper>
            <img src="cabin-about.jpg" alt="Wild Oasis Resort" />
          </ImageWrapper>
        </AboutContent>
      </AboutContainer>
    </AboutSection>
  );
}

export default About;
