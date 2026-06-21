/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Mode - Primary Green Palette
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
          800: '#166534',
          900: '#14532D',
        },
        // Secondary Green (Lighter)
        secondary: {
          DEFAULT: '#4ADE80',
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        accent: {
          DEFAULT: '#F59E0B',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Light theme colors
        light: {
          bg: '#FFFFFF',
          'bg-secondary': '#F8FAFC',
          'bg-alt': '#F1F5F9',
          text: '#0F172A',
          'text-secondary': '#475569',
          border: '#E2E8F0',
          'border-light': '#F1F5F9',
        },
        // Dark theme colors (original)
        dark: {
          DEFAULT: '#0F172A',
          50: '#1E293B',
          100: '#334155',
          200: '#475569',
          300: '#64748B',
          400: '#94A3B8',
        },
        // Premium gradient colors
        hunger: {
          critical: '#EF4444',
          severe: '#F97316',
          moderate: '#F59E0B',
          mild: '#22C55E',
          none: '#10B981',
        },
        // Chart colors
        chart: {
          green: '#22C55E',
          'green-light': '#4ADE80',
          blue: '#3B82F6',
          orange: '#F59E0B',
          purple: '#8B5CF6',
          pink: '#EC4899',
        },
// Status colors
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(46, 125, 50, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(46, 125, 50, 0.8)' },
        },
      },
backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'green-gradient': 'linear-gradient(135deg, #22C55E 0%, #4ADE80 50%, #86EFAC 100%)',
        'premium-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        'hero-gradient': 'radial-gradient(ellipse at top, #1E293B 0%, #0F172A 100%)',
        // AI Section Gradients (Light Mode)
        'ai-prediction': 'linear-gradient(135deg, #ECFDF5, #DCFCE7)',
        'food-matching': 'linear-gradient(135deg, #F0FDF4, #BBF7D0)',
        'sustainability': 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
        'impact': 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
      },
boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(34, 197, 94, 0.5)',
        'glow-accent': '0 0 20px rgba(245, 158, 11, 0.5)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
        // Light mode specific shadows
        'card-light': '0 10px 25px rgba(0, 0, 0, 0.05)',
        'card-light-hover': '0 15px 35px rgba(0, 0, 0, 0.1)',
        'sidebar': '4px 0 25px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
