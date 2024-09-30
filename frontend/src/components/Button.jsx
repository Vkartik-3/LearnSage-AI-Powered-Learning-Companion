import React from "react";

const Button = ({
  label,
  icon,
  backgroundColor,
  borderColor,
  textColor,
  fullWidth,
}) => {
  return (
    <button
      className={`flex justify-center items-center border font-montserrat px-7 py-4 text-lg leading-none 
     ${
       backgroundColor
         ? `${backgroundColor} ${borderColor} ${textColor}`
         : "bg-coral-red  text-white border-coral-red"
     } 
     rounded-full ${fullWidth && "w-full"}`}
    >
      {label}
      {icon && (
        <img src={icon} alt="icon" className="ml-2 rounded-full w-5 h-5" />
      )}
    </button>
  );
};

export default Button;
