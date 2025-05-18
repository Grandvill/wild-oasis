'use client';

import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section.withConfig({
  shouldForwardProp: (prop) => !['isVisible', 'animation', 'duration', 'delay'].includes(prop),
})`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? 'translateY(0)' : props.animation === 'fadeInUp' ? 'translateY(20px)' : 'translateY(0)')};
  transition: opacity ${(props) => props.duration || 0.6}s ease-out, transform ${(props) => props.duration || 0.6}s ease-out;
  transition-delay: ${(props) => props.delay || 0}s;
`;

function AnimatedSection({ children, animation = 'fadeIn', duration = 0.6, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Section ref={sectionRef} isVisible={isVisible} animation={animation} duration={duration} delay={delay}>
      {children}
    </Section>
  );
}

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.oneOf(['fadeIn', 'fadeInUp', 'fadeInLeft', 'fadeInRight']),
  duration: PropTypes.number,
  delay: PropTypes.number,
};

export default AnimatedSection;
