"use client";
/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500"],
  style: "normal",
  display: "swap",
});
import { usePathname } from "next/navigation";

export default function Navbar() {
  return (
    <div className={`navbar ${poppins.className}`}>
      <nav className="navbar__nav">
        <ul className="navbar__nav__left">
          <li className="navbar__nav__left__item">
            <Link href="/">
              <Image width={65} height={65} alt="logo" src={logo} />
            </Link>
          </li>
          <li className="navbar__nav__left__item">
            <Link href="/about">
              <span>About</span>
            </Link>
          </li>
          <li className="navbar__nav__left__item">
            <Link href="/contact">
              <span>Contact</span>
            </Link>
          </li>
          <li className="navbar__nav__left__item">
            <Link href="/">
              {" "}
              {/* TODO: Make scroll down to section */}
              <span>Hosting</span>
            </Link>
          </li>
        </ul>
        <ul className="navbar__nav__right"></ul>
      </nav>
      <button className="navbar__hamburger__button"></button>
      <div className="navbar__hamburger__menu"></div>
    </div>
  );
}
