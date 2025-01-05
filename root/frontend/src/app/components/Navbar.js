"use client";
/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500"],
  style: "normal",
  display: "swap",
});

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className={`navbar ${poppins.className}`}>
      <nav className="navbar__nav">
        <ul className="navbar__nav__left">
          <li className="navbar__nav__left__item">
            <Link href="/">
              <Image width={65} height={65} alt="logo" src={logo} />
            </Link>
          </li>
          <li
            className={`navbar__nav__left__item ${
              pathname == "/pricing" ? "selected" : ""
            }`}
          >
            <Link href="/pricing">
              <span>Plans</span>
            </Link>
          </li>
          <li
            className={`navbar__nav__left__item ${
              pathname == "/about" ? "selected" : ""
            }`}
          >
            <Link href="/about">
              <span>About</span>
            </Link>
          </li>
          <li
            className={`navbar__nav__left__item ${
              pathname == "/contact" ? "selected" : ""
            }`}
          >
            <Link href="/contact">
              <span>Contact</span>
            </Link>
          </li>
        </ul>
        <ul className="navbar__nav__right">
          <li className="navbar__nav__right__item">
            <Link href="/">
              <span>
                Host your website <FontAwesomeIcon icon={faGlobe} />
              </span>
            </Link>
          </li>
          <li className="navbar__nav__right__item">
            <Link href="/login">
              <span>Login</span>
            </Link>
          </li>
          <li className="navbar__nav__right__item">
            <Link href="/register">
              <span>Register</span>
            </Link>
          </li>
        </ul>
        <button className="navbar__hamburger__button"></button>
      </nav>
      <div className="navbar__hamburger__menu"></div>
    </div>
  );
}
