// colors.ts
export const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#1E90FF', // DodgerBlue – modern, accessible, and commonly used
  card: '#F5F5F5',
  border: '#E0E0E0',
};

export const darkTheme = {
  background: '#1C1C1E', // Better for OLED screens
  text: '#FFFFFF',
  primary: '#0A84FF', // iOS-style blue – less bright in dark mode
  card: '#2C2C2E',
  border: '#3A3A3C',
};

export type Theme = typeof lightTheme;
