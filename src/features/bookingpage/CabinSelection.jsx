import PropTypes from 'prop-types';
import AnimatedSection from '../landing-page/AnimatedSection';
import CabinCard from './CabinCard';
import { BookingSection, CabinSelection as StyledCabinSelection } from './Styles';

function CabinSelection({ cabins, selectedCabinId, onSelectCabin }) {
  return (
    <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.2}>
      <BookingSection>
        <h2>2. Choose Your Cabin</h2>
        <StyledCabinSelection>
          {/* Check if cabins exists and is an array before mapping */}
          {Array.isArray(cabins) && cabins.length > 0 ? (
            cabins.map((cabin) => <CabinCard key={cabin.id} cabin={cabin} isSelected={selectedCabinId === cabin.id} onSelect={onSelectCabin} />)
          ) : (
            <p>No cabins available. Please check back later.</p>
          )}
        </StyledCabinSelection>
      </BookingSection>
    </AnimatedSection>
  );
}

CabinSelection.propTypes = {
  cabins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      capacity: PropTypes.number.isRequired,
      bedrooms: PropTypes.number.isRequired,
      bathrooms: PropTypes.number.isRequired,
    })
  ), // Removed isRequired to allow for undefined/null initially
  selectedCabinId: PropTypes.number, // Also made this optional since it might not be set initially
  onSelectCabin: PropTypes.func.isRequired,
};

// Set default props to ensure we always have valid values
CabinSelection.defaultProps = {
  cabins: [],
  selectedCabinId: null,
};

export default CabinSelection;
