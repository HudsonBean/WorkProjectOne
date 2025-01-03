"use client";
/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500"],
  style: "normal",
  display: "swap",
});
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const handleHamburgerMenuClick = (e) => {
    e.preventDefault();
    document.querySelector(".main").classList.toggle("toggleMenu");
  };
  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }} className="main">
      <nav className={`navbar ${poppins.className}`}>
        <ul className="navbar-default">
          <div className="navbar-left_links">
            <li>
              <Link href="/">
                <Image width={65} height={65} alt="logo" src={logo} />
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={pathname === "/about" ? "selected" : ""}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={pathname === "/contact" ? "selected" : ""}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/hosting"
                className={pathname === "/hosting" ? "selected" : ""}
              >
                Hosting
              </Link>
            </li>
          </div>
          <div className="navbar-right_links">
            <li>
              <Link href="/login">
                Get your website <FontAwesomeIcon icon={faGlobe} />
              </Link>
            </li>
            <li>
              <Link href="/login">Sign In</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </div>
        </ul>
        <button
          onClick={handleHamburgerMenuClick}
          className="navbar-hamburger-menu-button"
        ></button>
      </nav>
      <ul className="navbar-hamburger-menu"></ul>
    </div>
  );
}
