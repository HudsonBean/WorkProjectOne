"use client";
/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import DialogBox from "./components/DialogBox";
import ProfilePictureButton from "./components/ProfilePictureButton";
import defaultProfilePic from "./assets/default-profile-picture.svg";
import { useFormik } from "formik";
export default function Index() {
  const formik = useFormik({
    initialValues: {
      profilePictureUrl: defaultProfilePic.src,
    },
  });
  return (
    <div className="index">
      {/* <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <DialogBox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Dialog Box"
        header={<p>Dialog Box</p>}
        footer={<p>Dialog Box</p>}
      ></DialogBox> */}
      <ProfilePictureButton formik={formik} />
    </div>
  );
}
