// components/About.jsx
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
        <AboutTitle>Tentang Wild Oasis</AboutTitle>
        <AboutContent>
          <AboutText>
            <p>
              <strong>Wild Oasis</strong> adalah platform modern yang memudahkan pengguna untuk menemukan dan memesan cabin atau hotel favorit mereka dengan mudah, cepat, dan aman.
            </p>
            <p>
              Kami menawarkan berbagai pilihan akomodasi premium di lokasi-lokasi yang menakjubkan, dirancang untuk memberikan pengalaman menginap yang tak terlupakan. Setiap cabin kami dirancang dengan perpaduan sempurna antara kenyamanan
              modern dan keindahan alam.
            </p>
            <p>Nikmati pengalaman menginap terbaik dengan layanan kami yang mengutamakan kepuasan dan kenyamanan Anda. Reservasi cepat, konfirmasi instan, dan dukungan pelanggan 24/7 adalah komitmen kami untuk Anda.</p>
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
