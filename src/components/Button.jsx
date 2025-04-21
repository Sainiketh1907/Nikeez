import React from 'react';

const Button = ({
  label,
  iconURL,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
  onClick,
  type = "button",
  disabled = false
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none
        ${backgroundColor ? `${backgroundColor} hover:bg-opacity-90` : "bg-purple-700 hover:bg-purple-600"}
        ${textColor || "text-white"}
        ${borderColor ? `border-${borderColor}` : "border-purple-700"}
        ${fullWidth ? "w-full" : ""}
        rounded-full
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer btn-ripple"}
        transform transition-all duration-300 ease-out
        hover:shadow-lg hover:-translate-y-1
        active:shadow-md active:translate-y-0
      `}
      onClick={onClick}
    >
      {label}

      {iconURL && (
        <img
          src={iconURL}
          alt='arrow right icon'
          className='ml-2 rounded-full w-5 h-5 transition-transform group-hover:translate-x-1'
        />
      )}
    </button>
  );
};

export default Button;