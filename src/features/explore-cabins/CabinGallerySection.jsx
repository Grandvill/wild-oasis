'use client';

import { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AnimatedSection from '../landing-page/AnimatedSection';

const Section = styled.section`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 3rem;

  h2 {
    font-size: 2.4rem;
    color: var(--color-grey-800);
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-grey-200);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 200px);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 150px);
  }
`;

const GalleryImage = styled.div`
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: var(--shadow-md);
  }

  &:first-child {
    grid-column: span 2;
    grid-row: span 2;

    @media (max-width: 768px) {
      grid-column: span 2;
      grid-row: span 1;
    }
  }
`;

const FullscreenGallery = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullscreenImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 3rem;
  cursor: pointer;
`;

const NavButtons = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

function CabinGallerySection({ cabin }) {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const galleryRef = useRef(null);

  // Use cabin images if available, otherwise use default images
  const cabinImages = cabin?.galleryImages || [cabin?.image || '/cabin-detail-1.png', '/cabin-detail-2.jpg', '/cabin-detail-3.png', '/cabin-detail-4.png', '/cabin-detail-5.png'];

  const openFullscreen = (index) => {
    setFullscreenImage(index);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const nextImage = () => {
    setFullscreenImage((prev) => (prev + 1) % cabinImages.length);
  };

  const prevImage = () => {
    setFullscreenImage((prev) => (prev - 1 + cabinImages.length) % cabinImages.length);
  };

  if (!cabin) return null;

  return (
    <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.2}>
      <Section>
        <h2>Photo Gallery</h2>
        <GalleryGrid ref={galleryRef}>
          {cabinImages.map((image, index) => (
            <GalleryImage key={index} src={image} onClick={() => openFullscreen(index)} />
          ))}
        </GalleryGrid>

        {fullscreenImage !== null && (
          <FullscreenGallery>
            <CloseButton onClick={closeFullscreen}>×</CloseButton>
            <FullscreenImage src={cabinImages[fullscreenImage]} />
            <NavButtons>
              <NavButton onClick={prevImage}>←</NavButton>
              <NavButton onClick={nextImage}>→</NavButton>
            </NavButtons>
          </FullscreenGallery>
        )}
      </Section>
    </AnimatedSection>
  );
}

CabinGallerySection.propTypes = {
  cabin: PropTypes.shape({
    image: PropTypes.string,
    galleryImages: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default CabinGallerySection;
