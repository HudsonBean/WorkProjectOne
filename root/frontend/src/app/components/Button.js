"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  children,
  variant = "primary", // primary, secondary, outline, text
  icon,
  iconPosition = "left", // left, right
  onClick,
  className,
  type = "button",
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`button button--${variant} ${
        icon ? "button--with-icon" : ""
      } ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <FontAwesomeIcon icon={icon} className="button__icon" />
      )}
      {children}
      {icon && iconPosition === "right" && (
        <FontAwesomeIcon icon={icon} className="button__icon" />
      )}
    </button>
  );
};

export default Button;
