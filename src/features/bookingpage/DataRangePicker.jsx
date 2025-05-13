'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format, addDays, isBefore, isAfter, isSameDay, differenceInDays } from 'date-fns';
import Calendar from '../../ui/Calendar';

const DateRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const DatePickerWrapper = styled.div`
  flex: 1;
`;

const DatePickerHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
`;

const DateLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: 0.4rem;
`;

const DatePreview = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const NightsIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  font-size: 1.4rem;
  color: var(--color-grey-700);
  margin-top: 1.6rem;

  span {
    font-weight: 600;
    color: var(--color-brand-600);
    margin: 0 0.4rem;
  }

  @media (min-width: 768px) {
    margin-top: 0;
    align-self: flex-end;
  }
`;

function DateRangePicker({ startDate, endDate, onStartDateChange, onEndDateChange, minDate = new Date() }) {
  const [nights, setNights] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      setNights(differenceInDays(endDate, startDate));
    }
  }, [startDate, endDate]);

  const handleStartDateSelect = (date) => {
    onStartDateChange(date);

    // If end date is before new start date, adjust it
    if (endDate && (isBefore(endDate, date) || isSameDay(endDate, date))) {
      onEndDateChange(addDays(date, 1));
    }
  };

  const handleEndDateSelect = (date) => {
    // Ensure end date is after start date
    if (startDate && isAfter(date, startDate)) {
      onEndDateChange(date);
    }
  };

  return (
    <DateRangeContainer>
      <DatePickerWrapper>
        <DatePickerHeader>
          <DateLabel htmlFor="check-in-date">Check-in Date</DateLabel>
          <DatePreview>{startDate ? format(startDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}</DatePreview>
        </DatePickerHeader>
        <Calendar id="check-in-date" mode="single" selected={startDate} onSelect={handleStartDateSelect} minDate={minDate} />
      </DatePickerWrapper>

      <DatePickerWrapper>
        <DatePickerHeader>
          <DateLabel htmlFor="check-out-date">Check-out Date</DateLabel>
          <DatePreview>{endDate ? format(endDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}</DatePreview>
        </DatePickerHeader>
        <Calendar id="check-out-date" mode="single" selected={endDate} onSelect={handleEndDateSelect} minDate={startDate ? addDays(startDate, 1) : addDays(minDate, 1)} />
      </DatePickerWrapper>

      {nights > 0 && (
        <NightsIndicator>
          Your stay: <span>{nights}</span> {nights === 1 ? 'night' : 'nights'}
        </NightsIndicator>
      )}
    </DateRangeContainer>
  );
}

export default DateRangePicker;
