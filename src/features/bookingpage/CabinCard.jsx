'use client';

import PropTypes from 'prop-types';
import { CabinCard as StyledCabinCard, CabinImage, CabinInfo, CabinName, CabinPrice, CabinFeatures, Feature } from './Styles';

function CabinCard({ cabin, isSelected, onSelect, isBooked }) {
  const imageUrl = cabin.image || '';

  const scrollToTop = () => {
    window.scrollTo({
      top: 500,
      behavior: 'smooth',
    });
  };

  const handleClick = () => {
    if (!isBooked) {
      onSelect(cabin.id);
      scrollToTop();
    }
  };

  return (
    <StyledCabinCard selected={isSelected} disabled={isBooked} onClick={handleClick} style={isBooked ? { opacity: 0.6, cursor: 'not-allowed' } : {}}>
      <CabinImage image={imageUrl} />
      <CabinInfo>
        <CabinName>{cabin.name}</CabinName>
        <CabinPrice>{isBooked ? 'Booked' : `$${cabin.regularPrice} / night`}</CabinPrice>
        <CabinFeatures>
          <Feature>
            <span>👥</span> {cabin.maxCapacity} guests
          </Feature>
          {cabin.bedrooms && (
            <Feature>
              <span>🛏️</span> {cabin.bedrooms} bedrooms
            </Feature>
          )}
          {cabin.bathrooms && (
            <Feature>
              <span>🚿</span> {cabin.bathrooms} bathrooms
            </Feature>
          )}
          {cabin.discount > 0 && (
            <Feature>
              <span>🏷️</span> ${cabin.discount} discount
            </Feature>
          )}
        </CabinFeatures>
      </CabinInfo>
    </StyledCabinCard>
  );
}

CabinCard.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    regularPrice: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    bedrooms: PropTypes.number,
    bathrooms: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  isBooked: PropTypes.bool.isRequired,
};

export default CabinCard;
