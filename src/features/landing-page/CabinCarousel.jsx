// components/CabinsCarousel.jsx
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
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const ImageCard = styled.img`
  border-radius: var(--border-radius-lg);
  height: 22rem;
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

function CabinsCarousel() {
  const cabins = [
    { id: 1, name: 'Forest Retreat', img: 'https://source.unsplash.com/400x300/?cabin,forest' },
    { id: 2, name: 'Lakeside Villa', img: 'https://source.unsplash.com/400x300/?cabin,lake' },
    { id: 3, name: 'Mountain View', img: 'https://source.unsplash.com/400x300/?cabin,mountain' },
    { id: 4, name: 'Cozy Cottage', img: 'https://source.unsplash.com/400x300/?cabin,cottage' },
    { id: 5, name: 'Riverside Cabin', img: 'https://source.unsplash.com/400x300/?cabin,river' },
  ];

  return (
    <CarouselSection id="cabins">
      <CarouselTitle>Cabin Kami</CarouselTitle>
      <Images>
        {cabins.map((cabin) => (
          <ImageContainer key={cabin.id}>
            <ImageCard src={cabin.img} alt={cabin.name} />
            <CabinName>{cabin.name}</CabinName>
          </ImageContainer>
        ))}
      </Images>
    </CarouselSection>
  );
}

export default CabinsCarousel;
