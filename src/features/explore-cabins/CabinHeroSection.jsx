'use client';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import PropTypes from 'prop-types';

const CabinHero = styled.div`
  height: 70vh;
  background-image: ${(props) => `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${props.image})`};
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 4rem;
  color: white;
  margin-top: 8rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  width: 100%;
`;

const CabinName = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 3.6rem;
  }
`;

const CabinLocation = styled.p`
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CabinPrice = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  span {
    font-size: 1.8rem;
    font-weight: 400;
  }
`;

const BookButton = styled(Button)`
  padding: 1.2rem 3rem;
  font-size: 1.6rem;
`;

function CabinHeroSection({ cabin }) {
  if (!cabin) return null;

  return (
    <CabinHero image={cabin.image}>
      <HeroContent>
        <CabinName>{cabin.name}</CabinName>
        <CabinLocation>
          <span>📍</span> {cabin.location || 'Beautiful Location'}
        </CabinLocation>
        <CabinPrice>
          ${cabin.regularPrice} <span>per night</span>
        </CabinPrice>
        <Link to={`/booking-now?cabin=${cabin.id}`}>
          <BookButton variation="primary" size="large">
            Book Now
          </BookButton>
        </Link>
      </HeroContent>
    </CabinHero>
  );
}

CabinHeroSection.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    regularPrice: PropTypes.number,
    image: PropTypes.string,
    location: PropTypes.string,
  }),
};

export default CabinHeroSection;
