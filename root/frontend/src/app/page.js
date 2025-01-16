"use client";
/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import { useState } from "react";
import DialogBox from "./components/DialogBox";
import ProfilePictureButton from "./components/ProfilePictureButton";
import defaultProfilePic from "./assets/default-profile-picture.svg";
import { useFormik } from "formik";
export default function Index() {
  const formik = useFormik({
    initialValues: {
      file: defaultProfilePic.src,
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="index">
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <DialogBox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Dialog Box"
        header={<p>Dialog Box</p>}
        footer={<p>Dialog Box</p>}
      ></DialogBox>
    </div>
  );
}
