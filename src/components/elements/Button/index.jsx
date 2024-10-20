import React from 'react';

// Button component
const Button = ({ 
  text, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  className, 
  disabled = false 
}) => {
  // Define base styles
  const baseStyles = `
    rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-200
  `;

  // Define variant styles
  const variantStyles = {
    primary: `
      bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 focus:ring-blue-300
    `,
    secondary: `
      bg-gray-300 text-gray-800 border border-gray-300 hover:bg-gray-400 focus:ring-gray-300
    `,
    danger: `
      bg-red-600 text-white border border-red-600 hover:bg-red-700 focus:ring-red-300
    `,
  };

  // Define size styles
  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  // Define disabled styles
  const disabledStyles = `
    bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300
  `;

  // Combine all styles, apply disabled styles if disabled
  const buttonStyles = `
    ${baseStyles}
    ${disabled ? disabledStyles : variantStyles[variant]}
    ${sizeStyles[size]}
    ${className} // Allows for additional custom classes
  `;

  return (
    <button className={buttonStyles} onClick={onClick} disabled={disabled} >
      {text}
    </button>
  );
};

export default Button;
