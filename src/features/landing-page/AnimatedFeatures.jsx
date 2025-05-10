'use client';

import styled from 'styled-components';
import { useStaggeredAnimation } from './useScrollAnimation';

const FeaturesSection = styled.section`
  padding: 8rem 4rem;
  background-color: var(--color-grey-50);
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 3.2rem;
  color: var(--color-brand-600);
  text-align: center;
  margin-bottom: 5rem;
  position: relative;

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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 4rem;
`;

const FeatureCard = styled.div`
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: ${(props) => props.delay}s;

  ${(props) =>
    props.isVisible &&
    `
    opacity: 1;
    transform: translateY(0);
  `}

  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 3rem;
  box-shadow: var(--shadow-md);
  text-align: center;

  &:hover {
    transform: ${(props) => (props.isVisible ? 'translateY(-10px)' : 'translateY(20px)')};
    box-shadow: var(--shadow-lg);
  }
`;

const FeatureIcon = styled.div`
  width: 7rem;
  height: 7rem;
  background-color: var(--color-brand-100);
  color: var(--color-brand-700);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-size: 3rem;
`;

const FeatureTitle = styled.h3`
  font-size: 2rem;
  color: var(--color-grey-800);
  margin-bottom: 1.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-600);
  line-height: 1.6;
`;

function AnimatedFeatures() {
  const { containerRef, isVisible, getDelay } = useStaggeredAnimation(4, {
    threshold: 0.1,
    staggerDelay: 0.15,
  });

  const features = [
    {
      icon: '🏡',
      title: 'Premium Cabins',
      description: 'Experience luxury in nature with our carefully designed cabins featuring modern amenities and stunning views.',
    },
    {
      icon: '🌲',
      title: 'Natural Settings',
      description: 'All our locations are selected for their exceptional natural beauty and peaceful surroundings.',
    },
    {
      icon: '🛎️',
      title: 'Concierge Service',
      description: 'Our dedicated staff is available 24/7 to ensure your stay exceeds expectations.',
    },
    {
      icon: '🍽️',
      title: 'Local Experiences',
      description: 'Discover local cuisine, activities, and hidden gems with our curated recommendations.',
    },
  ];

  return (
    <FeaturesSection>
      <Container>
        <Title>Why Choose Wild Oasis</Title>
        <FeaturesGrid ref={containerRef}>
          {features.map((feature, index) => (
            <FeatureCard key={index} isVisible={isVisible} delay={getDelay(index)}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
}

export default AnimatedFeatures;
