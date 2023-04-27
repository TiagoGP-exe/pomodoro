import React, { InputHTMLAttributes, forwardRef, FC } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  control?: any;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  classContainer?: string;
}

const paddings = {
  isRightIcon: "pl-3 pr-1 py-1",
  isLeftIcon: "pl-1 pr-3 py-1",
  default: "px-2 py-1",
};

// eslint-disable-next-line react/display-name
export const Input: FC<InputProps> = forwardRef(
  (
    { className, label, rightIcon, leftIcon, classContainer, ...props },
    ref
  ) => {
    const correctPadding = rightIcon
      ? paddings.isRightIcon
      : leftIcon
      ? paddings.isLeftIcon
      : paddings.default;

    return (
      <div className={`w-full flex flex-col gap-y-1 ${classContainer}`}>
        {label && (
          <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            {label}
          </label>
        )}

        <div
          className={`flex border border-slate-300 dark:border-slate-700 rounded-md  overflow-hidden ${correctPadding}`}
        >
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
