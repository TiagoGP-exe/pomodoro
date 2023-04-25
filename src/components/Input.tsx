import React, { InputHTMLAttributes, forwardRef, FC } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  control?: any;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
export const Input: FC<InputProps> = forwardRef(
  ({ className, label, rightIcon, leftIcon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-y-2">
        {label && (
          <label className="text-sm text-gray-500 dark:text-gray-400">
            {label}
          </label>
        )}

        <div className="flex border border-slate-300 dark:border-slate-700 rounded-md pl-3 pr-1 py-1 overflow-hidden">
          {leftIcon && (
            <div className="flex items-center justify-center">{leftIcon}</div>
          )}

          <input
            ref={ref as any}
            {...props}
            className={`w-full bg-transparent outline-none text-sm text-gray-500 dark:text-gray-400 placeholder:opacity-70  ${className}`}
          />
          {rightIcon && (
            <div className="flex items-center justify-center">{rightIcon}</div>
          )}
        </div>
      </div>
    );
  }
);
