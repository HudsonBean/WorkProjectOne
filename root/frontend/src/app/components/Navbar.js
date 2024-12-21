"use client"; // Add this directive to mark the component as a Client Component

/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const poppins = Poppins({
  weight: "500",
  style: "normal",
  display: "swap",
});

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className={`navbar ${poppins.className}`}>
      <ul className="navbar-links-primary">
        <li>
          <Link className="navbar-logo" href="/">
            <Image src={logo} alt="Logo" width={65} height={65} />
          </Link>
        </li>
        <li>
          <Link className={pathname === "/about" ? "active" : ""} href="/about">
            About
          </Link>
        </li>
        <li>
          <Link
            className={pathname === "/contact" ? "active" : ""}
            href="/contact"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className={pathname === "/hosting" ? "active" : ""}
            href="/hosting"
          >
            Hosting
          </Link>
        </li>
      </ul>
      <ul className="navbar-links-secondary">
        <li>
          <Link href="/">
            Get your website <FontAwesomeIcon className="fa" icon={faGlobe} />
          </Link>
        </li>
        <li>
          <Link href="/">Login</Link>
        </li>
        <li>
          <Link href="/">Signup</Link>
        </li>
      </ul>
    </div>
  );
}
