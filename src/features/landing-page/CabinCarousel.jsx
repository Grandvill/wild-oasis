import { useRef } from 'react';
import styled from 'styled-components';

const CarouselSection = styled.section`
  padding: 6rem 4rem;
  background-color: var(--color-grey-100);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom, transparent, var(--color-grey-100));
  }
`;

const CarouselTitle = styled.h3`
  font-size: 3.2rem;
  color: var(--color-brand-600);
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--color-brand-500);
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Images = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 2.5rem;
  padding: 1.5rem 0;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  /* Add shadow to indicate more content */
  &::after {
    content: '';
    flex: 0 0 20px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  flex: 0 0 auto;
  width: 300px;
  height: 22rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const ImageCard = styled.img`
  border-radius: var(--border-radius-lg);
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const CabinName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: var(--color-grey-0);
  font-weight: 600;
  font-size: 1.6rem;
  opacity: 0.9;
  transition: opacity 0.3s ease;

  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.8rem;
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;
`;

function CabinsCarousel() {
  const cabins = [
    { id: 1, name: 'cabin-001', img: 'cabin-001.jpg' },
    { id: 2, name: 'cabin-002', img: 'cabin-002.jpg' },
    { id: 3, name: 'cabin-003', img: 'cabin-003.jpg' },
    { id: 4, name: 'cabin-004', img: 'cabin-004.jpg' },
    { id: 5, name: 'cabin-005', img: 'cabin-005.jpg' },
    { id: 6, name: 'cabin-006', img: 'cabin-006.jpg' },
  ];

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <CarouselSection id="cabins">
      <CarouselTitle>Cabin Kami</CarouselTitle>
      <CarouselWrapper>
        <LeftArrow onClick={scrollLeft}>←</LeftArrow>
        <Images ref={scrollRef}>
          {cabins.map((cabin) => (
            <ImageContainer key={cabin.id}>
              <ImageCard src={cabin.img} alt={cabin.name} />
              <CabinName>{cabin.name}</CabinName>
            </ImageContainer>
          ))}
        </Images>
        <RightArrow onClick={scrollRight}>→</RightArrow>
      </CarouselWrapper>
    </CarouselSection>
  );
}

export default CabinsCarousel;
