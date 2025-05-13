import PropTypes from 'prop-types';
import AnimatedSection from '../landing-page/AnimatedSection';
import { BookingSection, GuestForm, FormGroup } from './Styles';

function GuestInformation({ guests, maxGuests, onGuestsChange }) {
  return (
    <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.4}>
      <BookingSection>
        <h2>3. Guest Information</h2>
        <GuestForm>
          <FormGroup>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" placeholder="Enter your full name" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="Enter your phone number" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="guests">Number of Guests</label>
            <select id="guests" value={guests} onChange={(e) => onGuestsChange(Number(e.target.value))}>
              {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="specialRequests">Special Requests</label>
            <input type="text" id="specialRequests" placeholder="Any special requests or requirements?" />
          </FormGroup>
        </GuestForm>
      </BookingSection>
    </AnimatedSection>
  );
}

GuestInformation.propTypes = {
  guests: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
  onGuestsChange: PropTypes.func.isRequired,
};

export default GuestInformation;
