"use client";

import { useFormik } from "formik";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import defaultProfilePic from "../assets/default-profile-picture.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const poppins = Poppins({
  weight: ["100", "300", "400"],
  style: "normal",
  display: "swap",
});

export default function Register() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [tempProfilePicUrl, setTempProfilePicUrl] = useState(null);
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      profilePictureUrl: defaultProfilePic.src,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleProfilePicChange = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
    imgRef.current = e.currentTarget;
  };

  async function getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Calculate dimensions based on percentage crop
    const canvasWidth = (crop.width * image.width) / 100;
    const canvasHeight = (crop.height * image.height) / 100;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    // Ensure proper rendering on high DPI displays
    ctx.scale(1, 1);

    const cropX = (crop.x * image.width) / 100;
    const cropY = (crop.y * image.height) / 100;

    ctx.drawImage(
      image,
      cropX * scaleX,
      cropY * scaleY,
      canvasWidth * scaleX,
      canvasHeight * scaleY,
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(URL.createObjectURL(blob));
        },
        "image/jpeg",
        1
      );
    });
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.match("image/(jpeg|png)")) {
        alert("File type not supported. Please upload a JPG or PNG image.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Please upload an image under 5MB.");
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      setTempProfilePicUrl(fileUrl);
    }
  };

  // Clean up temporary URL when dialog closes or component unmounts
  useEffect(() => {
    return () => {
      if (tempProfilePicUrl) {
        URL.revokeObjectURL(tempProfilePicUrl);
      }
    };
  }, [tempProfilePicUrl]);

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className={`register ${poppins.className}`}
      >
        <div className="register__left__container">
          <div className="register__left__content animate-fade-in">
            <h1>Create Account</h1>
            <div className="register__form">
              <div className="register__form__input-group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className="register__form__input-group">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
              </div>
              <div className="register__form__input-group">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
              </div>
              <div className="register__form__input-group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div className="register__form__input-group">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
              </div>
              <button type="submit">Register</button>
            </div>
            <div className="register__footer">
              <p>
                Already have an account?{" "}
                <Link href="/login">
                  <span>Login</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <svg
          width="100px"
          height="100px"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="register__divider"
        >
          <path
            d="M0 110 L110 0 L110 110 Z"
            className="left-side"
            fill="#0081a7"
          />
        </svg>
        <div className="register__right__container">
          <div className="register__right__content animate-fade-in">
            <button
              onClick={handleProfilePicChange}
              className="register__right__content__profile-picture-button"
              type="button" // Prevent form submission
              aria-label="Change profile picture"
            >
              <Image
                src={formik.values.profilePictureUrl}
                alt="Profile Picture"
                className="register__right__content__profile-picture"
                width={350}
                height={350}
                priority={true}
              />
              <div className="profile-picture-overlay">
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </button>
            <div className="register__right__content__user-name">
              <span>
                {formik.values.firstName} {formik.values.lastName}
              </span>
            </div>
            <span className="register__right__content__user-email">
              {formik.values.email}
            </span>
          </div>
        </div>
      </form>

      {/* Dialog overlay */}
      <div
        className={`dialog-overlay ${
          isDialogOpen ? "dialog-overlay--active" : ""
        }`}
      >
        <div className="dialog animate-fade-in">
          <div className="dialog__header">
            <h2>Change Profile Picture</h2>
            <button
              onClick={handleCloseDialog}
              className="dialog__close-button"
              type="button"
              aria-label="Close dialog"
            >
              ×
            </button>
          </div>
          <div className="dialog__content">
            {tempProfilePicUrl ? (
              <div className="dialog__content__crop-container">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  aspect={1}
                  circularCrop
                >
                  <img
                    ref={imgRef}
                    src={tempProfilePicUrl}
                    onLoad={onImageLoad}
                    alt="Crop me"
                    className="dialog__content__crop-image"
                  />
                </ReactCrop>
              </div>
            ) : (
              <div
                className="dialog__content__upload-area"
                onClick={handleUploadClick}
                onKeyDown={(e) => e.key === "Enter" && handleUploadClick()}
                role="button"
                tabIndex={0}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                  name="profilePictureUrl"
                  className="dialog__content__upload-area__input"
                  aria-label="Upload profile picture"
                />
                <FontAwesomeIcon icon={faPlus} />
                <span>Click to upload</span>
                <span className="dialog__content__upload-area__subtitle">
                  Supported formats: JPG, PNG
                </span>
              </div>
            )}
          </div>
          <div className="dialog__footer">
            <button
              onClick={() => {
                setTempProfilePicUrl(null);
                handleCloseDialog();
              }}
              type="button"
              className="dialog__footer__button dialog__footer__button--secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              className="dialog__footer__button dialog__footer__button--primary"
              onClick={async () => {
                if (imgRef.current && crop) {
                  const croppedImageUrl = await getCroppedImg(
                    imgRef.current,
                    crop
                  );
                  formik.setFieldValue("profilePictureUrl", croppedImageUrl);

                  // Create a blob from the cropped image URL
                  const response = await fetch(croppedImageUrl);
                  const blob = await response.blob();
                }
                handleCloseDialog();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
