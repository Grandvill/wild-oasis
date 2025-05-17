'use client';

import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const GalleryContainer = styled.div`
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

const ImageFrame = styled.div`
  border: 8px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  padding: 1rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: var(--border-radius-md);
  transition: transform 0.3s ease;
  cursor: zoom-in;

  &:hover {
    transform: scale(1.1);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: var(--border-radius-md);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

function CabinGallerySection({ cabin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <GalleryContainer>
      <SectionTitle>Gallery</SectionTitle>
      {cabin.image ? (
        <ImageFrame>
          <GalleryImage src={cabin.image} alt={`${cabin.name} cabin`} onClick={toggleModal} />
        </ImageFrame>
      ) : (
        <p>No image available</p>
      )}

      {isModalOpen && (
        <Modal onClick={toggleModal}>
          <CloseButton onClick={toggleModal}>&times;</CloseButton>
          <ModalImage src={cabin.image} alt={`${cabin.name} cabin`} />
        </Modal>
      )}
    </GalleryContainer>
  );
}

CabinGallerySection.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default CabinGallerySection;
