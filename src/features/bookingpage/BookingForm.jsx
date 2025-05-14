import PropTypes from 'prop-types';
import DateRangePicker from './DataRangePicker';
import { BookingSection } from './Styles';

function BookingForm({
  checkInDate,
  checkOutDate,
  onCheckInDateChange,
  onCheckOutDateChange,
  cabins,
  selectedCabinId,
  onCabinSelect,
  guests,
  onGuestsChange,
  selectedCabinData, // Keep for compatibility but make optional
}) {
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
      price: PropTypes.number.isRequired, // Use regularPrice to match data
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
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number, // Use regularPrice to match data
    image: PropTypes.string,
    capacity: PropTypes.number,
    bedrooms: PropTypes.number,
    bathrooms: PropTypes.number,
  }), // Optional, not required
};

BookingForm.defaultProps = {
  cabins: [],
  selectedCabinId: null,
  // Remove selectedCabinData default to avoid conflicts
};

export default BookingForm;
