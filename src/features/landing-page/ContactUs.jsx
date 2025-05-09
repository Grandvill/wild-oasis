import styled from 'styled-components';
import Button from '../../ui/Button';

const ContactSection = styled.section`
  padding: 6rem 2rem;
  background-color: #fff;
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
  color: var(--color-brand-800);
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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 769px) {
    min-width: 300px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #00c4b4;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  height: 150px;
  resize: none;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #00c4b4;
  }

  @media (max-width: 768px) {
    height: 100px;
  }
`;

const MapContainer = styled.div`
  flex: 1;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 769px) {
    min-width: 300px;
  }
`;

const Iframe = styled.iframe`
  width: 100%;
  height: clamp(200px, 40vh, 400px);
  border: 0;
  border-radius: 8px;
`;

const ContactInfo = styled.div`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;

  p {
    margin: 0.5rem 0;
  }

  a {
    color: #666;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #00c4b4;
    }
  }
`;

function ContactUs() {
  return (
    <ContactSection>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086536722418!2d-122.41941568468101!3d37.77492977975966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808f5b7c2d1f%3A0x9c5b9d2a2d8e8e5!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          />
          <ContactInfo>
            <p>Where to find us</p>
            <p>577 Bellevue Avenue</p>
            <p>Malden, MA 02148</p>
            <p> wildoasis@gmail.com </p>
            <p>+1 222-345-0000</p>
          </ContactInfo>
        </MapContainer>
      </ContactContainer>
    </ContactSection>
  );
}

export default ContactUs;
