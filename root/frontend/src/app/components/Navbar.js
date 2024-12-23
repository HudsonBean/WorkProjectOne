"use client";
/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["200", "500"],
  style: "normal",
  display: "swap",
});
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className={`navbar ${poppins.className}`}>
      <ul>
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
        {/* Hamburger menu button */}
        <button className="navbar-hamburger-menu-button hide">
          <FontAwesomeIcon size="3x" icon={faBars} />
        </button>
      </ul>
    </nav>
  );
}
