import { format } from 'date-fns';
import PropTypes from 'prop-types';
import AnimatedSection from '../landing-page/AnimatedSection';
import { useCreateBooking } from './useCreateBooking';
import { BookingSummary as StyledBookingSummary, SummaryTitle, SummaryItem, TotalPrice, BookingButton } from './Styles';
import toast from 'react-hot-toast';

function BookingSummary({ cabinData, checkInDate, checkOutDate, nights, guests, subtotal, tax, total, guestInfo, selectedCabinId }) {
  const { createBooking, isLoading, isSuccess, error } = useCreateBooking();

  const handleBookingSubmit = () => {
    console.log('RAW guestInfo:', guestInfo);
    if (!guestInfo || !guestInfo.fullName) {
      console.error('❌ guestInfo is empty or invalid');
      toast.error('Please fill in all required guest information.', {
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
      return;
    }

    const guestData = {
      fullName: guestInfo.fullName,
      email: guestInfo.email,
      nationality: guestInfo.nationality,
      nationalID: guestInfo.nationalID,
      countryFlag: `https://flagcdn.com/${guestInfo.nationality?.toLowerCase().slice(0, 2)}.svg`,
    };

    console.log('✅ guestData to send:', guestData);

    const bookingData = {
      created_at: new Date().toISOString(),
      startDate: checkInDate.toISOString(),
      endDate: checkOutDate.toISOString(),
      cabinId: selectedCabinId,
      hasBreakfast: true,
      observations: guestInfo?.observations || '',
      isPaid: false,
      numGuests: guests,
      numNights: nights,
      status: 'unconfirmed',
      cabinPrice: cabinData ? cabinData.price : 0,
      extrasPrice: 0,
      totalPrice: (cabinData ? cabinData.price * nights : 0) + (cabinData ? cabinData.price * nights * 0.1 : 0),
    };

    console.log('Booking data to send:', bookingData);

    createBooking(
      { guestData, bookingData },
      {
        onSuccess: () => {
          toast.success('Booking confirmed successfully!', {
            style: {
              background: '#10B981',
              color: '#fff',
            },
          });
        },
        onError: (err) => {
          toast.error('Failed to confirm booking. Please try again.', {
            style: {
              background: '#EF4444',
              color: '#fff',
            },
          });
        },
      }
    );
  };

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

        <BookingButton variation="primary" size="large" onClick={handleBookingSubmit} disabled={isLoading}>
          Confirm Booking
        </BookingButton>
      </StyledBookingSummary>
    </AnimatedSection>
  );
}

BookingSummary.propTypes = {
  cabinData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    capacity: PropTypes.number,
  }),
  checkInDate: PropTypes.instanceOf(Date).isRequired,
  checkOutDate: PropTypes.instanceOf(Date).isRequired,
  nights: PropTypes.number.isRequired,
  guests: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  guestInfo: PropTypes.object.isRequired,
  selectedCabinId: PropTypes.number,
};

BookingSummary.defaultProps = {
  cabinData: null,
  selectedCabinId: null,
};

export default BookingSummary;
