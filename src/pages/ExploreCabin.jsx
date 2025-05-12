'use client';

import { useState, useRef } from 'react';
import styled from 'styled-components';
// Update the import for Link to ensure proper routing
import { Link } from 'react-router-dom';
import Navbar from '../features/landing-page/Navbar';
import Footer from '../features/landing-page/Footer';
import AnimatedSection from '../features/landing-page/AnimatedSection';
import Button from '../ui/Button';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-grey-50);
  overflow-x: hidden;
`;

const CabinHero = styled.div`
  height: 70vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/cabin-hero.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 4rem;
  color: white;
  margin-top: 8rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  width: 100%;
`;

const CabinName = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 3.6rem;
  }
`;

const CabinLocation = styled.p`
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CabinPrice = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  span {
    font-size: 1.8rem;
    font-weight: 400;
  }
`;

const BookButton = styled(Button)`
  padding: 1.2rem 3rem;
  font-size: 1.6rem;
`;

const ContentContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 6rem 2rem;

  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 1024px) {
    order: -1;
  }
`;

const Section = styled.section`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 3rem;

  h2 {
    font-size: 2.4rem;
    color: var(--color-grey-800);
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-grey-200);
  }

  p {
    font-size: 1.6rem;
    line-height: 1.6;
    color: var(--color-grey-700);
    margin-bottom: 1.5rem;
  }
`;

const FeaturesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem;
  color: var(--color-grey-700);

  svg {
    color: var(--color-brand-600);
    flex-shrink: 0;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 200px);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 150px);
  }
`;

const GalleryImage = styled.div`
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: var(--shadow-md);
  }

  &:first-child {
    grid-column: span 2;
    grid-row: span 2;

    @media (max-width: 768px) {
      grid-column: span 2;
      grid-row: span 1;
    }
  }
`;

const FullscreenGallery = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullscreenImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 3rem;
  cursor: pointer;
`;

const NavButtons = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const AmenitiesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AmenityGroup = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.8rem;
    color: var(--color-grey-800);
    margin-bottom: 1rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.6rem;
    color: var(--color-grey-700);
  }

  svg {
    color: var(--color-brand-600);
  }
`;

const Map = styled.div`
  height: 30rem;
  background-color: var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ReviewCard = styled.div`
  padding: 2rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  border-left: 4px solid var(--color-brand-500);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ReviewAuthor = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const ReviewDate = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const ReviewText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: var(--color-grey-700);
`;

const Rating = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-bottom: 1rem;
  color: var(--color-brand-500);
  font-size: 1.6rem;
`;

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

function ExploreCabin() {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const galleryRef = useRef(null);

  const cabinImages = ['/cabin-detail-1.png', '/cabin-detail-2.jpg', '/cabin-detail-3.png', '/cabin-detail-4.png', '/cabin-detail-5.png'];

  const openFullscreen = (index) => {
    setFullscreenImage(index);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const nextImage = () => {
    setFullscreenImage((prev) => (prev + 1) % cabinImages.length);
  };

  const prevImage = () => {
    setFullscreenImage((prev) => (prev - 1 + cabinImages.length) % cabinImages.length);
  };

  return (
    <PageContainer>
      <Navbar />

      <CabinHero>
        <HeroContent>
          <CabinName>Mountain View Cabin</CabinName>
          <CabinLocation>
            <span>📍</span> Blue Ridge Mountains, North Carolina
          </CabinLocation>
          <CabinPrice>
            $250 <span>per night</span>
          </CabinPrice>
          <Link to="/booking-now">
            <BookButton variation="primary" size="large">
              Book Now
            </BookButton>
          </Link>
        </HeroContent>
      </CabinHero>

      <ContentContainer>
        <ContentGrid>
          <MainContent>
            <AnimatedSection animation="fadeInUp" duration={0.8}>
              <Section>
                <h2>About This Cabin</h2>
                <p>
                  Nestled in the heart of the Blue Ridge Mountains, this stunning cabin offers breathtaking panoramic views and a peaceful retreat from the hustle and bustle of everyday life. With 3 bedrooms and 2 bathrooms, it comfortably
                  accommodates up to 6 guests, making it perfect for family getaways or a trip with friends.
                </p>
                <p>
                  The cabin features an open-concept living area with floor-to-ceiling windows that showcase the magnificent mountain vistas. A stone fireplace serves as the centerpiece of the living room, creating a cozy atmosphere for
                  cool mountain evenings. The fully equipped kitchen includes modern appliances and everything you need to prepare delicious meals during your stay.
                </p>
                <p>
                  Step outside onto the spacious deck to enjoy your morning coffee while watching the sunrise over the mountains, or unwind in the hot tub under a blanket of stars. The surrounding area offers numerous hiking trails, fishing
                  spots, and opportunities to connect with nature.
                </p>

                <FeaturesList>
                  <FeatureItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    3 Bedrooms
                  </FeatureItem>
                  <FeatureItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                    2 Bathrooms
                  </FeatureItem>
                  <FeatureItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                    1,500 sq ft
                  </FeatureItem>
                  <FeatureItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                    Pet Friendly
                  </FeatureItem>
                  <FeatureItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Sleeps 6
                  </FeatureItem>
                  <FeatureItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l4 4M17 5l-4 4M6 13l4 4M10 17l-4 4"></path>
                    </svg>
                    Hot Tub
                  </FeatureItem>
                </FeaturesList>
              </Section>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.2}>
              <Section>
                <h2>Photo Gallery</h2>
                <GalleryGrid ref={galleryRef}>
                  {cabinImages.map((image, index) => (
                    <GalleryImage key={index} src={image} onClick={() => openFullscreen(index)} />
                  ))}
                </GalleryGrid>

                {fullscreenImage !== null && (
                  <FullscreenGallery>
                    <CloseButton onClick={closeFullscreen}>×</CloseButton>
                    <FullscreenImage src={cabinImages[fullscreenImage]} />
                    <NavButtons>
                      <NavButton onClick={prevImage}>←</NavButton>
                      <NavButton onClick={nextImage}>→</NavButton>
                    </NavButtons>
                  </FullscreenGallery>
                )}
              </Section>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.3}>
              <Section>
                <h2>Amenities</h2>
                <AmenitiesList>
                  <AmenityGroup>
                    <h3>Interior</h3>
                    <ul>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Fully equipped kitchen
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Fireplace
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        High-speed WiFi
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Smart TV with streaming
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Washer & Dryer
                      </li>
                    </ul>
                  </AmenityGroup>

                  <AmenityGroup>
                    <h3>Exterior</h3>
                    <ul>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Private hot tub
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Spacious deck with views
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Outdoor grill
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Fire pit
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Parking for 3 vehicles
                      </li>
                    </ul>
                  </AmenityGroup>
                </AmenitiesList>
              </Section>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.4}>
              <Section>
                <h2>Location</h2>
                <p>
                  Located in the scenic Blue Ridge Mountains of North Carolina, this cabin offers the perfect balance of seclusion and accessibility. You'll be just a 15-minute drive from the charming town of Asheville, where you can
                  explore local shops, restaurants, and breweries.
                </p>
                <p>The cabin is surrounded by nature, with several hiking trails accessible directly from the property. The Blue Ridge Parkway is just 5 miles away, offering some of the most spectacular scenic drives in the country.</p>
                <Map>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207271.9813620972!2d-82.73242757265633!3d35.52322470000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88598ca93c0f6f09%3A0x94ef31c106343a5d!2sAsheville%2C%20NC%2C%20USA!5e0!3m2!1sen!2s!4v1651234567890!5m2!1sen!2s"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Map>
              </Section>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.5}>
              <Section>
                <h2>Guest Reviews</h2>
                <ReviewsContainer>
                  <ReviewCard>
                    <Rating>★★★★★</Rating>
                    <ReviewHeader>
                      <ReviewAuthor>Sarah Johnson</ReviewAuthor>
                      <ReviewDate>April 2023</ReviewDate>
                    </ReviewHeader>
                    <ReviewText>
                      This cabin exceeded all our expectations! The views are even more breathtaking in person, and the cabin itself is beautifully designed and maintained. We especially loved relaxing in the hot tub while watching the
                      sunset over the mountains. Can't wait to come back!
                    </ReviewText>
                  </ReviewCard>

                  <ReviewCard>
                    <Rating>★★★★★</Rating>
                    <ReviewHeader>
                      <ReviewAuthor>Michael Thompson</ReviewAuthor>
                      <ReviewDate>March 2023</ReviewDate>
                    </ReviewHeader>
                    <ReviewText>
                      Perfect getaway for our family. The cabin was spotlessly clean and had everything we needed. Our kids loved exploring the surrounding woods, and we appreciated how close it was to Asheville for day trips. The kitchen
                      was well-equipped for cooking meals, and the beds were very comfortable.
                    </ReviewText>
                  </ReviewCard>

                  <ReviewCard>
                    <Rating>★★★★☆</Rating>
                    <ReviewHeader>
                      <ReviewAuthor>Jennifer Davis</ReviewAuthor>
                      <ReviewDate>February 2023</ReviewDate>
                    </ReviewHeader>
                    <ReviewText>
                      Beautiful cabin with stunning views. We had a wonderful time hiking nearby trails and enjoying the peaceful setting. The only reason for 4 stars instead of 5 is that the internet was a bit spotty during our stay, but
                      that's to be expected in a mountain location. Would definitely recommend!
                    </ReviewText>
                  </ReviewCard>
                </ReviewsContainer>
              </Section>
            </AnimatedSection>
          </MainContent>

          <SideContent>
            <AnimatedSection animation="fadeInRight" duration={0.8} delay={0.2}>
              <BookingCard>
                <BookingPrice>
                  $250 <span>per night</span>
                </BookingPrice>

                <Link to="/booking-now">
                  <BookingButton variation="primary" size="large">
                    Book Now
                  </BookingButton>
                </Link>

                <Link to="/booking-now">
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
                    2-night minimum stay
                  </p>
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Up to 6 guests
                  </p>
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    3 bedrooms, 2 bathrooms
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
          </SideContent>
        </ContentGrid>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
}

export default ExploreCabin;
