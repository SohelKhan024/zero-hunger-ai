/**
 * Zero Hunger AI - Theme Configuration
 * Centralized theme tokens for light/dark mode
 */

export const lightTheme = {
  // Background colors
  bg: {
    primary: '#FFFFFF',
    secondary: '#F8FAFC',
    alt: '#F1F5F9',
    glass: 'rgba(255, 255, 255, 0.8)',
  },
  // Text colors
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    tertiary: '#64748B',
    inverse: '#FFFFFF',
  },
  // Statistic values (large numbers) - SPEC REQUIREMENTS
  stat: {
    value: '#0F172A',      // Primary number color - High contrast
    valueSize: '48px',       // Large readable size
    valueWeight: '800',     // Bold weight
    label: '#64748B',       // Card title/labels - Muted
    labelSize: '14px',       // Normal label size
    positive: '#22C55E',   // Growth indicators
    negative: '#EF4444',   // Negative indicators
  },
  // Border colors
  border: {
    DEFAULT: '#E2E8F0',
    light: '#F1F5F9',
    dark: '#CBD5E1',
  },
  // Card colors
  card: {
    bg: '#FFFFFF',
    border: '#E2E8F0',
    shadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    shadowHover: '0 15px 35px rgba(0, 0, 0, 0.1)',
  },
  // Primary green palette
  primary: {
    DEFAULT: '#22C55E',
    50: '#ECFDF5',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
  },
  // Status colors
  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  },
  // AI section gradients
  ai: {
    prediction: 'linear-gradient(135deg, #ECFDF5, #DCFCE7)',
    matching: 'linear-gradient(135deg, #F0FDF4, #BBF7D0)',
    sustainability: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
    impact: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
  },
};

export const darkTheme = {
  // Background colors
  bg: {
    primary: '#0F172A',
    secondary: '#1E293B',
    alt: '#334155',
    glass: 'rgba(15, 23, 42, 0.8)',
  },
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#94A3B8',
    tertiary: '#64748B',
    inverse: '#0F172A',
  },
  // Statistic values (large numbers)
  stat: {
    value: '#FFFFFF',      // Primary number color - White in dark mode
    valueSize: '48px',    // Large readable size
    valueWeight: '800',  // Bold weight
    label: '#94A3B8',   // Card title/labels - Muted gray
    labelSize: '14px',    // Normal label size
    positive: '#22C55E',  // Growth indicators
    negative: '#EF4444', // Negative indicators
  },
  // Border colors
  border: {
    DEFAULT: '#334155',
    light: '#475569',
    dark: '#1E293B',
  },
  // Card colors
  card: {
    bg: '#1E293B',
    border: '#334155',
    shadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    shadowHover: '0 15px 35px rgba(0, 0, 0, 0.4)',
  },
  // Primary green palette
  primary: {
    DEFAULT: '#22C55E',
    50: '#14532D',
    100: '#166534',
    200: '#15803D',
    300: '#16A34A',
    400: '#22C55E',
    500: '#4ADE80',
    600: '#86EFAC',
    700: '#BBF7D0',
  },
  // Status colors
  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  },
  // AI section gradients (dark mode)
  ai: {
    prediction: 'linear-gradient(135deg, #14532D, #166534)',
    matching: 'linear-gradient(135deg, #166534, #15803D)',
    sustainability: 'linear-gradient(135deg, #1E3A5F, #1E3A8A)',
    impact: 'linear-gradient(135deg, #78350F, #92400E)',
  },
};

// CSS custom properties for runtime theme switching
export const cssVariables = {
  light: {
    '--bg-primary': '#FFFFFF',
    '--bg-secondary': '#F8FAFC',
    '--bg-alt': '#F1F5F9',
    '--text-primary': '#0F172A',
    '--text-secondary': '#475569',
    '--text-tertiary': '#64748B',
    '--border-color': '#E2E8F0',
    '--card-bg': '#FFFFFF',
    '--card-border': '#E2E8F0',
    '--card-shadow': '0 10px 25px rgba(0, 0, 0, 0.05)',
    '--primary': '#22C55E',
    '--primary-light': '#4ADE80',
    '--success': '#22C55E',
    '--warning': '#F59E0B',
    '--danger': '#EF4444',
    '--info': '#3B82F6',
  },
  dark: {
    '--bg-primary': '#0F172A',
    '--bg-secondary': '#1E293B',
    '--bg-alt': '#334155',
    '--text-primary': '#FFFFFF',
    '--text-secondary': '#94A3B8',
    '--text-tertiary': '#64748B',
    '--border-color': '#334155',
    '--card-bg': '#1E293B',
    '--card-border': '#334155',
    '--card-shadow': '0 10px 25px rgba(0, 0, 0, 0.3)',
    '--primary': '#22C55E',
    '--primary-light': '#4ADE80',
    '--success': '#22C55E',
    '--warning': '#F59E0B',
    '--danger': '#EF4444',
    '--info': '#3B82F6',
  },
};

// Get theme object based on darkMode state
export const getTheme = (darkMode) => darkMode ? darkTheme : lightTheme;

export default { lightTheme, darkTheme, cssVariables, getTheme };
