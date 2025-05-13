'use client';

import PropTypes from 'prop-types';
import { CabinCard as StyledCabinCard, CabinImage, CabinInfo, CabinName, CabinPrice, CabinFeatures, Feature } from './Styles';

function CabinCard({ cabin, isSelected, onSelect }) {
  // Handle case where image is a full URL from Supabase
  const imageUrl = cabin.image || '';

  return (
    <StyledCabinCard selected={isSelected} onClick={() => onSelect(cabin.id)}>
      <CabinImage image={imageUrl} />
      <CabinInfo>
        <CabinName>{cabin.name}</CabinName>
        <CabinPrice>${cabin.regularPrice} / night</CabinPrice>
        <CabinFeatures>
          <Feature>
            <span>👥</span> {cabin.maxCapacity} guests
          </Feature>
          {/* Display bedrooms and bathrooms only if available */}
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
          {/* Display discount if available */}
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
    bedrooms: PropTypes.number, // Optional
    bathrooms: PropTypes.number, // Optional
    discount: PropTypes.number, // Added discount property
    description: PropTypes.string, // Added description property
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CabinCard;
