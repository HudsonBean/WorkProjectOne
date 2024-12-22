/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function navbar() {
  return (
    <nav className="navbar">
      <ul>
        <div className="navbar-left_links">
          <li>
            <Link href="/">
              <Image width={65} height={65} alt="logo" src={logo} />
            </Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/hosting">Hosting</Link>
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
