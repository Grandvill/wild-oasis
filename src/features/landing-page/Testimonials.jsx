import { useRef, useEffect, useState } from 'react';
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
      text: 'Cabin kami di The Wild Oasis benar-benar mengagumkan! Pemandangan alam yang indah dan fasilitas yang lengkap membuat liburan kami menjadi sangat berkesan. Kami pasti akan kembali lagi.',
      name: 'Budi Santoso',
      title: 'Pengunjung Setia',
      avatar: '/default-user.jpg',
      rating: 5,
    },
    {
      id: 2,
      text: 'Pengalaman menginap di cabin yang tenang dan damai. Staff sangat ramah dan membantu. Kebersihan kabin terjaga dengan sangat baik dan pemandangan sekitar sungguh menakjubkan.',
      name: 'Siti Nuraini',
      title: 'Pecinta Alam',
      avatar: '/default-user.jpg',
      rating: 5,
    },
    {
      id: 3,
      text: 'Saya sangat merekomendasikan The Wild Oasis untuk retreat keluarga. Suasana alamnya memberikan energi positif dan cabin-nya sangat nyaman. Anak-anak sangat menikmati waktu bermain di sekitar cabin.',
      name: 'Ahmad Fauzi',
      title: 'Family Traveler',
      avatar: '/default-user.jpg',
      rating: 4,
    },
    {
      id: 4,
      text: 'Tempat yang sempurna untuk melarikan diri dari hiruk pikuk kota. Desain cabin yang modern namun tetap harmonis dengan alam membuat pengalaman menginap saya menjadi istimewa.',
      name: 'Dian Purnama',
      title: 'Urban Explorer',
      avatar: '/default-user.jpg',
      rating: 5,
    },
    {
      id: 5,
      text: 'Selama saya traveling ke berbagai tempat, The Wild Oasis adalah salah satu akomodasi terbaik yang pernah saya temui. Cabin dengan pemandangan yang luar biasa dan fasilitas yang lengkap.',
      name: 'Rini Sulistyowati',
      title: 'Travel Blogger',
      avatar: '/default-user.jpg',
      rating: 5,
    },
  ];

  // Auto scroll functionality
  useEffect(() => {
    let interval;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        scrollToIndex((activeIndex + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [activeIndex, isAutoScrolling, testimonials.length]);

  const scrollToIndex = (index) => {
    setActiveIndex(index);
    if (scrollRef.current) {
      const cardWidth = 360 + 24; // card width + gap
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    setIsAutoScrolling(false);
    const newIndex = Math.max(0, activeIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    setIsAutoScrolling(false);
    const newIndex = Math.min(testimonials.length - 1, activeIndex + 1);
    scrollToIndex(newIndex);
  };

  // Handle scroll events to update active index
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const cardWidth = 360 + 24; // card width + gap
        const scrollPosition = scrollRef.current.scrollLeft;
        const newIndex = Math.round(scrollPosition / cardWidth);
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex]);

  // Generate stars based on rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => <span key={i}>{i < rating ? '★' : '☆'}</span>);
  };

  return (
    <TestimonialsSection id="testimonials">
      <TestimonialsTitle>Apa Kata Mereka?</TestimonialsTitle>
      <TestimonialsContainer>
        <LeftArrow onClick={scrollLeft} aria-label="Previous testimonial">
          ←
        </LeftArrow>
        <TestimonialsList ref={scrollRef} onMouseEnter={() => setIsAutoScrolling(false)} onMouseLeave={() => setIsAutoScrolling(true)}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id}>
              <Stars>{renderStars(testimonial.rating)}</Stars>
              <TestimonialText>{testimonial.text}</TestimonialText>
              <TestimonialAuthor>
                <AuthorImage src={testimonial.avatar} />
                <AuthorInfo>
                  <AuthorName>{testimonial.name}</AuthorName>
                  <AuthorTitle>{testimonial.title}</AuthorTitle>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsList>
        <RightArrow onClick={scrollRight} aria-label="Next testimonial">
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
              scrollToIndex(index);
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </ProgressDots>
    </TestimonialsSection>
  );
}

export default Testimonials;
