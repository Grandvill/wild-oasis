'use client';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import PropTypes from 'prop-types';
import AnimatedSection from '../landing-page/AnimatedSection';

const BookingCard = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 3rem;
  position: sticky;
  top: 10rem;
`;

const BookingPrice = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 2rem;

  span {
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--color-grey-600);
  }
`;

const BookingButton = styled(Button)`
  width: 100%;
  padding: 1.2rem;
  font-size: 1.6rem;
  margin-bottom: 2rem;
`;

const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-grey-200);

  p {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.4rem;
    color: var(--color-grey-600);

    svg {
      color: var(--color-brand-600);
    }
  }
`;

function CabinBookingCard({ cabin }) {
  if (!cabin) return null;

  return (
    <AnimatedSection animation="fadeInRight" duration={0.8} delay={0.2}>
      <BookingCard>
        <BookingPrice>
          ${cabin.regularPrice} <span>per night</span>
        </BookingPrice>

        <Link to={`/booking-now?cabin=${cabin.id}`}>
          <BookingButton variation="primary" size="large">
            Book Now
          </BookingButton>
        </Link>

        <Link to={`/booking-now?cabin=${cabin.id}`}>
          <BookingButton variation="secondary" size="large">
            Check Availability
          </BookingButton>
        </Link>

        <BookingInfo>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {cabin.minStay || 2}-night minimum stay
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Up to {cabin.maxCapacity} guests
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            {cabin.bedrooms} bedrooms, {cabin.bathrooms} bathrooms
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Check-in: 3:00 PM
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 8 14"></polyline>
            </svg>
            Check-out: 11:00 AM
          </p>
        </BookingInfo>
      </BookingCard>
    </AnimatedSection>
  );
}

CabinBookingCard.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number,
    regularPrice: PropTypes.number,
    maxCapacity: PropTypes.number,
    bedrooms: PropTypes.number,
    bathrooms: PropTypes.number,
    minStay: PropTypes.number,
  }),
};

export default CabinBookingCard;
