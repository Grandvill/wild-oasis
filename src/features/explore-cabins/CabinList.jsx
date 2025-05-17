'use client';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../landing-page/AnimatedSection';

const CabinsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
`;

const CabinCard = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }
`;

const CabinImage = styled.div`
  height: 200px;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
`;

const CabinContent = styled.div`
  padding: 2rem;
`;

const CabinName = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--color-grey-800);
`;

const CabinPrice = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-brand-600);
  margin-bottom: 1rem;

  span {
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--color-grey-500);
  }
`;

const CabinFeatures = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  margin-bottom: 1.5rem;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-brand-500);
  }
`;

const ViewButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-brand-600);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 1rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

function CabinList({ cabins, currentCabinId }) {
  const navigate = useNavigate();

  if (!cabins || cabins.length === 0) {
    return <p>No cabins available at the moment.</p>;
  }

  const handleViewDetails = (cabinId) => {
    navigate(`/explore-cabin/${cabinId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatedSection animation="fadeInUp" duration={0.8}>
      <CabinsGrid>
        {cabins.map((cabin) => (
          <CabinCard key={cabin.id}>
            <CabinImage image={cabin.image} />
            <CabinContent>
              <CabinName>{cabin.name}</CabinName>
              <CabinPrice>
                ${cabin.regularPrice} <span>per night</span>
              </CabinPrice>
              <CabinFeatures>
                <Feature>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {cabin.bedrooms || 0} BD
                </Feature>
                <Feature>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {cabin.bathrooms || 0} BA
                </Feature>
                <Feature>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cabin.maxCapacity || 0}
                </Feature>
              </CabinFeatures>
              <ViewButton as="button" onClick={() => handleViewDetails(cabin.id)}>
                View Details
              </ViewButton>
            </CabinContent>
          </CabinCard>
        ))}
      </CabinsGrid>
    </AnimatedSection>
  );
}

CabinList.propTypes = {
  cabins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      regularPrice: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      bedrooms: PropTypes.number,
      bathrooms: PropTypes.number,
      maxCapacity: PropTypes.number,
    })
  ).isRequired,
  currentCabinId: PropTypes.number,
};

export default CabinList;
