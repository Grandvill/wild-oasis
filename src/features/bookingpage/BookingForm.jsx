import PropTypes from 'prop-types';
import DateRangePicker from './DataRangePicker';
import { BookingSection } from './Styles';

function BookingForm({ checkInDate, checkOutDate, onCheckInDateChange, onCheckOutDateChange, cabins, selectedCabinId, onCabinSelect, guests, onGuestsChange }) {
  return (
    <div>
      <BookingSection>
        <h2>1. Select Your Dates</h2>
        <DateRangePicker startDate={checkInDate} endDate={checkOutDate} onStartDateChange={onCheckInDateChange} onEndDateChange={onCheckOutDateChange} minDate={new Date()} />
      </BookingSection>
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
      regularPrice: PropTypes.number.isRequired, // Changed from price
      image: PropTypes.string.isRequired,
      maxCapacity: PropTypes.number.isRequired, // Changed from capacity
      bedrooms: PropTypes.number.isRequired,
      bathrooms: PropTypes.number.isRequired,
    })
  ),
  selectedCabinId: PropTypes.number,
  onCabinSelect: PropTypes.func.isRequired,
  guests: PropTypes.number.isRequired,
  onGuestsChange: PropTypes.func.isRequired,
};

BookingForm.defaultProps = {
  cabins: [],
  selectedCabinId: null,
};

export default BookingForm;
