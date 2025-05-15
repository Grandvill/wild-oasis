// useRecentStays.js
import { useQuery } from '@tanstack/react-query';
import { getStaysAfterDate } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { subDays } from 'date-fns';

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));

  const queryDate = subDays(new Date(), numDays).toISOString();
  const today = new Date().toISOString();

  const {
    isLoading,
    data: stays,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  });

  if (error) {
    console.error('Error fetching recent stays:', error);
  }

  // Include both unconfirmed and checked-in stays
  const confirmedStays = stays?.filter((stay) => ['unconfirmed', 'checked-in'].includes(stay.status)) || [];

  return { isLoading, confirmedStays, numDays, error };
}
