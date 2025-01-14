/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import { useState } from "react";

/**========================================================================
 *                           COMPONENT
 *========================================================================**/
export default function DialogBox({ isOpen, onClose, children, header }) {
  return (
    <div
      className={`dialog-box-overlay ${
        isOpen ? "dialog-box-overlay--active" : ""
      }`}
    >
      <div className="dialog-box">
        <div className="dialog-box__header">
          <h2>{header}</h2>
        </div>
        <div className="dialog-box__content">{children}</div>
        <div className="dialog-box__footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
