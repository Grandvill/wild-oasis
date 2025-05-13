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
  const [isLoading, setIsLoading] = useState(true);
  const [cabins, setCabins] = useState([]);
  const [selectedCabinId, setSelectedCabinId] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000)); // tomorrow
  const [guests, setGuests] = useState(1);

  // Calculate selected cabin data
  const selectedCabinData = cabins.find((cabin) => cabin.id === selectedCabinId) || null;

  // Calculate booking details
  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;
  const subtotal = selectedCabinData ? nights * selectedCabinData.price : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  useEffect(() => {
    const fetchCabins = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        const data = [
          {
            id: 1,
            name: 'Rustic Retreat',
            price: 129,
            image: '/cabins/rustic-retreat.jpg',
            capacity: 4,
            bedrooms: 2,
            bathrooms: 1,
          },
          {
            id: 2,
            name: 'Forest Haven',
            price: 159,
            image: '/cabins/forest-haven.jpg',
            capacity: 6,
            bedrooms: 3,
            bathrooms: 2,
          },
          {
            id: 3,
            name: 'Mountain View',
            price: 189,
            image: '/cabins/mountain-view.jpg',
            capacity: 8,
            bedrooms: 4,
            bathrooms: 3,
          },
          {
            id: 4,
            name: 'Lakeside Cabin',
            price: 139,
            image: '/cabins/lakeside-cabin.jpg',
            capacity: 4,
            bedrooms: 2,
            bathrooms: 1,
          },
        ];

        setCabins(data);
      } catch (error) {
        console.error('Error fetching cabins:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCabins();
  }, []);

  useEffect(() => {
    if (selectedCabinId && activeStep < 2) {
      setActiveStep(2);
    }
  }, [selectedCabinId, activeStep]);

  return (
    <PageContainer>
      <Navbar />
      <BookingHero />
      <BookingContent>
        <BookingProgress activeStep={activeStep} setActiveStep={setActiveStep} />
        <BookingGrid>
          <BookingFormContainer>
            {/* Date selection form */}
            {isLoading ? (
              <BookingSection>
                <div>Loading cabins...</div>
              </BookingSection>
            ) : (
              <>
                <BookingForm
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  onCheckInDateChange={setCheckInDate}
                  onCheckOutDateChange={setCheckOutDate}
                  cabins={cabins}
                  selectedCabinId={selectedCabinId}
                  onCabinSelect={setSelectedCabinId}
                  guests={guests}
                  onGuestsChange={setGuests}
                  selectedCabinData={selectedCabinData}
                />
                <CabinSelection cabins={Array.isArray(cabins) ? cabins : []} selectedCabinId={selectedCabinId} onSelectCabin={setSelectedCabinId} />
                {selectedCabinData ? (
                  <GuestInformation guests={guests} maxGuests={selectedCabinData.capacity} onGuestsChange={setGuests} />
                ) : (
                  <BookingSection>
                    <h2>3. Guest Information</h2>
                    <p>Please select a cabin first</p>
                  </BookingSection>
                )}
              </>
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
