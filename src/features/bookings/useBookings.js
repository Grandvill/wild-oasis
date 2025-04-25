import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // 1. FILTER
  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    // (query function) — untuk GET/fetch data
    queryFn: () => getBookings({ filter }),
  });

  return { bookings, isLoading, error };
}
