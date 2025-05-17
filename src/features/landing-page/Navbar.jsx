'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../ui/Logo';
import DarkModeToggle from '../../ui/DarkModeToggle';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 4rem;
  transition: all 0.3s ease;
  background-color: ${(props) => (props.scrolled ? 'var(--backdrop-color)' : 'transparent')};
  backdrop-filter: ${(props) => (props.scrolled ? 'blur(10px)' : 'none')};
  -webkit-backdrop-filter: ${(props) => (props.scrolled ? 'blur(10px)' : 'none')};
  border-bottom: ${(props) => (props.scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none')};
  box-shadow: ${(props) => (props.scrolled ? 'var(--shadow-sm)' : 'none')};

  @media (max-width: 768px) {
    padding: 1.2rem 2rem;
  }
`;

const LogoWrapper = styled.div`
  img {
    height: 4.5rem !important;
    width: auto;
    transition: all 0.3s ease;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    font-weight: 500;
    color: var(--color-blue-700);
    position: relative;
    transition: all 0.3s ease;
    text-decoration: none;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--color-brand-500);
      transition: width 0.3s ease;
    }

    &:hover {
      color: var(--color-brand-500);

      &::after {
        width: 100%;
      }
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const LoginButton = styled(Link)`
  background-color: var(--color-brand-600);
  color: var(--color-grey-0);
  padding: 0.8rem 1.6rem;
  border-radius: var(--border-radius-sm);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.4rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color-brand-700);
    transform: translateY(-2px);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--color-brand-600);
  font-size: 2.4rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? '0' : '-100%')};
  width: 70%;
  max-width: 300px;
  height: 100vh;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  transition: right 0.3s ease;
  z-index: 1001;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const MobileNavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 5rem;

  a {
    font-weight: 500;
    color: var(--color-blue-700);
    font-size: 1.8rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-grey-200);
    display: block;
    text-decoration: none;

    &:hover {
      color: var(--color-brand-500);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: var(--color-brand-600);
  font-size: 2.4rem;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 1000;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Nav scrolled={scrolled}>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <LeftSection>
          <NavLinks>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/explore-cabin">Cabin</Link>
            </li>
            <li>
              <Link to="/booking-now">Booking</Link>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
            <li>
              <a href="#contact-us">Contact Us</a>
            </li>
          </NavLinks>
        </LeftSection>

        <RightSection>
          <DarkModeToggle />
          <LoginButton to="/login">Login</LoginButton>
          <MobileMenuButton onClick={toggleMobileMenu} aria-label="Open menu">
            ☰
          </MobileMenuButton>
        </RightSection>
      </Nav>

      <Overlay isOpen={mobileMenuOpen} onClick={closeMobileMenu} />

      <MobileMenu isOpen={mobileMenuOpen}>
        <CloseButton onClick={closeMobileMenu} aria-label="Close menu">
          ✕
        </CloseButton>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <MobileNavLinks>
          <li>
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/explore-cabin" onClick={closeMobileMenu}>
              Cabin
            </Link>
          </li>
          <li>
            <Link to="/booking-now" onClick={closeMobileMenu}>
              Booking
            </Link>
          </li>
          <li>
            <a href="#about" onClick={closeMobileMenu}>
              About
            </a>
          </li>
          <li>
            <a href="#testimonials" onClick={closeMobileMenu}>
              Testimonials
            </a>
          </li>
          <li>
            <a href="#contact-us" onClick={closeMobileMenu}>
              Contact Us
            </a>
          </li>
          <li>
            <Link to="/login" onClick={closeMobileMenu}>
              Login
            </Link>
          </li>
        </MobileNavLinks>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
          <DarkModeToggle />
        </div>
      </MobileMenu>
    </>
  );
}

export default Navbar;
