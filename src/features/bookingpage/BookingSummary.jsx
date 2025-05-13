import { format } from 'date-fns';
import PropTypes from 'prop-types';
import AnimatedSection from '../landing-page/AnimatedSection';
import { BookingSummary as StyledBookingSummary, SummaryTitle, SummaryItem, TotalPrice, BookingButton } from './Styles';

function BookingSummary({ cabinData, checkInDate, checkOutDate, nights, guests, subtotal, tax, total }) {
  // Early return if cabinData is undefined
  if (!cabinData) {
    return (
      <AnimatedSection animation="fadeInRight" duration={0.8} delay={0.2}>
        <StyledBookingSummary>
          <SummaryTitle>Booking Summary</SummaryTitle>
          <SummaryItem>
            <span className="value">Please select a cabin to continue</span>
          </SummaryItem>
        </StyledBookingSummary>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection animation="fadeInRight" duration={0.8} delay={0.2}>
      <StyledBookingSummary>
        <SummaryTitle>Booking Summary</SummaryTitle>

        <SummaryItem>
          <span className="label">Cabin</span>
          <span className="value">{cabinData.name}</span>
        </SummaryItem>

        <SummaryItem>
          <span className="label">Check-in</span>
          <span className="value">{format(checkInDate, 'MMM dd, yyyy')}</span>
        </SummaryItem>

        <SummaryItem>
          <span className="label">Check-out</span>
          <span className="value">{format(checkOutDate, 'MMM dd, yyyy')}</span>
        </SummaryItem>

        <SummaryItem>
          <span className="label">Length of stay</span>
          <span className="value">{nights} nights</span>
        </SummaryItem>

        <SummaryItem>
          <span className="label">Guests</span>
          <span className="value">{guests}</span>
        </SummaryItem>

        <SummaryItem>
          <span className="label">Rate</span>
          <span className="value">${cabinData.price} / night</span>
        </SummaryItem>

        <SummaryItem>
          <span className="label">Subtotal</span>
          <span className="value">${subtotal}</span>
        </SummaryItem>

        <SummaryItem>
          <span className="label">Tax (10%)</span>
          <span className="value">${tax.toFixed(2)}</span>
        </SummaryItem>

        <TotalPrice>
          <span className="label">Total</span>
          <span className="value">${total.toFixed(2)}</span>
        </TotalPrice>

        <BookingButton variation="primary" size="large">
          Confirm Booking
        </BookingButton>
      </StyledBookingSummary>
    </AnimatedSection>
  );
}

BookingSummary.propTypes = {
  cabinData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    capacity: PropTypes.number,
    bedrooms: PropTypes.number,
    bathrooms: PropTypes.number,
  }), // Removed isRequired to allow null/undefined initially
  checkInDate: PropTypes.instanceOf(Date).isRequired,
  checkOutDate: PropTypes.instanceOf(Date).isRequired,
  nights: PropTypes.number.isRequired,
  guests: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default BookingSummary;
