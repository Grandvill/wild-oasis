import styled from 'styled-components';
import Button from '../../ui/Button';

const ContactSection = styled.section`
  padding: 6rem 2rem;
  background-color: var(--color-grey-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    gap: 2rem;
  }
`;

const ContactTitle = styled.h3`
  font-size: clamp(2rem, 5vw, 3.2rem);
  color: var(--color-brand-600);
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: clamp(60px, 15vw, 80px);
    height: 3px;
    background-color: var(--color-brand-500);
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const ContactContainer = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: var(--color-grey-0);

  &:focus {
    outline: none;
    border-color: #00c4b4;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  font-size: 1rem;
  height: 150px;
  resize: none;
  box-sizing: border-box;
  background-color: var(--color-grey-0);

  &:focus {
    outline: none;
    border-color: #00c4b4;
  }

  @media (max-width: 768px) {
    height: 100px;
  }
`;

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%; /* Fill the container height */
  border: 0;
  border-radius: 8px;
  min-height: 300px; /* Minimum height for mobile */
  @media (min-width: 769px) {
    min-height: 400px; /* Increased height for desktop */
  }
`;

const ContactInfo = styled.div`
  font-size: 1rem;
  color: var(--color-grey-700);
  line-height: 1.6;
  padding: 1rem 0;

  p {
    margin: 0.5rem 0;
  }
`;

function ContactUs() {
  return (
    <ContactSection id="contact-us">
      <ContactTitle>Contact Us</ContactTitle>
      <ContactContainer>
        <FormContainer>
          <Input type="text" placeholder="Full name" />
          <Input type="email" placeholder="E-mail" />
          <TextArea placeholder="Message" />
          <Button variation="primary">Send</Button>
        </FormContainer>
        <MapContainer>
          <Iframe
            title="Location map of Sudirman Central Business District, Jakarta"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.1448856415748!2d106.80903365084428!3d-6.225472217181521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5394cf4b8d7%3A0x507e0f6507ec0c!2sSudirman%20Central%20Business%20District!5e0!3m2!1sid!2sid!4v1747553315927!5m2!1sid!2sid"
            allowFullScreen=""
            loading="lazy"
          />
          <ContactInfo>
            <p>Where to find us</p>
            <p>Sudirman Central Business District</p>
            <p>Jakarta, Indonesia</p>
            <p>zahidan23@gmail.com</p>
            <p>+1 222-345-0000</p>
          </ContactInfo>
        </MapContainer>
      </ContactContainer>
    </ContactSection>
  );
}

export default ContactUs;
