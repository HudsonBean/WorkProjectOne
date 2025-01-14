"use client";

/**========================================================================
 *                           IMPORTS
 *========================================================================**/
/**======================
 *    REACT IMPORTS
 *========================**/
import { useState } from "react";
/**======================
 *    NEXTJS IMPORTS
 *========================**/
import Image from "next/image";

/**======================
 *    FONTAWESOME IMPORTS
 *========================**/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencil } from "@fortawesome/free-solid-svg-icons";

/**======================
 *    ASSETS
 *========================**/
import defaultProfilePic from "../assets/default-profile-picture.svg";

/**======================
 *    COMPONENTS
 *========================**/
import ProfilePictureDialog from "./ProfilePictureDialog";

export default function ProfilePictureButton({ formik }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    console.log("Yes!");
  };

  const handleSaveImage = (croppedImageUrl) => {
    // Clean up old object URL if it exists and isn't the default
    if (formik.values.profilePictureUrl !== defaultProfilePic.src) {
      URL.revokeObjectURL(formik.values.profilePictureUrl);
    }
    formik.setFieldValue("profilePictureUrl", croppedImageUrl);
  };

  return (
    <>
      <button
        onClick={openDialog}
        className="profile-picture-button"
        type="button"
        aria-label="Change profile picture"
      >
        <Image
          src={formik.values.profilePictureUrl}
          alt="Profile Picture"
          className="profile-picture-button__profile-picture"
          width={350}
          height={350}
          priority={true}
        />
        <div className="profile-picture-button__profile-picture-overlay">
          <FontAwesomeIcon
            className="profile-picture-button__profile-picture-overlay__icon-plus"
            icon={faPlus}
          />
        </div>
        <div className="profile-picture-button__profile-picture-edit-icon">
          <FontAwesomeIcon icon={faPencil} />
        </div>
      </button>
      <ProfilePictureDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onSave={handleSaveImage}
      />
    </>
  );
}
