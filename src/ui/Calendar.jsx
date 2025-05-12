'use client';

import { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { format, addMonths, subMonths, isToday, isSameDay, isAfter, isBefore } from 'date-fns';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CalendarContainer = styled.div`
  font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  width: 100%;
  animation: ${fadeIn} 0.3s ease-out;
  border: 1px solid var(--color-grey-200);
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-200);
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const MonthTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-800);
  min-width: 12rem;
  text-align: center;
`;

const NavButton = styled.button`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  color: var(--color-grey-700);
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-grey-900);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const CalendarGrid = styled.div`
  padding: 1.6rem;
`;

const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 1rem;
`;

const Weekday = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-500);
  text-align: center;
  text-transform: uppercase;
  padding: 0.8rem 0;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
`;

const DayCell = styled.button`
  position: relative;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) => (props.isOutsideMonth ? 'var(--color-grey-400)' : 'var(--color-grey-700)')};

  ${(props) =>
    props.isToday &&
    css`
      font-weight: 700;
      color: var(--color-brand-600);

      &::after {
        content: '';
        position: absolute;
        bottom: 0.6rem;
        left: 50%;
        transform: translateX(-50%);
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background-color: var(--color-brand-600);
      }
    `}

  ${(props) =>
    props.isSelected &&
    css`
      background-color: var(--color-brand-600);
      color: white;
      font-weight: 600;

      &:hover {
        background-color: var(--color-brand-700);
      }
    `}

  ${(props) =>
    props.isInRange &&
    css`
      background-color: var(--color-brand-100);
      color: var(--color-brand-700);

      &:hover {
        background-color: var(--color-brand-200);
      }
    `}

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
        transform: none;
      }
    `}

  &:hover {
    background-color: ${(props) => (props.isDisabled ? 'transparent' : 'var(--color-grey-100)')};
    transform: ${(props) => (props.isDisabled ? 'none' : 'translateY(-1px)')};
  }

  &:active {
    transform: translateY(0);
  }
`;

const TodayButton = styled.button`
  background: none;
  border: none;
  color: var(--color-brand-600);
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: var(--border-radius-sm);

  &:hover {
    background-color: var(--color-brand-50);
    text-decoration: underline;
  }
`;

export function Calendar({ mode = 'single', selected, onSelect, minDate, maxDate, className, showOutsideDays = true, ...props }) {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  // Generate calendar days for the current month
  useEffect(() => {
    const days = [];
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Add days from previous month to fill the first row
    const daysFromPrevMonth = firstDayOfWeek;
    const prevMonth = subMonths(firstDayOfMonth, 1);
    const lastDayOfPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();

    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), lastDayOfPrevMonth - i);
      days.push({
        date,
        dayOfMonth: date.getDate(),
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: selected && isSameDay(date, selected),
        isDisabled: (minDate && isBefore(date, minDate)) || (maxDate && isAfter(date, maxDate)),
      });
    }

    // Add days of current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      days.push({
        date,
        dayOfMonth: i,
        isCurrentMonth: true,
        isToday: isToday(date),
        isSelected: selected && isSameDay(date, selected),
        isDisabled: (minDate && isBefore(date, minDate)) || (maxDate && isAfter(date, maxDate)),
      });
    }

    // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
    const daysNeeded = 42 - days.length;
    for (let i = 1; i <= daysNeeded; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i);
      days.push({
        date,
        dayOfMonth: i,
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: selected && isSameDay(date, selected),
        isDisabled: (minDate && isBefore(date, minDate)) || (maxDate && isAfter(date, maxDate)),
      });
    }

    setCalendarDays(days);
  }, [currentMonth, selected, minDate, maxDate]);

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => subMonths(prevMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
  };

  const handleSelectDay = (day) => {
    if (day.isDisabled) return;
    onSelect(day.date);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    if (!minDate || !isBefore(today, minDate)) {
      onSelect(today);
    }
  };

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <CalendarContainer className={className} {...props}>
      <CalendarHeader>
        <MonthNavigation>
          <NavButton onClick={handlePrevMonth} aria-label="Previous month">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </NavButton>
          <MonthTitle>{format(currentMonth, 'MMMM yyyy')}</MonthTitle>
          <NavButton onClick={handleNextMonth} aria-label="Next month">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </NavButton>
        </MonthNavigation>
        <TodayButton onClick={goToToday} type="button">
          Today
        </TodayButton>
      </CalendarHeader>

      <CalendarGrid>
        <WeekdaysRow>
          {weekdays.map((day) => (
            <Weekday key={day}>{day}</Weekday>
          ))}
        </WeekdaysRow>

        <DaysGrid>
          {calendarDays.map((day, index) => (
            <DayCell
              key={index}
              isOutsideMonth={!day.isCurrentMonth}
              isToday={day.isToday}
              isSelected={day.isSelected}
              isDisabled={day.isDisabled}
              onClick={() => handleSelectDay(day)}
              type="button"
              aria-label={format(day.date, 'MMMM d, yyyy')}
              aria-selected={day.isSelected}
              disabled={day.isDisabled}
            >
              {day.dayOfMonth}
            </DayCell>
          ))}
        </DaysGrid>
      </CalendarGrid>
    </CalendarContainer>
  );
}

export default Calendar;
