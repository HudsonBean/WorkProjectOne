"use client";

import { useFormik } from "formik";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import profilePic from "../assets/default-profile-picture.svg";
const poppins = Poppins({
  weight: ["100", "300", "400"],
  style: "normal",
  display: "swap",
});

export default function Register() {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
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
          <Image
            src={profilePic}
            alt="Profile Picture"
            className="register__right__content__profile-picture"
            priority={true}
          />
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
  );
}
