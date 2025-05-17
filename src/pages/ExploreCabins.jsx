'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
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
import Pagination from '../ui/Pagination';
import CabinList from '../features/explore-cabins/CabinList';
import { PAGE_SIZE } from '../utils/constants';
import { useSettings } from '../features/settings/useSettings';

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

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

const PaginationContainer = styled.div`
  margin-top: 4rem;
`;

function ExploreCabins() {
  const { cabinId } = useParams();
  const [searchParams] = useSearchParams();
  const { cabins, isLoading: isLoadingCabins, error: cabinsError } = useCabins();
  const { settings, isLoading: isLoadingSettings, error: settingsError } = useSettings();
  const [selectedCabin, setSelectedCabin] = useState(null);

  // Get current page from URL search params
  const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // Get current page cabins
  const getCurrentPageCabins = () => {
    if (!cabins) return [];
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return cabins.slice(startIndex, startIndex + PAGE_SIZE);
  };

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

  // Scroll to top when changing pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (isLoadingCabins || isLoadingSettings) {
    return (
      <PageContainer>
        <Navbar />
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (cabinsError || settingsError) {
    return (
      <PageContainer>
        <Navbar />
        <ContentContainer>
          <ErrorFallback message={`Error: ${cabinsError?.message || settingsError?.message || 'Unknown error'}`} />
        </ContentContainer>
      </PageContainer>
    );
  }

  if (!cabins || cabins.length === 0) {
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

      {/* Show hero section only if a specific cabin is selected */}
      {selectedCabin && <CabinHeroSection cabin={selectedCabin} />}

      <ContentContainer>
        {selectedCabin && cabinId ? (
          // Detailed view of a single cabin
          <>
            <ContentGrid>
              <MainContent>
                <CabinAboutSection cabin={selectedCabin} />
                <CabinGallerySection cabin={selectedCabin} />
                {/* Additional sections like amenities, location, reviews can be added as separate components */}
              </MainContent>

              <SideContent>
                <CabinBookingCard cabin={selectedCabin} settings={settings} isLoadingSettings={isLoadingSettings} settingsError={settingsError} />
              </SideContent>
            </ContentGrid>

            {/* Other cabins section with pagination */}
            <div style={{ marginTop: '6rem' }}>
              <SectionTitle>Explore More Cabins</SectionTitle>
              <CabinList cabins={getCurrentPageCabins()} currentCabinId={selectedCabin.id} />
              <PaginationContainer>
                <Pagination count={cabins.length} />
              </PaginationContainer>
            </div>
          </>
        ) : (
          // List view of all cabins with pagination
          <>
            <SectionTitle>Explore Our Cabins</SectionTitle>
            <CabinList cabins={getCurrentPageCabins()} />
            <PaginationContainer>
              <Pagination count={cabins.length} />
            </PaginationContainer>
          </>
        )}
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
}

export default ExploreCabins;
