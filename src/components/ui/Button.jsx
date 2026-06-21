import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon: Icon,
  loading = false,
  ...props
}) => {
  const { darkMode } = useTheme();
  
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Light mode optimized variants
  const variants = {
    primary: darkMode 
      ? 'bg-primary hover:bg-primary-600 text-white focus:ring-primary shadow-glow hover:scale-105'
      : 'bg-primary hover:bg-primary-700 text-white focus:ring-primary shadow-glow hover:shadow-lg hover:scale-105',
    secondary: darkMode 
      ? 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary'
      : 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    accent: darkMode 
      ? 'bg-accent hover:bg-accent-600 text-dark focus:ring-accent shadow-glow-accent hover:scale-105'
      : 'bg-accent hover:bg-accent-600 text-white focus:ring-accent shadow-md hover:shadow-lg hover:scale-105',
    danger: darkMode 
      ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500'
      : 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-md hover:shadow-lg',
    ghost: darkMode 
      ? 'bg-transparent text-gray-300 hover:bg-dark-100 focus:ring-gray-300'
      : 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
    glass: darkMode 
      ? 'glass text-white hover:bg-white/20 focus:ring-primary'
      : 'bg-white/80 text-gray-800 border border-gray-200 hover:bg-gray-50 focus:ring-primary backdrop-blur-sm',
    // Light mode specific variants
    light: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-md focus:ring-primary',
    outline: darkMode 
      ? 'bg-transparent border-2 border-dark-100 text-white hover:bg-dark-100 focus:ring-gray-300'
      : 'bg-transparent border-2 border-light-border text-gray-700 hover:bg-gray-50 focus:ring-gray-300',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="spinner mr-2" />
      ) : Icon ? (
        <Icon className="w-5 h-5 mr-2" />
      ) : null}
      {children}
    </motion.button>
  );
};

export default Button;
