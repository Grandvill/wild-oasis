import AnimatedSection from '../landing-page/AnimatedSection';
import { BookingSection, GuestForm, FormGroup } from './Styles';

function GuestInformation({ guests, maxGuests, onGuestsChange, guestInfo, onGuestInfoChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onGuestInfoChange({ ...guestInfo, [name]: value });
  };

  return (
    <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.4}>
      <BookingSection>
        <h2>3. Guest Information</h2>
        <GuestForm>
          <FormGroup>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" name="fullName" value={guestInfo.fullName} onChange={handleChange} placeholder="Enter your full name" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" value={guestInfo.email} onChange={handleChange} placeholder="Enter your email" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="nationality">Nationality</label>
            <input type="text" name="nationality" value={guestInfo.nationality} onChange={handleChange} placeholder="Enter your nationality" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="nationalID">National ID</label>
            <input type="text" name="nationalID" value={guestInfo.nationalID} onChange={handleChange} placeholder="Enter your national ID" />
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
            <label htmlFor="observations">Special Requests</label>
            <input type="text" name="observations" value={guestInfo.observations} onChange={handleChange} placeholder="Any special requests or requirements?" />
          </FormGroup>
        </GuestForm>
      </BookingSection>
    </AnimatedSection>
  );
}

export default GuestInformation;
