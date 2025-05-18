import styled from 'styled-components';
import Button from '../../ui/Button';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

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
  height: 100%;
  border: 0;
  border-radius: 8px;
  min-height: 300px;
  @media (min-width: 769px) {
    min-height: 400px;
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service_id';
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'default_template_id';
    const userID = import.meta.env.VITE_EMAILJS_USER_ID || 'default_user_id';

    if (serviceID === 'default_service_id' || templateID === 'default_template_id' || userID === 'default_user_id') {
      toast.error('EmailJS configuration is missing. Please contact support.', {
        duration: 5000,
        style: {
          fontSize: '16px',
          maxWidth: '500px',
          padding: '16px 24px',
          background: '#EF4444',
          color: '#fff',
          fontWeight: '500',
        },
      });
      return;
    }

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      to_email: 'zahidan23@gmail.com',
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        toast.success('Message sent successfully!', {
          duration: 4000,
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            background: '#10B981',
            color: '#fff',
            fontWeight: '500',
          },
        });
        setFormData({ name: '', email: '', message: '' }); // Reset form
      })
      .catch((error) => {
        toast.error('Failed to send message. Please try again.', {
          duration: 5000,
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            background: '#EF4444',
            color: '#fff',
            fontWeight: '500',
          },
        });
        console.error('EmailJS Error:', error);
      });
  };

  return (
    <ContactSection id="contact-us">
      <ContactTitle>Contact Us</ContactTitle>
      <ContactContainer>
        <FormContainer>
          <Input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required />
          <Input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
          <TextArea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
          <Button variation="primary" onClick={handleSubmit}>
            Send
          </Button>
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
