import React, { useState } from 'react';

const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  className,
  required = false,
  errorMsg, // Error message prop
  minLength,
  maxLength,
  validateEmail,
  validatePhoneNumber,
  name,
}) => {
  const [error, setError] = useState('');

  // Validation handlers
  const validateValue = (value) => {
    if (minLength && value.length < minLength) {
      return `Minimum length is ${minLength} characters.`;
    }
    if (maxLength && value.length > maxLength) {
      return `Maximum length is ${maxLength} characters.`;
    }
    if (validateEmail && !/\S+@\S+\.\S+/.test(value)) {
      return 'Please enter a valid email address.';
    }
    if (validatePhoneNumber && !/^[89]\d{7}$/.test(value)) {
      return 'Phone number must start with 8 or 9 and contain 8 digits.';
    }
    return '';
  };

  // Handle input change and limit max length
  const handleChange = (e) => {
    const newValue = e.target.value;
    const keyPressed = e.nativeEvent.inputType; // 'deleteContentBackward' for backspace

    // Allow input if it's under the maxLength or if user presses backspace (deleteContentBackward)
    if (keyPressed === 'deleteContentBackward' || !maxLength || newValue.length <= maxLength) {
      // Update value
      onChange(newValue, name); // Call onChange if the input is valid

      // Validate and update error state
      const validationError = validateValue(newValue);
      setError(validationError);
    }
  };

  // Reset error on focus
  const handleFocus = () => {
    setError('');
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus} // Reset error on focus
        placeholder={placeholder}
        required={required}
        className={`
          p-2 border 
          ${error || errorMsg ? 'border-red-500' : 'border-gray-300'} 
          rounded-lg
          focus:ring-blue-500 focus:border-blue-500 
          transition duration-200
        `}
      />
      {(error || errorMsg) && <p className="mt-1 text-xs text-red-500">{error || errorMsg}</p>} {/* Error message display */}
    </div>
  );
};

export default InputField;
