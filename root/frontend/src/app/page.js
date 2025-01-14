"use client";
/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import { useState } from "react";
import DialogBox from "./components/DialogBox";
export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="index">
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <DialogBox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header="Dialog Box"
      >
        <p>Dialog Box</p>
      </DialogBox>
    </div>
  );
}
