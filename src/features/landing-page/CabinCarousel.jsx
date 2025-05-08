// components/CabinsCarousel.jsx
import styled from 'styled-components';

const CarouselSection = styled.section`
  padding: 4rem;
  background-color: var(--color-grey-50);
`;

const CarouselTitle = styled.h3`
  font-size: 3rem;
  color: var(--color-blue-700);
  text-align: center;
  margin-bottom: 2rem;
`;

const Images = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem 0;
`;

const ImageCard = styled.img`
  border-radius: var(--border-radius-md);
  height: 20rem;
  object-fit: cover;
`;

function CabinsCarousel() {
  return (
    <CarouselSection id="cabins">
      <CarouselTitle>Cabin Kami</CarouselTitle>
      <Images>
        <ImageCard src="https://source.unsplash.com/400x300/?cabin" alt="Cabin" />
        <ImageCard src="https://source.unsplash.com/400x300/?hotel" alt="Hotel" />
        <ImageCard src="https://source.unsplash.com/400x300/?resort" alt="Resort" />
      </Images>
    </CarouselSection>
  );
}

export default CabinsCarousel;
