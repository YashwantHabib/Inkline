// colors.ts
export const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#5409DA',
  card: '#F5F5F5',
  border: '#E0E0E0',
  cardBackground: '#F9F9F9',
};

export const darkTheme = {
  background: '#1C1C1E', // Better for OLED screens
  text: '#FFFFFF',
  primary: '#5409DA',
  card: '#2C2C2E',
  border: '#3A3A3C',
  cardBackground: '#F9F9F9',
};

export type Theme = typeof lightTheme;
