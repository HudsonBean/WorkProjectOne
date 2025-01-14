"use client";

/**========================================================================
 *                           IMPORTS
 *========================================================================**/
/**======================
 *    NEXTJS IMPORTS
 *========================**/
import { useFormik } from "formik";
import Link from "next/link";
import Image from "next/image";
/**======================
 *    STYLE IMPORTS
 *========================**/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencil,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["100", "300", "400"],
  style: "normal",
  display: "swap",
});
import defaultProfilePic from "../assets/default-profile-picture.svg";

/**======================
 *    REACT IMPORTS
 *========================**/
import { useState, useEffect } from "react";

/**======================
 *    COMPONENTS
 *========================**/
import ProfilePictureDialog from "../components/ProfilePictureDialog";
export default function Register() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [matchedPassword, setMatchedPassword] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Validation function for formik | HBD 01/12/2025
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
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters!";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required!";
    } else if (values.confirmPassword.length < 8) {
      errors.confirmPassword =
        "Confirm password must be at least 8 characters!";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match!";
      setMatchedPassword(false);
    } else {
      setMatchedPassword(true);
    }
    return errors;
  };

  const toggleConfirm = () => {
    setIsConfirming(!isConfirming);
  };

  const submitToBackend = () => {
    //TODO: Implement submitting to backend
  };

  // Formik setup | HBD 01/12/2025
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
      if (isMobile) {
        submitToBackend();
      } else {
        toggleConfirm();
      }
    },
  });

  // Function to open the profile picture dialog | HBD 01/12/2025
  const handleProfilePicChange = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className={`register ${poppins.className} ${
          isConfirming ? "right-only" : ""
        }`}
      >
        <div className="register__left__container">
          <div className="register__left__content animate-fade-in">
            <h1>Create Account</h1>
            <div className="register__form">
              <div
                className={`register__form__input-group ${
                  formik.errors.email && formik.touched.email
                    ? "register__form__input-group__field-error"
                    : ""
                }`}
              >
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
              <div
                className={`register__form__input-group ${
                  formik.errors.firstName && formik.touched.firstName
                    ? "register__form__input-group__field-error"
                    : ""
                }`}
              >
                <input
                  id="firstName"
                  onBlur={formik.handleBlur}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  maxLength={20}
                  minLength={2}
                />
                {formik.errors.firstName && (
                  <p className="register__form__input-group__error animate-fade-in">
                    {formik.touched.firstName && formik.errors.firstName}
                  </p>
                )}
              </div>
              <div
                className={`register__form__input-group ${
                  formik.errors.lastName && formik.touched.lastName
                    ? "register__form__input-group__field-error"
                    : ""
                }`}
              >
                <input
                  id="lastName"
                  onBlur={formik.handleBlur}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  maxLength={20}
                  minLength={2}
                />
                {formik.errors.lastName && (
                  <p className="register__form__input-group__error animate-fade-in">
                    {formik.touched.lastName && formik.errors.lastName}
                  </p>
                )}
              </div>
              <div
                className={`register__form__input-group ${
                  formik.errors.password && formik.touched.password
                    ? "register__form__input-group__field-error"
                    : ""
                } ${
                  matchedPassword &&
                  formik.touched.password &&
                  !formik.errors.password
                    ? "register__form__input-group__field-success"
                    : ""
                }`}
              >
                <input
                  id="password"
                  onBlur={formik.handleBlur}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  maxLength={20}
                  minLength={8}
                />
                {formik.errors.password && (
                  <p className="register__form__input-group__error animate-fade-in">
                    {formik.touched.password && formik.errors.password}
                  </p>
                )}
              </div>
              <div
                className={`register__form__input-group ${
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                    ? "register__form__input-group__field-error"
                    : ""
                } ${
                  matchedPassword &&
                  formik.touched.confirmPassword &&
                  !formik.errors.confirmPassword
                    ? "register__form__input-group__field-success"
                    : ""
                }`}
              >
                <input
                  id="confirmPassword"
                  onBlur={formik.handleBlur}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  maxLength={20}
                  minLength={8}
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
        {/* Divider | HBD 01/12/2025 */}
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
            {/* Profile picture button | HBD 01/12/2025 */}
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
                placeholder="blur"
                blurDataURL={formik.values.profilePictureUrl}
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
            <div
              className={`register__right__content__details ${
                isConfirming ? "register__right__content__details__active" : ""
              } `}
            >
              <h1>
                {formik.values.firstName} {formik.values.lastName}
              </h1>
              <span>{formik.values.email}</span>
            </div>
            <div
              className={`register__right__content__confirm-buttons ${
                isConfirming
                  ? "register__right__content__confirm-buttons__active"
                  : ""
              }`}
            >
              <button type="button" onClick={submitToBackend}>
                Looks Good! <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <button onClick={toggleConfirm} type="button">
                <FontAwesomeIcon icon={faArrowLeft} />
                Not Quite Finished.
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Profile picture dialog | HBD 01/12/2025 */}
      <ProfilePictureDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={(croppedImageUrl) => {
          // TODO: Later set up a file storage service to retrieve the image
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
