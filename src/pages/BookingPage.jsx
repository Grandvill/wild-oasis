'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { format, addDays, differenceInDays } from 'date-fns';
import Navbar from '../features/landing-page/Navbar';
import Footer from '../features/landing-page/Footer';
import AnimatedSection from '../features/landing-page/AnimatedSection';
import DateRangePicker from '../features/landing-page/DataRangePicker';
import Button from '../ui/Button';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-grey-50);
  overflow-x: hidden;
`;

const BookingHero = styled.div`
  height: 40vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/cabin-booking-hero.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 0 2rem;
  margin-top: 8rem;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const HeroSubtitle = styled.p`
  font-size: 1.8rem;
  max-width: 60rem;
  margin: 0 auto;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const BookingContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;

const BookingSection = styled.section`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 3rem;
  margin-bottom: 4rem;

  h2 {
    font-size: 2.4rem;
    color: var(--color-grey-800);
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-grey-200);
  }
`;

const BookingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const CabinSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CabinCard = styled.div`
  border: 2px solid ${(props) => (props.selected ? 'var(--color-brand-600)' : 'var(--color-grey-200)')};
  border-radius: var(--border-radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }

  ${(props) =>
    props.selected &&
    `
    &::after {
      content: "✓";
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 2.4rem;
      height: 2.4rem;
      background-color: var(--color-brand-600);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
  `}
`;

const CabinImage = styled.div`
  height: 18rem;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
`;

const CabinInfo = styled.div`
  padding: 1.5rem;
`;

const CabinName = styled.h4`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--color-grey-800);
`;

const CabinPrice = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-brand-600);
  margin-bottom: 1rem;
`;

const CabinFeatures = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GuestForm = styled.form`
  display: grid;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  label {
    font-size: 1.6rem;
    color: var(--color-grey-700);
  }

  input,
  select {
    padding: 1.2rem;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    font-size: 1.6rem;
    background-color: var(--color-grey-0);

    &:focus {
      outline: none;
      border-color: var(--color-brand-600);
      box-shadow: 0 0 0 2px rgba(var(--color-brand-600-rgb, 79, 70, 229), 0.1);
    }
  }
`;

const BookingSummary = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 3rem;
  position: sticky;
  top: 10rem;
`;

const SummaryTitle = styled.h3`
  font-size: 2rem;
  color: var(--color-grey-800);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;

  .label {
    color: var(--color-grey-600);
  }

  .value {
    font-weight: 600;
    color: var(--color-grey-800);
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-grey-200);
  font-size: 1.8rem;
  font-weight: 600;

  .label {
    color: var(--color-grey-800);
  }

  .value {
    color: var(--color-brand-600);
  }
`;

const BookingButton = styled(Button)`
  width: 100%;
  margin-top: 2rem;
  padding: 1.2rem;
  font-size: 1.6rem;
`;

const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 1.5rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-grey-200);
    z-index: 0;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  .step-number {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${(props) => (props.active ? 'var(--color-brand-600)' : 'var(--color-grey-200)')};
    color: ${(props) => (props.active ? 'white' : 'var(--color-grey-600)')};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-bottom: 0.8rem;
    transition: all 0.3s ease;
  }

  .step-label {
    font-size: 1.4rem;
    color: ${(props) => (props.active ? 'var(--color-grey-800)' : 'var(--color-grey-500)')};
    font-weight: ${(props) => (props.active ? '600' : 'normal')};
  }
`;

function BookingPage() {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 3));
  const [selectedCabin, setSelectedCabin] = useState(1);
  const [guests, setGuests] = useState(2);
  const [activeStep, setActiveStep] = useState(1);

  const cabins = [
    {
      id: 1,
      name: 'Rustic Retreat',
      price: 150,
      image: '/cabin-001.jpg',
      capacity: 2,
      bedrooms: 1,
      bathrooms: 1,
    },
    {
      id: 2,
      name: 'Forest Haven',
      price: 200,
      image: '/cabin-002.jpg',
      capacity: 4,
      bedrooms: 2,
      bathrooms: 1,
    },
    {
      id: 3,
      name: 'Mountain View',
      price: 250,
      image: '/cabin-003.jpg',
      capacity: 6,
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: 4,
      name: 'Lakeside Cabin',
      price: 300,
      image: '/cabin-004.jpg',
      capacity: 8,
      bedrooms: 4,
      bathrooms: 2,
    },
  ];

  const selectedCabinData = cabins.find((cabin) => cabin.id === selectedCabin);
  const nights = differenceInDays(checkOutDate, checkInDate);
  const subtotal = selectedCabinData.price * nights;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <PageContainer>
      <Navbar />

      <BookingHero>
        <HeroTitle>Book Your Cabin</HeroTitle>
        <HeroSubtitle>Reserve your perfect getaway in nature with our easy booking process</HeroSubtitle>
      </BookingHero>

      <BookingContent>
        <ProgressSteps>
          <Step active={activeStep >= 1} onClick={() => setActiveStep(1)}>
            <div className="step-number">1</div>
            <div className="step-label">Dates</div>
          </Step>
          <Step active={activeStep >= 2} onClick={() => setActiveStep(2)}>
            <div className="step-number">2</div>
            <div className="step-label">Cabin</div>
          </Step>
          <Step active={activeStep >= 3} onClick={() => setActiveStep(3)}>
            <div className="step-number">3</div>
            <div className="step-label">Details</div>
          </Step>
          <Step active={activeStep >= 4}>
            <div className="step-number">4</div>
            <div className="step-label">Confirm</div>
          </Step>
        </ProgressSteps>

        <AnimatedSection animation="fadeInUp" duration={0.8}>
          <BookingGrid>
            <div>
              <BookingSection>
                <h2>1. Select Your Dates</h2>
                <DateRangePicker startDate={checkInDate} endDate={checkOutDate} onStartDateChange={setCheckInDate} onEndDateChange={setCheckOutDate} minDate={new Date()} />
              </BookingSection>

              <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.2}>
                <BookingSection>
                  <h2>2. Choose Your Cabin</h2>
                  <CabinSelection>
                    {cabins.map((cabin) => (
                      <CabinCard key={cabin.id} selected={selectedCabin === cabin.id} onClick={() => setSelectedCabin(cabin.id)}>
                        <CabinImage image={cabin.image} />
                        <CabinInfo>
                          <CabinName>{cabin.name}</CabinName>
                          <CabinPrice>${cabin.price} / night</CabinPrice>
                          <CabinFeatures>
                            <Feature>
                              <span>👥</span> {cabin.capacity} guests
                            </Feature>
                            <Feature>
                              <span>🛏️</span> {cabin.bedrooms} bedrooms
                            </Feature>
                            <Feature>
                              <span>🚿</span> {cabin.bathrooms} bathrooms
                            </Feature>
                          </CabinFeatures>
                        </CabinInfo>
                      </CabinCard>
                    ))}
                  </CabinSelection>
                </BookingSection>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.4}>
                <BookingSection>
                  <h2>3. Guest Information</h2>
                  <GuestForm>
                    <FormGroup>
                      <label htmlFor="fullName">Full Name</label>
                      <input type="text" id="fullName" placeholder="Enter your full name" />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" placeholder="Enter your email" />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" placeholder="Enter your phone number" />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="guests">Number of Guests</label>
                      <select id="guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                        {Array.from({ length: selectedCabinData.capacity }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="specialRequests">Special Requests</label>
                      <input type="text" id="specialRequests" placeholder="Any special requests or requirements?" />
                    </FormGroup>
                  </GuestForm>
                </BookingSection>
              </AnimatedSection>
            </div>

            <AnimatedSection animation="fadeInRight" duration={0.8} delay={0.2}>
              <BookingSummary>
                <SummaryTitle>Booking Summary</SummaryTitle>

                <SummaryItem>
                  <span className="label">Cabin</span>
                  <span className="value">{selectedCabinData.name}</span>
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
                  <span className="value">${selectedCabinData.price} / night</span>
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
              </BookingSummary>
            </AnimatedSection>
          </BookingGrid>
        </AnimatedSection>
      </BookingContent>

      <Footer />
    </PageContainer>
  );
}

export default BookingPage;
