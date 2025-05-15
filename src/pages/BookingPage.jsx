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
import { useCabins } from '../features/cabins/useCabins';
import { useSettings } from '../features/settings/useSettings';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';

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
  const { settings, isLoading: isLoadingSettings, error: settingsError } = useSettings();
  const { cabins, isLoading: isLoadingCabins, error: cabinsError } = useCabins();
  const [selectedCabinId, setSelectedCabinId] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000));
  const [guests, setGuests] = useState(1);
  const [guestInfo, setGuestInfo] = useState({
    fullName: '',
    email: '',
    nationality: '',
    nationalID: '',
    observations: '',
    hasBreakfast: false,
  });

  useEffect(() => {
    if (selectedCabinId && activeStep < 2) {
      setActiveStep(2);
    }
  }, [selectedCabinId, activeStep]);

  // Define variables that depend on settings and cabins
  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings || {};
  const selectedCabinData = cabins?.find((cabin) => cabin.id === selectedCabinId) || null;
  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;
  const basePrice = selectedCabinData ? nights * selectedCabinData.regularPrice : 0;
  const breakfastFee = guestInfo.hasBreakfast && breakfastPrice ? breakfastPrice * guests * nights : 0;
  const subtotal = basePrice + breakfastFee;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    const newNights = differenceInDays(checkOutDate, date);
    if (minBookingLength && maxBookingLength && (newNights < minBookingLength || newNights > maxBookingLength)) {
      const newCheckOutDate = new Date(date);
      newCheckOutDate.setDate(date.getDate() + minBookingLength);
      setCheckOutDate(newCheckOutDate);
      toast.info(`Adjusted check-out date to meet minimum stay of ${minBookingLength} nights.`, {
        style: { background: '#3b82f6', color: '#fff' },
      });
    }
  };

  const handleCheckOutDateChange = (date) => {
    const newNights = differenceInDays(date, checkInDate);
    if (minBookingLength && newNights < minBookingLength) {
      toast.error(`Minimum stay is ${minBookingLength} nights.`, {
        style: { background: '#EF4444', color: '#fff' },
      });
      return;
    }
    if (maxBookingLength && newNights > maxBookingLength) {
      toast.error(`Maximum stay is ${maxBookingLength} nights.`, {
        style: { background: '#EF4444', color: '#fff' },
      });
      return;
    }
    setCheckOutDate(date);
  };

  const handleBookingSubmit = () => {
    const bookingData = {
      created_at: new Date().toISOString(),
      startDate: checkInDate.toISOString(),
      endDate: checkOutDate.toISOString(),
      cabinId: selectedCabinId,
      guestId: null,
      hasBreakfast: guestInfo.hasBreakfast || false,
      observations: guestInfo.observations || '',
      isPaid: false,
      numGuests: guests,
      numNights: nights,
      cabinPrice: basePrice,
      extrasPrice: breakfastFee,
      totalPrice: total,
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
  };

  return (
    <PageContainer>
      <Navbar />
      <BookingHero />
      <BookingContent>
        {(isLoadingSettings || isLoadingCabins) && <Spinner />}
        {settingsError && <div>Error loading settings: {settingsError.message}</div>}
        {cabinsError && <div>Error loading cabins: {cabinsError.message}</div>}
        {!(isLoadingSettings || isLoadingCabins || settingsError || cabinsError) && (
          <>
            <BookingProgress activeStep={activeStep} setActiveStep={setActiveStep} />
            <BookingGrid>
              <BookingFormContainer>
                <BookingForm
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  onCheckInDateChange={handleCheckInDateChange}
                  onCheckOutDateChange={handleCheckOutDateChange}
                  cabins={cabins || []}
                  selectedCabinId={selectedCabinId}
                  onCabinSelect={setSelectedCabinId}
                  guests={guests}
                  onGuestsChange={setGuests}
                />

                <CabinSelection cabins={cabins} selectedCabinId={selectedCabinId} onSelectCabin={setSelectedCabinId} />

                {selectedCabinData ? (
                  <GuestInformation
                    guests={guests}
                    maxGuests={Math.min(selectedCabinData.maxCapacity, maxGuestsPerBooking || Infinity)}
                    breakfastPrice={breakfastPrice || 0}
                    onGuestsChange={setGuests}
                    guestInfo={guestInfo}
                    onGuestInfoChange={setGuestInfo}
                  />
                ) : (
                  <BookingSection>
                    <h2>3. Guest Information</h2>
                    <p>Please select a cabin first</p>
                  </BookingSection>
                )}
              </BookingFormContainer>

              <BookingSummaryContainer>
                <BookingSummary
                  cabinData={selectedCabinData ? { ...selectedCabinData, price: selectedCabinData.regularPrice } : null}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  nights={nights}
                  guests={guests}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                  guestInfo={guestInfo}
                  selectedCabinId={selectedCabinId}
                  settings={settings}
                  onBookingSubmit={handleBookingSubmit}
                />
              </BookingSummaryContainer>
            </BookingGrid>
          </>
        )}
      </BookingContent>
    </PageContainer>
  );
}

export default BookingPage;
