import { forwardRef } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, success, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              input
              ${leftIcon ? 'input-icon' : ''}
              ${rightIcon ? 'pr-12' : ''}
              ${error ? 'border-error-500 focus:ring-error-500' : ''}
              ${success ? 'border-success-500 focus:ring-success-500' : ''}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500">
              {rightIcon}
            </div>
          )}
          {!rightIcon && error && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-error-500">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}
          {!rightIcon && success && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-success-500">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-error-600 dark:text-error-400">{error}</p>}
        {success && <p className="mt-2 text-sm text-success-600 dark:text-success-400">{success}</p>}
        {helperText && !error && !success && (
          <p className="mt-2 text-sm text-secondary-500 dark:text-secondary-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
