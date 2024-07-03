// components/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      type="submit"
      className={`py-2 px-4 bg-stone-700 text-white rounded hover:bg-neutral-500 ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
