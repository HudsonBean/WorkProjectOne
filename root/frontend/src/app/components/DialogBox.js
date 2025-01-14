/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import { useState } from "react";

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
}) {
  return (
    <div
      className={`dialog-box-overlay ${
        isOpen ? "dialog-box-overlay--active" : ""
      } animate-fade-in`}
    >
      <div className="dialog-box">
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
        <div className="dialog-box__content">{children}</div>
        <div className="dialog-box__footer">
          {footer}
          <button className="dialog-box__footer__button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
