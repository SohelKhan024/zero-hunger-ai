import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  type = 'text',
  className = '',
  ...props
}, ref) => {
  const { darkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className={`
          block text-sm font-medium mb-2
          ${darkMode ? 'text-gray-300' : 'text-gray-700'}
        `}>
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className={`
            absolute left-4 top-1/2 -translate-y-1/2 
            ${darkMode ? 'text-gray-400' : 'text-gray-400'}
          `}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          className={`
            w-full px-4 py-3 rounded-xl border transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${Icon ? 'pl-12' : ''}
            ${type === 'password' ? 'pr-12' : ''}
            ${error 
              ? 'border-red-500 focus:ring-red-500' 
              : darkMode 
                ? 'border-dark-200 hover:border-primary/50 bg-dark-50 text-white'
                : 'border-gray-200 hover:border-primary/50 bg-white text-gray-800'
            }
            ${darkMode ? 'bg-dark-50 text-white' : 'bg-white text-gray-800'}
          `}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`
              absolute right-4 top-1/2 -translate-y-1/2 
              ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}
            `}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export const Textarea = forwardRef(({
  label,
  error,
  className = '',
  rows = 4,
  ...props
}, ref) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className={`
          block text-sm font-medium mb-2
          ${darkMode ? 'text-gray-300' : 'text-gray-700'}
        `}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-xl border transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          resize-none
          ${error 
            ? 'border-red-500 focus:ring-red-500' 
            : darkMode 
              ? 'border-dark-200 hover:border-primary/50 bg-dark-50 text-white'
              : 'border-gray-200 hover:border-primary/50 bg-white text-gray-800'
          }
          ${darkMode ? 'bg-dark-50 text-white' : 'bg-white text-gray-800'}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export const Select = forwardRef(({
  label,
  error,
  options = [],
  className = '',
  placeholder = 'Select an option',
  ...props
}, ref) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className={`
          block text-sm font-medium mb-2
          ${darkMode ? 'text-gray-300' : 'text-gray-700'}
        `}>
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`
          w-full px-4 py-3 rounded-xl border transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          ${error 
            ? 'border-red-500 focus:ring-red-500' 
            : darkMode 
              ? 'border-dark-200 hover:border-primary/50 bg-dark-50 text-white'
              : 'border-gray-200 hover:border-primary/50 bg-white text-gray-800'
          }
          ${darkMode ? 'bg-dark-50 text-white' : 'bg-white text-gray-800'}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Input;
