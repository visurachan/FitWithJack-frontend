export const APP_NAME = import.meta.env.VITE_APP_NAME || 'FitWithJack';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  SET_PASSWORD: '/set-password',
  PROFILE: '/profile',
  CLASSES: '/classes',
  SESSIONS: '/sessions',
  SESSION_DETAIL: '/sessions/:id',
};

export const SESSION_MODES = {
  ONLINE: 'Online',
  IN_PERSON: 'In-Person',
};

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
};
