"use client";

import { useFormik } from "formik";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import defaultProfilePic from "../assets/default-profile-picture.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProfilePictureDialog from "../components/ProfilePictureDialog";

const poppins = Poppins({
  weight: ["100", "300", "400"],
  style: "normal",
  display: "swap",
});

export default function Register() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address!";
    }
    if (!values.firstName) {
      errors.firstName = "First name is required!";
    } else if (values.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters!";
    } else if (values.firstName.length > 20) {
      errors.firstName = "First name must be less than 20 characters!";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required!";
    } else if (values.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters!";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Last name must be less than 20 characters!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required!";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match!";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      profilePictureUrl: defaultProfilePic.src,
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleProfilePicChange = () => {
    setIsDialogOpen(true);
  };

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
                  onBlur={formik.handleBlur}
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && (
                  <p className="register__form__input-group__error animate-fade-in">
                    {formik.touched.email && formik.errors.email}
                  </p>
                )}
              </div>
              <div className="register__form__input-group">
                <input
                  id="firstName"
                  onBlur={formik.handleBlur}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                {formik.errors.firstName && (
                  <p className="register__form__input-group__error animate-fade-in">
                    {formik.touched.firstName && formik.errors.firstName}
                  </p>
                )}
              </div>
              <div className="register__form__input-group">
                <input
                  id="lastName"
                  onBlur={formik.handleBlur}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                {formik.errors.lastName && (
                  <p className="register__form__input-group__error animate-fade-in">
                    {formik.touched.lastName && formik.errors.lastName}
                  </p>
                )}
              </div>
              <div className="register__form__input-group">
                <input
                  id="password"
                  onBlur={formik.handleBlur}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && (
                  <p className="register__form__input-group__error animate-fade-in">
                    {formik.touched.password && formik.errors.password}
                  </p>
                )}
              </div>
              <div className="register__form__input-group">
                <input
                  id="confirmPassword"
                  onBlur={formik.handleBlur}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword && (
                  <p className="register__form__input-group__error animate-fade-in">
                    {formik.errors.confirmPassword}
                  </p>
                )}
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
              type="button"
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
              <div className="register__right__content__profile-picture-edit-icon">
                <FontAwesomeIcon icon={faPencil} />
              </div>
              <div className="profile-picture-overlay">
                <FontAwesomeIcon
                  className="profile-picture-overlay__icon-plus"
                  icon={faPlus}
                />
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

      <ProfilePictureDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={(croppedImageUrl) => {
          // Clean up the old profile picture URL if it's not the default
          if (formik.values.profilePictureUrl !== defaultProfilePic.src) {
            URL.revokeObjectURL(formik.values.profilePictureUrl);
          }
          formik.setFieldValue("profilePictureUrl", croppedImageUrl);
        }}
        defaultImage={defaultProfilePic.src}
      />
    </>
  );
}
