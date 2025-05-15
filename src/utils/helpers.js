import { formatDistance, parseISO, differenceInDays } from 'date-fns';
import countries from 'i18n-iso-countries'; // Import the library
import en from 'i18n-iso-countries/langs/en.json'; // Import English locale

countries.registerLocale(en);

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) => differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) => {
  try {
    const date = parseISO(dateStr);
    if (isNaN(date)) return 'Invalid date';
    return formatDistance(date, new Date(), {
      addSuffix: true,
    })
      .replace('about ', '')
      .replace('in', 'In');
  } catch (error) {
    console.error('Invalid dateStr passed to formatDistanceFromNow:', dateStr);
    return 'Invalid date';
  }
};

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) => new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value);

// Dynamically map country names to ISO 3166-1 alpha-2 codes
export const getCountryCode = (countryName) => {
  if (!countryName) return 'unknown';

  const normalizedCountry = countryName.toLowerCase().trim();
  // Handle special cases or variations in country names
  const specialCases = {
    'united states': 'United States',
    'united kingdom': 'United Kingdom',
    'south korea': 'South Korea',
    'north korea': 'North Korea',
    // Add more special cases if needed
  };

  const countryToUse = specialCases[normalizedCountry] || countryName;
  const code = countries.getAlpha2Code(countryToUse, 'en');
  return code ? code.toLowerCase() : 'unknown';
};
