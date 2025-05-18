import { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

const TestimonialsSection = styled.section`
  padding: 8rem 4rem;
  background-color: var(--color-grey-50);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom, transparent, var(--color-grey-50));
  }
`;

const TestimonialsTitle = styled.h3`
  font-size: 3.2rem;
  color: var(--color-brand-600);
  text-align: center;
  margin-bottom: 5rem;
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

const TestimonialsContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialsList = styled.div`
  display: flex;
  gap: 3rem;
  scroll-behavior: smooth;
  overflow-x: auto;
  padding: 2rem 0.5rem;

  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const TestimonialCard = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 3rem;
  flex: 0 0 360px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  position: relative;
  will-change: transform;
  border: 1px solid var(--color-grey-200);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
  }

  &::before {
    content: '"';
    position: absolute;
    top: 1.5rem;
    left: 2rem;
    font-size: 6rem;
    color: var(--color-brand-200);
    font-family: Georgia, serif;
    line-height: 1;
    opacity: 0.5;
  }

  @media (max-width: 480px) {
    flex: 0 0 300px;
  }
`;

const TestimonialText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  position: relative;
  color: var(--color-grey-700);
  font-style: italic;
  z-index: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
`;

const AuthorImage = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
  background-position: center;
  margin-right: 1.5rem;
  border: 2px solid var(--color-brand-100);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 600;
  font-size: 1.6rem;
  color: var(--color-grey-900);
`;

const AuthorTitle = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const Stars = styled.div`
  display: flex;
  margin-bottom: 1rem;
  color: var(--color-brand-500);
  font-size: 1.6rem;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--color-brand-600);
  color: white;
  border: none;
  border-radius: 50%;
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 2rem;
  z-index: 10;
  box-shadow: var(--shadow-sm);
  opacity: 0.9;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-brand-700);
    opacity: 1;
    transform: translateY(-50%) scale(1.05);
  }

  &:disabled {
    background-color: var(--color-grey-300);
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 1rem;
`;

const RightArrow = styled(ArrowButton)`
  right: 1rem;
`;

const ProgressDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 3rem;
`;

const ProgressDot = styled.button`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? 'var(--color-brand-600)' : 'var(--color-grey-300)')};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? 'var(--color-brand-600)' : 'var(--color-brand-400)')};
  }
`;

function Testimonials() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const testimonials = [
    {
      id: 1,
      text: 'Our cabin at The Wild Oasis was truly amazing! The beautiful natural scenery and complete facilities made our vacation so memorable. We will definitely come back.',
      name: 'Budi Santoso',
      title: 'Loyal Visitor',
      avatar: '/default-user.jpg',
      rating: 5,
    },
    {
      id: 2,
      text: 'A peaceful and serene stay at the cabin. The staff were very friendly and helpful. The cabin’s cleanliness was well-maintained, and the surrounding views were truly breathtaking.',
      name: 'Siti Nuraini',
      title: 'Nature Lover',
      avatar: '/default-user.jpg',
      rating: 5,
    },
    {
      id: 3,
      text: 'I highly recommend The Wild Oasis for a family retreat. The natural atmosphere provided positive energy, and the cabin was very comfortable. The kids really enjoyed playing around the cabin.',
      name: 'Ahmad Fauzi',
      title: 'Family Traveler',
      avatar: '/default-user.jpg',
      rating: 4,
    },
    {
      id: 4,
      text: 'The perfect place to escape the hustle and bustle of the city. The modern cabin design, yet harmonious with nature, made my stay truly special.',
      name: 'Dian Purnama',
      title: 'Urban Explorer',
      avatar: '/default-user.jpg',
      rating: 5,
    },
    {
      id: 5,
      text: 'Throughout my travels to various places, The Wild Oasis is one of the best accommodations I’ve ever experienced. A cabin with extraordinary views and complete facilities.',
      name: 'Rini Sulistyowati',
      title: 'Travel Blogger',
      avatar: '/default-user.jpg',
      rating: 5,
    },
  ];

  // Auto scroll functionality
  useEffect(() => {
    if (testimonials.length === 0) return;

    let interval;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, testimonials.length]);

  const scrollToIndex = useCallback((index) => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[index];
      if (card) {
        const cardWidth = card.offsetWidth + 30; // Card width + gap
        scrollRef.current.scrollTo({
          left: index * cardWidth,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  useEffect(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex, scrollToIndex]);

  const scrollLeft = () => {
    setIsAutoScrolling(false);
    setActiveIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const scrollRight = () => {
    setIsAutoScrolling(false);
    setActiveIndex((prevIndex) => Math.min(testimonials.length - 1, prevIndex + 1));
  };

  // Debounced scroll handler
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleScroll = useCallback(
    debounce(() => {
      if (scrollRef.current) {
        const cardWidth = scrollRef.current.children[0]?.offsetWidth + 30 || 384; // Default to 360 + 24 if no children
        const scrollPosition = scrollRef.current.scrollLeft;
        const newIndex = Math.round(scrollPosition / cardWidth);
        setActiveIndex(newIndex);
      }
    }, 100),
    []
  );

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Generate stars based on rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => <span key={i}>{i < rating ? '★' : '☆'}</span>);
  };

  if (testimonials.length === 0) {
    return (
      <TestimonialsSection id="testimonials">
        <TestimonialsTitle>What They Say</TestimonialsTitle>
        <TestimonialsContainer>
          <p style={{ textAlign: 'center', color: 'var(--color-grey-600)' }}>No testimonials available at the moment.</p>
        </TestimonialsContainer>
      </TestimonialsSection>
    );
  }

  return (
    <TestimonialsSection id="testimonials">
      <TestimonialsTitle>What They Say</TestimonialsTitle>
      <TestimonialsContainer>
        <LeftArrow onClick={scrollLeft} aria-label="Previous testimonial" disabled={activeIndex === 0}>
          ←
        </LeftArrow>
        <TestimonialsList ref={scrollRef} onMouseEnter={() => setIsAutoScrolling(false)} onMouseLeave={() => setIsAutoScrolling(true)} role="region" aria-label="Testimonials carousel">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} role="article" aria-label={`Testimonial by ${testimonial.name}`}>
              <Stars>{renderStars(testimonial.rating)}</Stars>
              <TestimonialText>{testimonial.text}</TestimonialText>
              <TestimonialAuthor>
                <AuthorImage src={testimonial.avatar} aria-label={`Avatar of ${testimonial.name}`} />
                <AuthorInfo>
                  <AuthorName>{testimonial.name}</AuthorName>
                  <AuthorTitle>{testimonial.title}</AuthorTitle>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsList>
        <RightArrow onClick={scrollRight} aria-label="Next testimonial" disabled={activeIndex === testimonials.length - 1}>
          →
        </RightArrow>
      </TestimonialsContainer>
      <ProgressDots>
        {testimonials.map((_, index) => (
          <ProgressDot
            key={index}
            active={index === activeIndex}
            onClick={() => {
              setIsAutoScrolling(false);
              setActiveIndex(index);
            }}
            aria-label={`Go to testimonial ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : 'false'}
          />
        ))}
      </ProgressDots>
    </TestimonialsSection>
  );
}

export default Testimonials;
