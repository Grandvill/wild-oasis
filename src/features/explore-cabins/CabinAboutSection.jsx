'use client';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import AnimatedSection from '../landing-page/AnimatedSection';

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

function CabinAboutSection({ cabin }) {
  if (!cabin) return null;

  return (
    <AnimatedSection animation="fadeInUp" duration={0.8}>
      <Section>
        <h2>About This Cabin</h2>
        <p>{cabin.description || 'A beautiful cabin in a serene location.'}</p>

        <FeaturesList>
          <FeatureItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            {cabin.bedrooms || 0} Bedrooms
          </FeatureItem>
          <FeatureItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            {cabin.bathrooms || 0} Bathrooms
          </FeatureItem>
          <FeatureItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            {cabin.squareFeet || 'N/A'} sq ft
          </FeatureItem>
          <FeatureItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
            {cabin.petFriendly ? 'Pet Friendly' : 'No Pets Allowed'}
          </FeatureItem>
          <FeatureItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Sleeps {cabin.maxCapacity || 0}
          </FeatureItem>
          {cabin.hasHotTub && (
            <FeatureItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l4 4M17 5l-4 4M6 13l4 4M10 17l-4 4"></path>
              </svg>
              Hot Tub
            </FeatureItem>
          )}
        </FeaturesList>
      </Section>
    </AnimatedSection>
  );
}

CabinAboutSection.propTypes = {
  cabin: PropTypes.shape({
    bedrooms: PropTypes.number,
    bathrooms: PropTypes.number,
    squareFeet: PropTypes.number,
    petFriendly: PropTypes.bool,
    maxCapacity: PropTypes.number,
    hasHotTub: PropTypes.bool,
    description: PropTypes.string,
  }),
};

export default CabinAboutSection;
