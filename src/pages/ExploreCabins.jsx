'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../features/landing-page/Navbar';
import Footer from '../features/landing-page/Footer';
import { useCabins } from '../features/cabins/useCabins';
import CabinHeroSection from '../features/explore-cabins/CabinHeroSection';
import CabinAboutSection from '../features/explore-cabins/CabinAboutSection';
import CabinGallerySection from '../features/explore-cabins/CabinGallerySection';
import CabinBookingCard from '../features/explore-cabins/CabinBookingCard';
import Spinner from '../ui/Spinner';
import ErrorFallback from '../ui/ErrorFallback';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-grey-50);
  overflow-x: hidden;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

function ExploreCabins() {
  const { cabinId } = useParams();
  const { cabins, isLoading, error } = useCabins();
  const [selectedCabin, setSelectedCabin] = useState(null);

  useEffect(() => {
    if (cabins && cabins.length > 0) {
      // If cabinId is provided in URL, find that cabin
      if (cabinId) {
        const cabin = cabins.find((c) => c.id === Number.parseInt(cabinId));
        if (cabin) {
          setSelectedCabin(cabin);
          return;
        }
      }

      // Otherwise, just use the first cabin
      setSelectedCabin(cabins[0]);
    }
  }, [cabins, cabinId]);

  if (isLoading) {
    return (
      <PageContainer>
        <Navbar />
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Navbar />
        <ContentContainer>
          {/* Pass the error object directly instead of trying to access error.message */}
          <ErrorFallback message={`Error loading cabins: ${error.message || 'Unknown error'}`} />
        </ContentContainer>
      </PageContainer>
    );
  }

  if (!selectedCabin) {
    return (
      <PageContainer>
        <Navbar />
        <ContentContainer>
          <ErrorFallback message="No cabins found. Please try again later." />
        </ContentContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Navbar />
      <CabinHeroSection cabin={selectedCabin} />

      <ContentContainer>
        <ContentGrid>
          <MainContent>
            <CabinAboutSection cabin={selectedCabin} />
            <CabinGallerySection cabin={selectedCabin} />
            {/* Additional sections like amenities, location, reviews can be added as separate components */}
          </MainContent>

          <SideContent>
            <CabinBookingCard cabin={selectedCabin} />
          </SideContent>
        </ContentGrid>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
}

export default ExploreCabins;
