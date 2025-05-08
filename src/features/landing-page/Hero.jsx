// components/Hero.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  background-color: var(--color-grey-50);
  text-align: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 70% 30%, var(--color-brand-900), transparent 60%);
    opacity: 0.3;
    z-index: -1;
  }
`;

const Title = styled.h2`
  font-size: 5.6rem;
  font-weight: bold;
  margin-bottom: 2rem;
  background: linear-gradient(to right, var(--color-brand-100), var(--color-brand-500));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
`;

const Subtitle = styled.p`
  font-size: 2rem;
  margin-bottom: 4rem;
  max-width: 70ch;
  color: var(--color-grey-600);
  line-height: 1.6;
`;

const BookingButton = styled(Link)`
  background-color: var(--color-brand-600);
  color: var(--color-grey-0);
  padding: 1.2rem 2.8rem;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  text-decoration: none;
  font-size: 1.6rem;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.5);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.7);
  }

  &:active {
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s ease;
    z-index: 1;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  span {
    position: relative;
    z-index: 2;
  }
`;

function Hero() {
  return (
    <HeroSection>
      <Title>Temukan Cabin Impian Anda</Title>
      <Subtitle>Booking cabin dengan nyaman, cepat, dan aman di Wild Oasis</Subtitle>
      <BookingButton to="/booking">
        <span>Booking Sekarang</span>
      </BookingButton>
    </HeroSection>
  );
}

export default Hero;
