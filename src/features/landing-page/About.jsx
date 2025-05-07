// components/About.jsx
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 4rem;
  background-color: var(--color-grey-100);
`;

const AboutTitle = styled.h3`
  font-size: 3rem;
  color: var(--color-blue-700);
  text-align: center;
  margin-bottom: 2rem;
`;

const AboutText = styled.p`
  font-size: 1.8rem;
  color: var(--color-grey-700);
  max-width: 80ch;
  margin: 0 auto;
  line-height: 1.6;
`;

function About() {
  return (
    <AboutSection id="about">
      <AboutTitle>Tentang Wild Oasis</AboutTitle>
      <AboutText>Wild Oasis adalah platform modern yang memudahkan pengguna untuk menemukan dan memesan cabin atau hotel favorit mereka dengan mudah, cepat, dan aman. Nikmati pengalaman menginap terbaik dengan layanan kami.</AboutText>
    </AboutSection>
  );
}

export default About;
