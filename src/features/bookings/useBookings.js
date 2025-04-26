import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // 1. FILTER
  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };
  // gte (greater than or equal) lte (less than or equal)
  // { field: 'totalPrice', value: 5000, method: 'gte' };

  // 2. SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // 3. PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    // (query function) — untuk GET/fetch data
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { bookings, isLoading, error, count };
}
