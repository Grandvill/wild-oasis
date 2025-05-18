'use client';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../ui/Logo';

const FooterSection = styled.footer`
  background-color: var(--color-grey-100);
  color: var(--color-grey-700);
  padding: 6rem 0 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(to right, var(--color-brand-500), var(--color-brand-700));
  }
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--color-grey-300);
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  margin-bottom: 1.5rem;

  img {
    height: 4.5rem;
    width: auto;
  }
`;

const FooterDescription = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--color-grey-600);
  max-width: 30rem;

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const FooterHeading = styled.h4`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--color-grey-800);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--color-brand-500);

    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 1rem;

  a {
    color: var(--color-grey-600);
    text-decoration: none;
    font-size: 1.4rem;
    transition: color 0.2s ease;
    display: inline-block;
    position: relative;

    &:hover {
      color: var(--color-brand-600);
    }

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -2px;
      left: 0;
      background-color: var(--color-brand-500);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ContactIcon = styled.span`
  margin-right: 1rem;
  font-size: 1.6rem;
  color: var(--color-brand-500);
`;

const Copyright = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: center;
  margin: 2rem 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;

  a {
    color: var(--color-grey-500);
    font-size: 1.3rem;
    text-decoration: none;

    &:hover {
      color: var(--color-brand-500);
      text-decoration: underline;
    }
  }
`;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterSection>
      <FooterContainer>
        <FooterTop>
          <FooterColumn>
            <FooterLogo>
              <Logo />
            </FooterLogo>
            <FooterDescription>Wild Oasis provides premium cabin experiences in the most beautiful natural settings. Escape the ordinary and reconnect with nature.</FooterDescription>
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinks>
              <FooterLink>
                <Link to="/">Home</Link>
              </FooterLink>
              <FooterLink>
                <Link to="#cabins">Our Cabins</Link>
              </FooterLink>
              <FooterLink>
                <Link to="#about">About Us</Link>
              </FooterLink>
              <FooterLink>
                <Link to="#testimonials">Testimonials</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/booking">Book Now</Link>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Contact Us</FooterHeading>
            <ContactItem>
              <ContactIcon>📍</ContactIcon>
              <span>Sudirman Central Business District, Jakarta, Indonesia</span>
            </ContactItem>
            <ContactItem>
              <ContactIcon>📞</ContactIcon>
              <span>+1 222-345-0000</span>
            </ContactItem>
            <ContactItem>
              <ContactIcon>✉️</ContactIcon>
              <span>zahidan23@gmail.com</span>
            </ContactItem>
            <ContactItem>
              <ContactIcon>⏰</ContactIcon>
              <span>Mon-Fri: 9am - 5pm</span>
            </ContactItem>
          </FooterColumn>
        </FooterTop>

        <FooterBottom>
          <LegalLinks>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Sitemap</a>
          </LegalLinks>
          <Copyright>&copy; {currentYear} Wild Oasis. All rights reserved.</Copyright>
        </FooterBottom>
      </FooterContainer>
    </FooterSection>
  );
}

export default Footer;
