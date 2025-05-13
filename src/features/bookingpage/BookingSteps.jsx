import BookingForm from './BookingForm';
import CabinSelection from './CabinSelection';
import GuestInformation from './GuestInformation';

function BookingSteps({ checkInDate, checkOutDate, setCheckInDate, setCheckOutDate, cabins, selectedCabin, setSelectedCabin, guests, setGuests }) {
  return (
    <>
      <BookingForm checkInDate={checkInDate} checkOutDate={checkOutDate} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} />
      <CabinSelection cabins={cabins} selectedCabin={selectedCabin} setSelectedCabin={setSelectedCabin} />
      <GuestInformation guests={guests} setGuests={setGuests} />
    </>
  );
}

export default BookingSteps;
