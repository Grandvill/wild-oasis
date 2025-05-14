// useCreateBooking.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBookingWithGuest } from '../../services/apiBookings';

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const {
    mutate: createBooking,
    isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ guestData, bookingData }) => createBookingWithGuest(guestData, bookingData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  return { createBooking, isLoading, error, isSuccess };
}
