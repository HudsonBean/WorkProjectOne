"use client";
/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import { useFormik } from "formik";
import ProfilePictureButton from "./components/ProfilePictureButton";
import defaultProfilePic from "./assets/default-profile-picture.svg";
export default function Index() {
  const formik = useFormik({
    initialValues: {
      profilePictureUrl: defaultProfilePic.src,
    },
  });
  return (
    <div>
      <ProfilePictureButton formik={formik} />
    </div>
  );
}
