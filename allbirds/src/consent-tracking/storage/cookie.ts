/**
 * Cookie Storage Utility
 * Handles reading and writing consent data to browser cookies
 */

import { ConsentStorage } from '../types';

const DEFAULT_COOKIE_NAME = 'consent_preferences';
const DEFAULT_EXPIRY_DAYS = 365;

export const readCookie = (cookieName: string = DEFAULT_COOKIE_NAME): ConsentStorage | undefined => {
  try {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${cookieName}=`))
      ?.split('=')[1];

    if (!cookieValue) return undefined;
    
    return JSON.parse(decodeURIComponent(cookieValue));
  } catch (error) {
    console.error('Error reading consent cookie:', error);
    return undefined;
  }
};

export const writeCookie = (
  data: ConsentStorage,
  cookieName: string = DEFAULT_COOKIE_NAME,
  expiryDays: number = DEFAULT_EXPIRY_DAYS
): void => {
  try {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);

    const cookieValue = encodeURIComponent(JSON.stringify(data));
    
    document.cookie = `${cookieName}=${cookieValue}; 
      expires=${expiryDate.toUTCString()}; 
      path=/; 
      samesite=lax; 
      ${window.location.protocol === 'https:' ? 'secure;' : ''}`;
  } catch (error) {
    console.error('Error writing consent cookie:', error);
  }
};

export const deleteCookie = (cookieName: string = DEFAULT_COOKIE_NAME): void => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
};
