import { format, parseISO, isValid } from 'date-fns';

// Format date for display
export const formatDate = (date) => {
  try {
    if (!date) return '';
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, 'MMM dd, yyyy') : '';
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

// Format time for display
export const formatTime = (time) => {
  try {
    if (!time) return '';
    // If time is in HH:MM:SS format, convert to 12-hour format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  } catch (error) {
    console.error('Time formatting error:', error);
    return time;
  }
};

// Format date for API (yyyy-MM-dd)
export const formatDateForAPI = (date) => {
  try {
    if (!date) return '';
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, 'yyyy-MM-dd') : '';
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

// Format price for display
export const formatPrice = (price) => {
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price);
  } catch (error) {
    console.error('Price formatting error:', error);
    return `£${price}`;
  }
};

// Calculate availability percentage
export const calculateAvailability = (current, max) => {
  if (!max || max === 0) return 0;
  return Math.round(((max - current) / max) * 100);
};

// Get availability status
export const getAvailabilityStatus = (current, max) => {
  const availability = calculateAvailability(current, max);
  if (availability === 0) return { text: 'Full', color: 'text-red-600', bgColor: 'bg-red-100' };
  if (availability < 30) return { text: 'Almost Full', color: 'text-amber-600', bgColor: 'bg-amber-100' };
  return { text: 'Available', color: 'text-accent-600', bgColor: 'bg-accent-100' };
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password (min 8 characters)
export const isValidPassword = (password) => {
  return password && password.length >= 8;
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get initials from name
export const getInitials = (firstName, lastName) => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return `${first}${last}`;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
