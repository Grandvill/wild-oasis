// components/Hero.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding: 4rem;
  background: linear-gradient(135deg, var(--color-brand-50), var(--color-brand-900));
  color: var(--color-grey-0);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Subtitle = styled.p`
  font-size: 2rem;
  margin-bottom: 4rem;
  max-width: 70ch;
`;

const BookingButton = styled(Link)`
  background-color: var(--color-grey-0);
  color: var(--color-blue-700);
  padding: 1.2rem 2.4rem;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  text-decoration: none;
  font-size: 1.6rem;
  box-shadow: var(--shadow-md);

  &:hover {
    background-color: var(--color-blue-100);
  }
`;

function Hero() {
  return (
    <HeroSection>
      <Title>Temukan Cabin Impian Anda</Title>
      <Subtitle>Booking cabin dengan nyaman, cepat, dan aman di Wild Oasis</Subtitle>
      <BookingButton to="/booking">Booking Sekarang</BookingButton>
    </HeroSection>
  );
}

export default Hero;
