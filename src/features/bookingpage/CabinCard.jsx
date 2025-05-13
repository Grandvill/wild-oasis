import { useState } from 'react';
import PropTypes from 'prop-types';
import { CabinCard as StyledCabinCard, CabinImage, CabinInfo, CabinName, CabinPrice, CabinFeatures, Feature } from './Styles';

function CabinCard({ cabin, isSelected, onSelect }) {
  return (
    <StyledCabinCard selected={isSelected} onClick={() => onSelect(cabin.id)}>
      <CabinImage image={cabin.image} />
      <CabinInfo>
        <CabinName>{cabin.name}</CabinName>
        <CabinPrice>${cabin.price} / night</CabinPrice>
        <CabinFeatures>
          <Feature>
            <span>👥</span> {cabin.capacity} guests
          </Feature>
          <Feature>
            <span>🛏️</span> {cabin.bedrooms} bedrooms
          </Feature>
          <Feature>
            <span>🚿</span> {cabin.bathrooms} bathrooms
          </Feature>
        </CabinFeatures>
      </CabinInfo>
    </StyledCabinCard>
  );
}

CabinCard.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CabinCard;
