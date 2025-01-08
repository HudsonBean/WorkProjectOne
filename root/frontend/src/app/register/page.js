"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const poppins = Poppins({
  weight: ["100", "300", "400"],
  style: "normal",
  display: "swap",
});

export default function Register() {
  return (
    <div className={`register ${poppins.className}`}>
      <div className="register__left__container">
        <div className="register__left__content">
          <h1>Create Account</h1>
          <form className="register__form">
            <div className="register__form__input-group">
              <input type="text" placeholder="Username" required />
            </div>
            <div className="register__form__input-group">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="register__form__input-group">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="register__form__input-group">
              <input type="password" placeholder="Confirm Password" required />
            </div>
            <button type="submit">Register</button>
          </form>
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
      {/* Add svg */}
      <div className="register__right__container">
        <span>Registers</span>
      </div>
    </div>
  );
}
