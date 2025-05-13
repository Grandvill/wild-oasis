'use client';

import { useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';
import BookingForm from '../features/bookingpage/BookingForm';
import CabinSelection from '../features/bookingpage/CabinSelection';
import GuestInformation from '../features/bookingpage/GuestInformation';
import BookingSummary from '../features/bookingpage/BookingSummary';
import { PageContainer, BookingContent, BookingSection } from '../features/bookingpage/Styles';
import styled from 'styled-components';
import BookingHero from '../features/bookingpage/BookingHero';
import Navbar from '../features/landing-page/Navbar';
import BookingProgress from '../features/bookingpage/BookingProgress';
import { useCabins } from '../features/cabins/useCabins'; // Import custom hook

const BookingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const BookingFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BookingSummaryContainer = styled.div`
  position: sticky;
  top: 20px;
  align-self: start;
`;

function BookingPage() {
  const { cabins, isLoading, error } = useCabins(); // Use custom hook
  const [selectedCabinId, setSelectedCabinId] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000)); // tomorrow
  const [guests, setGuests] = useState(1);

  const [guestInfo, setGuestInfo] = useState({
    fullName: '',
    email: '',
    nationality: '',
    nationalID: '',
    observations: '',
  });

  const selectedCabinData = cabins?.find((cabin) => cabin.id === selectedCabinId) || null;

  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;
  const subtotal = selectedCabinData ? nights * selectedCabinData.regularPrice : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  useEffect(() => {
    if (selectedCabinId && activeStep < 2) {
      setActiveStep(2);
    }
  }, [selectedCabinId, activeStep]);

  const handleBookingSubmit = () => {
    const bookingData = {
      created_at: new Date().toISOString(),
      startDate: checkInDate.toISOString(),
      endDate: checkOutDate.toISOString(),
      cabinId: selectedCabinId,
      guestId: null, // generate or fetch from DB if needed
      hasBreakfast: true,
      observations: guestInfo.observations,
      isPaid: false,
      numGuests: guests,
    };

    const guestData = {
      fullName: guestInfo.fullName,
      email: guestInfo.email,
      nationality: guestInfo.nationality,
      nationalID: guestInfo.nationalID,
      countryFlag: `https://flagcdn.com/${guestInfo.nationality?.toLowerCase().slice(0, 2)}.svg`,
    };

    console.log('Booking:', bookingData);
    console.log('Guest:', guestData);
    // TODO: Submit to Supabase or backend here
  };

  return (
    <PageContainer>
      <Navbar />
      <BookingHero />
      <BookingContent>
        <BookingProgress activeStep={activeStep} setActiveStep={setActiveStep} />
        <BookingGrid>
          <BookingFormContainer>
            <BookingForm
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onCheckInDateChange={setCheckInDate}
              onCheckOutDateChange={setCheckOutDate}
              cabins={cabins || []}
              selectedCabinId={selectedCabinId}
              onCabinSelect={setSelectedCabinId}
              guests={guests}
              onGuestsChange={setGuests}
              selectedCabinData={selectedCabinData}
            />

            {/* Pass only the necessary props to CabinSelection */}
            <CabinSelection cabins={cabins} selectedCabinId={selectedCabinId} onSelectCabin={setSelectedCabinId} />

            {selectedCabinData ? (
              <GuestInformation guests={guests} maxGuests={selectedCabinData.maxCapacity} onGuestsChange={setGuests} guestInfo={guestInfo} onGuestInfoChange={setGuestInfo} />
            ) : (
              <BookingSection>
                <h2>3. Guest Information</h2>
                <p>Please select a cabin first</p>
              </BookingSection>
            )}
          </BookingFormContainer>

          <BookingSummaryContainer>
            <BookingSummary cabinData={selectedCabinData} checkInDate={checkInDate} checkOutDate={checkOutDate} nights={nights} guests={guests} subtotal={subtotal} tax={tax} total={total} />
          </BookingSummaryContainer>
        </BookingGrid>
      </BookingContent>
    </PageContainer>
  );
}

export default BookingPage;
