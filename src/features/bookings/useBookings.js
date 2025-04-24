import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    // (query function) — untuk GET/fetch data
    queryFn: getBookings,
  });

  return { bookings, isLoading, error };
}
