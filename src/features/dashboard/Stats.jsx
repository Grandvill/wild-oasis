import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';
import { HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineChartBar, HiOutlineHomeModern } from 'react-icons/hi2';

function Stats({ bookings = [], confirmedStays = [], numDays = 1, cabinCount = 1 }) {
  // 1. Number of bookings
  const numBookings = bookings.length;

  // 2. Total sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. total Check in
  const checkIn = confirmedStays.length;

  // 4. Occupancy rate
  // num checked in nights / all available nights (num days * num cabins)
  const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount || 1);

  return (
    <>
      <Stat title="Bookings" color="blue" icon={<HiOutlineHomeModern />} value={numBookings} />
      <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
      <Stat title="Check in" color="indigo" icon={<HiOutlineCalendarDays />} value={checkIn} />
      <Stat title="Ocupancy rate" color="yellow" icon={<HiOutlineChartBar />} value={Math.round(occupation * 100) + '%'} />
    </>
  );
}

export default Stats;
