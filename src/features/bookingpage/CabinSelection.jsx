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
      regularPrice: PropTypes.number.isRequired, // Changed from price
      image: PropTypes.string.isRequired,
      maxCapacity: PropTypes.number.isRequired, // Changed from capacity
      bedrooms: PropTypes.number.isRequired,
      bathrooms: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedCabinId: PropTypes.number,
  onSelectCabin: PropTypes.func.isRequired,
};

CabinSelection.defaultProps = {
  selectedCabinId: null,
};

export default CabinSelection;
