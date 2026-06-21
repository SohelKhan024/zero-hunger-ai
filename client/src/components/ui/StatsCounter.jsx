import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const StatsCounter = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}) => {
  const { darkMode } = useTheme();
  const [count, setCount] = useState(0);

  // Theme-aware styling - Large numbers for visibility
  // Light Mode: #0F172A (48px, font-weight 800)
  // Dark Mode: #FFFFFF (48px, font-weight 800)
  const valueColor = darkMode ? 'text-white' : 'text-slate-900';

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(progress * end);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(count);

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      // Large statistic values: 48px, font-weight 800 (as per spec)
      className={`font-mono text-5xl font-extrabold ${valueColor} ${className}`}
      style={{ lineHeight: 1 }}
    >
      {prefix}{formatted}{suffix}
    </motion.span>
  );
};

export const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  className = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const colors = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
          <span className="text-sm font-mono text-gray-800 dark:text-white">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className={`w-full ${sizes[size]} bg-gray-200 dark:bg-dark-200 rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
};

export const LoadingSpinner = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  const colors = {
    primary: 'border-primary border-t-transparent',
    accent: 'border-accent border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  return (
    <div className={`${sizes[size]} ${colors[color]} rounded-full animate-spin ${className}`} />
  );
};

export const Skeleton = ({ className = '', variant = 'rect' }) => {
  const variants = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded'
  };

  return (
    <div className={`animate-pulse bg-gray-300 dark:bg-dark-200 ${variants[variant]} ${className}`} />
  );
};

export default StatsCounter;
