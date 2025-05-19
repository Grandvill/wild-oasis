import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import AnimatedSection from '../landing-page/AnimatedSection';
import CabinCard from './CabinCard';
import { BookingSection, CabinSelection as StyledCabinSelection } from './Styles';
import { getCabinAvailability } from '../../services/apiBookings';

function CabinSelection({ cabins, selectedCabinId, onSelectCabin, startDate, endDate }) {
  // Convert Date objects to ISO strings if provided
  const startDateStr = startDate instanceof Date ? startDate.toISOString().split('T')[0] : startDate;
  const endDateStr = endDate instanceof Date ? endDate.toISOString().split('T')[0] : endDate;

  // Fetch availability for each cabin
  const { data: availability = {}, isLoading } = useQuery({
    queryKey: ['cabinAvailability', cabins.map((c) => c.id), startDateStr, endDateStr],
    queryFn: async () => {
      if (!startDateStr || !endDateStr) return {};
      const availabilityMap = {};
      for (const cabin of cabins) {
        const isBooked = await getCabinAvailability(cabin.id, startDateStr, endDateStr);
        availabilityMap[cabin.id] = isBooked;
      }
      return availabilityMap;
    },
    enabled: !!startDateStr && !!endDateStr,
  });

  return (
    <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.2}>
      <BookingSection>
        <h2>2. Choose Your Cabin</h2>
        <StyledCabinSelection>
          {isLoading ? (
            <p>Loading cabin availability...</p>
          ) : Array.isArray(cabins) && cabins.length > 0 ? (
            cabins.map((cabin) => <CabinCard key={cabin.id} cabin={cabin} isSelected={selectedCabinId === cabin.id} onSelect={onSelectCabin} isBooked={availability[cabin.id] || false} />)
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
      regularPrice: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      maxCapacity: PropTypes.number.isRequired,
      bedrooms: PropTypes.number,
      bathrooms: PropTypes.number,
    })
  ).isRequired,
  selectedCabinId: PropTypes.number,
  onSelectCabin: PropTypes.func.isRequired,
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

CabinSelection.defaultProps = {
  selectedCabinId: null,
  startDate: null,
  endDate: null,
};

export default CabinSelection;
