import { getToday } from '../utils/helpers';
import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase.from('bookings').select('id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)', { count: 'exact' });

  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);
  if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' });
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase.from('bookings').select('*, cabins(*), guests(*)').eq('id', id).single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .gte('startDate', date)
    .lte('startDate', getToday({ end: true })); // Use end of day

  if (error) {
    console.error('Error fetching stays:', error);
    throw new Error('Bookings could not get loaded');
  }

  return data || []; // Ensure an empty array if data is undefined
}

export async function getStaysTodayActivity() {
  const todayStart = getToday();
  const todayEnd = getToday({ end: true });

  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(`and(status.eq.unconfirmed,startDate.gte.${todayStart},startDate.lte.${todayEnd}),` + `and(status.eq.checked-in,endDate.gte.${todayStart},endDate.lte.${todayEnd})`)
    .order('created_at');

  if (error) {
    console.error('Error fetching today activity:', error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase.from('bookings').update(obj).eq('id', id).select().single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}

export async function createBookingWithGuest(guestData, bookingData) {
  const { data: guest, error: guestError } = await supabase.from('guests').insert([guestData]).select().single();

  if (guestError) {
    console.error(guestError);
    throw new Error('Failed to create guest');
  }

  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert([{ ...bookingData, guestId: guest.id, status: bookingData.status || 'unconfirmed' }])
    .select()
    .single();

  if (bookingError) {
    console.error(bookingError);
    throw new Error('Failed to create booking');
  }

  return booking;
}
