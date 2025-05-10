'use client';

import styled, { css, keyframes } from 'styled-components';
import { useScrollAnimation } from './useScrollAnimation';

// Define animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Animation variants
const animations = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  zoomIn,
  fadeIn,
};

// Styled component for animated sections
const StyledSection = styled.div`
  opacity: 0;
  will-change: transform, opacity;

  ${({ isVisible, animation, duration, delay }) =>
    isVisible &&
    css`
      animation: ${animations[animation]} ${duration}s ${delay}s ease forwards;
    `}
`;

// AnimatedSection component
function AnimatedSection({ children, animation = 'fadeInUp', duration = 0.8, delay = 0, threshold = 0.1, rootMargin = '0px', className, as = 'div', ...props }) {
  const [ref, isVisible] = useScrollAnimation({ threshold, rootMargin });

  return (
    <StyledSection ref={ref} isVisible={isVisible} animation={animation} duration={duration} delay={delay} className={className} as={as} {...props}>
      {children}
    </StyledSection>
  );
}

export default AnimatedSection;
