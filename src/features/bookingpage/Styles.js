import styled from 'styled-components';
import Button from '../../ui/Button';

// Page Layout
export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-grey-50);
  overflow-x: hidden;
`;

// Hero Section
export const BookingHeroWrapper = styled.div`
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

export const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const HeroSubtitle = styled.p`
  font-size: 1.8rem;
  max-width: 60rem;
  margin: 0 auto;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

// Booking Content
export const BookingContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;

export const BookingSection = styled.section`
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

export const BookingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

// Cabin Selection
export const CabinSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const CabinCard = styled.div`
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

export const CabinImage = styled.div`
  height: 18rem;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
`;

export const CabinInfo = styled.div`
  padding: 1.5rem;
`;

export const CabinName = styled.h4`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--color-grey-800);
`;

export const CabinPrice = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-brand-600);
  margin-bottom: 1rem;
`;

export const CabinFeatures = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

export const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Guest Form
export const GuestForm = styled.form`
  display: grid;
  gap: 2rem;
`;

export const FormGroup = styled.div`
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

// Booking Summary
export const BookingSummary = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 3rem;
  position: sticky;
  top: 10rem;
`;

export const SummaryTitle = styled.h3`
  font-size: 2rem;
  color: var(--color-grey-800);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

export const SummaryItem = styled.div`
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

export const TotalPrice = styled.div`
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

export const BookingButton = styled(Button)`
  width: 100%;
  margin-top: 2rem;
  padding: 1.2rem;
  font-size: 1.6rem;
`;

// Progress Steps
export const ProgressSteps = styled.div`
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

export const Step = styled.div`
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
