import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = ''
}) => {
  const { darkMode } = useTheme();

  // Light mode optimized variants
  const variants = {
    default: darkMode 
      ? 'bg-dark-100 text-gray-300 border border-dark-100'
      : 'bg-gray-100 text-gray-700 border border-gray-200',
    primary: darkMode 
      ? 'bg-primary/20 text-primary border border-primary/30'
      : 'bg-primary/10 text-primary border border-primary/20',
    success: darkMode 
      ? 'bg-green-900/30 text-green-400 border border-green-500/30'
      : 'bg-green-100 text-green-700 border border-green-200',
    warning: darkMode 
      ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
      : 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    danger: darkMode 
      ? 'bg-red-900/30 text-red-400 border border-red-500/30'
      : 'bg-red-100 text-red-700 border border-red-200',
    info: darkMode 
      ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30'
      : 'bg-blue-100 text-blue-700 border border-blue-200',
    accent: darkMode 
      ? 'bg-accent/20 text-accent border border-accent/30'
      : 'bg-accent/10 text-accent-700 border border-accent/20',
    // Light mode specific variants
    light: 'bg-white text-gray-700 border border-gray-200 shadow-sm',
    glass: darkMode 
      ? 'bg-white/10 text-white border border-white/20 backdrop-blur-sm'
      : 'bg-white/80 text-gray-700 border border-white/40 backdrop-blur-sm',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  const dotColors = {
    default: 'bg-gray-500',
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    accent: 'bg-accent',
    light: 'bg-gray-400',
    glass: 'bg-white',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {dot && (
        <span className={`w-2 h-2 rounded-full ${dotColors[variant]} animate-pulse`} />
      )}
      {children}
    </motion.span>
  );
};

export default Badge;
