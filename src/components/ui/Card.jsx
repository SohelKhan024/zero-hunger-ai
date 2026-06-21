import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Card = ({
  children,
  className = '',
  hover = true,
  glass = false,
  premium = false,
  interactive = false,
  padding = 'md',
  onClick,
  ...props
}) => {
  const { darkMode } = useTheme();
  
  const paddingSizes = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  // Light mode optimized card styles
  const cardStyles = premium 
    ? darkMode 
      ? 'glass-premium shadow-card hover:shadow-card-hover' 
      : 'bg-gradient-to-br from-primary-50 to-white border border-primary-100 shadow-card hover:shadow-card-hover'
    : glass 
      ? darkMode 
        ? 'glass-card border border-white/20 shadow-glass' 
        : 'bg-white/80 border border-white/40 shadow-glass backdrop-blur-sm'
      : darkMode 
        ? 'bg-dark-50 border border-dark-100 shadow-lg hover:shadow-xl'
        : 'bg-white border border-gray-100 shadow-card hover:shadow-card-hover';

  return (
    <motion.div
      whileHover={hover || interactive ? { y: -4, scale: 1.01 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        rounded-2xl transition-all duration-300
        ${cardStyles}
        ${paddingSizes[padding]}
        ${(hover || interactive) && !premium && !glass 
          ? darkMode 
            ? 'hover:border-primary/30 hover:shadow-glow cursor-pointer' 
            : 'hover:border-primary/30 hover:shadow-lg cursor-pointer'
          : ''}
        ${interactive ? darkMode ? 'glass-interactive cursor-pointer' : 'bg-gray-50 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => {
  const { darkMode } = useTheme();
  return (
    <h3 className={`
      text-xl font-bold 
      ${darkMode ? 'text-white' : 'text-gray-800'} 
      ${className}
    `}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = '' }) => {
  const { darkMode } = useTheme();
  return (
    <p className={`
      text-sm mt-1
      ${darkMode ? 'text-gray-400' : 'text-gray-500'} 
      ${className}
    `}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => {
  const { darkMode } = useTheme();
  return (
    <div className={`
      mt-4 pt-4 border-t
      ${darkMode ? 'border-dark-100' : 'border-gray-100'} 
      ${className}
    `}>
      {children}
    </div>
  );
};

// Premium Stats Card for AI Dashboard
export const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive',
  icon: Icon,
  iconBg = 'primary',
  suffix = '',
  prefix = '',
  loading = false,
  className = '' 
}) => {
  const { darkMode } = useTheme();
  
  // Light mode optimized styles as per spec
  const cardBg = darkMode ? 'bg-dark-50' : 'bg-white';
  const cardBorder = darkMode ? 'border-dark-100' : 'border-gray-100';
  const cardShadow = darkMode ? 'shadow-lg' : 'shadow-card hover:shadow-card-hover';
  
  // Title colors - 14px, muted color - SPEC: #64748B for Light Mode
  const titleColor = darkMode ? 'text-gray-400' : 'text-slate-500';
  
  // Value colors - large, bold (48px, font-weight 800) - SPEC: #0F172A for Light Mode
  const valueColor = darkMode ? 'text-white' : 'text-slate-900';
  
  // Prefix/suffix colors
  const prefixColor = darkMode ? 'text-gray-400' : 'text-slate-500';
  
  // Change indicator colors - SPEC: positive=#22C55E, negative=#EF4444
  const positiveColor = darkMode ? 'text-green-500' : 'text-green-600';
  const negativeColor = darkMode ? 'text-red-500' : 'text-red-600';
  const neutralColor = darkMode ? 'text-gray-400' : 'text-slate-500';
  const changeLabelColor = darkMode ? 'text-gray-500' : 'text-slate-500';
  
  const iconBgColors = {
    primary: darkMode ? 'bg-primary/20' : 'bg-primary/50',
    accent: darkMode ? 'bg-accent/20' : 'bg-accent/50',
    green: darkMode ? 'bg-green-500/20' : 'bg-green-100',
    red: darkMode ? 'bg-red-500/20' : 'bg-red-100',
    blue: darkMode ? 'bg-blue-500/20' : 'bg-blue-100',
  };

  const iconColors = {
    primary: 'text-primary',
    accent: 'text-accent',
    green: darkMode ? 'text-green-500' : 'text-green-600',
    red: darkMode ? 'text-red-500' : 'text-red-600',
    blue: darkMode ? 'text-blue-500' : 'text-blue-600',
  };

  if (loading) {
    return (
      <Card className={`${className}`}>
        <div className="animate-pulse">
          <div className={`h-4 rounded w-1/3 mb-4 ${darkMode ? 'bg-dark-100' : 'bg-gray-200'}`} />
          <div className={`h-12 rounded w-1/2 ${darkMode ? 'bg-dark-100' : 'bg-gray-200'}`} />
        </div>
      </Card>
    );
  }

  return (
    <Card className={`${cardBg} ${cardBorder} ${cardShadow} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title - 14px, muted */}
          <p className={`text-sm font-medium mb-1 ${titleColor}`}>{title}</p>
          
{/* Value - Large, bold (48px, font-weight 800) */}
          <div className="flex items-baseline gap-1">
            {prefix && <span className={`text-xl ${prefixColor}`}>{prefix}</span>}
            <span className={`text-5xl font-extrabold font-mono ${valueColor}`} style={{ lineHeight: 1 }}>{value}</span>
            {suffix && <span className={`text-xl ${prefixColor}`}>{suffix}</span>}
          </div>
          
          {/* Change indicator */}
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`
                text-sm font-semibold
                ${changeType === 'positive' ? positiveColor : ''}
                ${changeType === 'negative' ? negativeColor : ''}
                ${changeType === 'neutral' ? neutralColor : ''}
              `}>
                {changeType === 'positive' && '↑'}
                {changeType === 'negative' && '↓'}
                {change}
              </span>
              <span className={`text-sm ${changeLabelColor}`}>from last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`w-14 h-14 rounded-xl ${iconBgColors[iconBg]} flex items-center justify-center`}>
            <Icon className={`w-7 h-7 ${iconColors[iconBg]}`} />
          </div>
        )}
      </div>
    </Card>
  );
};

// AI Feature Card
export const AICard = ({ 
  title, 
  description, 
  icon: Icon, 
  badge,
  recommendation = false,
  className = '' 
}) => {
  const { darkMode } = useTheme();
  
  return (
    <Card premium={darkMode} interactive className={className}>
      <div className="flex items-start justify-between mb-3">
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center
          ${recommendation 
            ? darkMode ? 'bg-green-500/20' : 'bg-green-100' 
            : darkMode ? 'bg-primary/20' : 'bg-primary/50'
          }
        `}>
          {Icon && <Icon className={`
            w-5 h-5 
            ${recommendation 
              ? darkMode ? 'text-green-500' : 'text-green-600' 
              : 'text-primary'
            }
          `} />}
        </div>
        {badge && (
          <span className={`
            text-xs px-2 py-1 rounded-full font-medium
            ${darkMode 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-green-100 text-green-700'
            }
          `}>
            {badge}
          </span>
        )}
      </div>
      <h4 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h4>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
    </Card>
  );
};

export default Card;
