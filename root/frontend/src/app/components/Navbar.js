"use client";
/**========================================================================
 *                           IMPORTS
 *                           | HBD 1/5/2025
 *========================================================================**/
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "400"],
  style: "normal",
  display: "swap",
});

export default function Navbar() {
  const pathname = usePathname();

  const handleClick = () => {
    // Activates & deactivates the hamburger menu | HBD 01/5/2025
    document
      .querySelector(".navbar__hamburger__menu")
      .classList.toggle("navbar__hamburger__menu--active");
    document
      .querySelector(".navbar__hamburger__button")
      .classList.toggle("navbar__hamburger__button--active");
    document
      .querySelector(".navbar__hamburger__backdrop")
      .classList.toggle("navbar__hamburger__backdrop--active");
  };

  return (
    <div className={`navbar ${poppins.className}`}>
      <nav className="navbar__nav">
        {/* Left side of the navbar | HBD 01/5/2025 */}
        <ul className="navbar__nav__left">
          <li className="navbar__nav__left__item">
            <Link href="/">
              <Image width={65} height={65} alt="logo" src={logo} priority />
            </Link>
          </li>
          <li
            className={`navbar__nav__left__item ${
              pathname == "/pricing" ? "navbar__nav__left__item--selected" : ""
            }`}
          >
            <Link href="/pricing">
              <span>Plans</span>
            </Link>
          </li>
          <li
            className={`navbar__nav__left__item ${
              pathname == "/about" ? "navbar__nav__left__item--selected" : ""
            }`}
          >
            <Link href="/about">
              <span>About</span>
            </Link>
          </li>
          <li
            className={`navbar__nav__left__item ${
              pathname == "/contact" ? "navbar__nav__left__item--selected" : ""
            }`}
          >
            <Link href="/contact">
              <span>Contact</span>
            </Link>
          </li>
        </ul>
        {/* Right side of the navbar | HBD 01/5/2025 */}
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
        <button onClick={handleClick} className="navbar__hamburger__button">
          <div className="navbar__hamburger__button__line-container"></div>
        </button>
      </nav>
      <nav className="navbar__hamburger__menu">
        <ul className="navbar__hamburger__menu__list">
          <li className="navbar__hamburger__menu__list__item">
            <Link href="/pricing">
              <span>Plans</span>
            </Link>
          </li>
          <li className="navbar__hamburger__menu__list__item">
            <Link href="/about">
              <span>About</span>
            </Link>
          </li>
          <li className="navbar__hamburger__menu__list__item">
            <Link href="/contact">
              <span>Contact</span>
            </Link>
          </li>
        </ul>
        <ul className="navbar__hamburger__menu__list__bottom">
          <div className="navbar__hamburger__menu__list__bottom__row-container">
            <li className="navbar__hamburger__menu__list__bottom__row-container__item">
              <Link href="/login">
                <span>Login</span>
              </Link>
            </li>
            <li className="navbar__hamburger__menu__list__bottom__row-container__item">
              <Link href="/register">
                <span>Register</span>
              </Link>
            </li>
          </div>
          <Link
            className="navbar__hamburger__menu__list__bottom__item"
            href="/"
          >
            <span>
              Host your website <FontAwesomeIcon icon={faGlobe} />
            </span>
          </Link>
        </ul>
      </nav>
      <div className="navbar__hamburger__backdrop"></div>
    </div>
  );
}
