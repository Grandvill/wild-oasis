import PropTypes from 'prop-types';
import DateRangePicker from './DataRangePicker';
import { BookingSection } from './Styles';

function BookingForm({ checkInDate, checkOutDate, onCheckInDateChange, onCheckOutDateChange, cabins, selectedCabinId, onCabinSelect, guests, onGuestsChange, selectedCabinData }) {
  return (
    <div>
      <BookingSection>
        <h2>1. Select Your Dates</h2>
        <DateRangePicker startDate={checkInDate} endDate={checkOutDate} onStartDateChange={onCheckInDateChange} onEndDateChange={onCheckOutDateChange} minDate={new Date()} />
      </BookingSection>

      {/* No CabinSelection component here - it's imported and rendered directly in BookingPage.jsx */}

      {/* No GuestInformation component here - it's imported and rendered directly in BookingPage.jsx */}
    </div>
  );
}

BookingForm.propTypes = {
  checkInDate: PropTypes.instanceOf(Date).isRequired,
  checkOutDate: PropTypes.instanceOf(Date).isRequired,
  onCheckInDateChange: PropTypes.func.isRequired,
  onCheckOutDateChange: PropTypes.func.isRequired,
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
  ),
  selectedCabinId: PropTypes.number,
  onCabinSelect: PropTypes.func.isRequired,
  guests: PropTypes.number.isRequired,
  onGuestsChange: PropTypes.func.isRequired,
  selectedCabinData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
  }).isRequired, // Make it required if you are passing a value.
};

BookingForm.defaultProps = {
  cabins: [],
  selectedCabinId: null,
  selectedCabinData: null, // Allow null as the default.
};

export default BookingForm;
