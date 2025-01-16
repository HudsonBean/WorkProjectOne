"use client";

/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import axios from "axios";
/**======================
 *    NEXTJS IMPORTS
 *========================**/
import { useFormik } from "formik";
import Link from "next/link";

/**======================
 *    STYLE IMPORTS
 *========================**/
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["100", "300", "400"],
  style: "normal",
  display: "swap",
});

/**======================
 *    REACT IMPORTS
 *========================**/
import { useState, useEffect } from "react";

/**======================
 *    COMPONENTS
 *========================**/
import ProfilePictureButton from "../components/ProfilePictureButton";
import Button from "../components/Button";
/**======================
 *    CONSTANTS
 *========================**/
const defaultProfilePic = process.env.DEFAULT_PROFILE_PICTURE;

export default function Register() {
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
    const formData = new FormData();

    formData.append("email", formik.values.email);
    formData.append("firstName", formik.values.firstName);
    formData.append("lastName", formik.values.lastName);
    formData.append("password", formik.values.password);

    // Check if profile picture is not default | HBD 01/15/2025
    if (formik.values.file !== defaultProfilePic) {
      formData.append("file", formik.values.file);
    }

    axios
      .post("http://localhost:8000/register", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Formik setup | HBD 01/12/2025
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      file: defaultProfilePic,
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
              <Button
                type="submit"
                variant="primary"
                className="register__form__submit"
              >
                Register
              </Button>
            </div>
            <div className="register__footer">
              <p>
                Already have an account?
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
            <ProfilePictureButton formik={formik} />
            <div
              className={`register__right__content__details ${
                isConfirming ? "register__right__content__details__active" : ""
              } `}
            >
              <h1>
                {formik.values.firstName.length +
                  formik.values.lastName.length >=
                20
                  ? `${formik.values.firstName} ${formik.values.lastName.slice(
                      0,
                      19 - formik.values.firstName.length
                    )}...`
                  : `${formik.values.firstName} ${formik.values.lastName}`}
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
              <Button variant="text" icon={faArrowLeft} onClick={toggleConfirm}>
                Back
              </Button>
              <Button
                variant="primary"
                icon={faArrowRight}
                iconPosition="right"
                onClick={submitToBackend}
              >
                Looks Good!
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
