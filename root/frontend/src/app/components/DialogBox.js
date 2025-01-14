/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import { useState } from "react";
import { createPortal } from "react-dom";

/**========================================================================
 *                           COMPONENT
 *========================================================================**/
export default function DialogBox({
  isOpen,
  onClose,
  header,
  footer,
  children,
  title,
  showDefaultFooterButton = true,
  className,
}) {
  const dialogContent = (
    <div
      className={`dialog-box-overlay ${
        isOpen ? "dialog-box-overlay--active" : ""
      }`}
    >
      <div className={`dialog-box ${className}`}>
        <div className="dialog-box__header">
          <h2>{title}</h2>
          {header}
          <button
            onClick={onClose}
            className="dialog-box__header__close-button"
            type="button"
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>
        <div className={`dialog-box__content ${className + "__content"}`}>
          {children}
        </div>
        <div className={`dialog-box__footer ${className + "__footer"}`}>
          <button
            style={{ display: showDefaultFooterButton ? "block" : "none" }}
            className="dialog-box__footer__button"
            onClick={onClose}
          >
            Close
          </button>
          {footer}
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
}
